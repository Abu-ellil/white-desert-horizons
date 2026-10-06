// E2E on production: attach real file via CDP DOM.setFileInputFiles, fill form,
// submit, capture the UI result.
import fs from 'node:fs'

const port = 9333
const pageUrl = process.argv[2] || 'https://www.whitedeserthorizons.com/'
const filePath = process.argv[3]
const absPath = filePath

const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
const target = list.find((t) => t.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id
    pending.set(msgId, { resolve, reject })
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
  }
})
await new Promise((r) => ws.addEventListener('open', r, { once: true }))

const evalJs = async (expression) => {
  const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails).slice(0, 500))
  return res.result?.value
}

await send('Page.enable')
await send('DOM.enable')
await send('Page.navigate', { url: pageUrl })
await new Promise((r) => setTimeout(r, 6000))

// pass the file path via env-like global to keep step1 simple
const probe1 = await evalJs(`(() => {
  const wall = document.querySelector('#wall');
  const trigger = wall && [...wall.querySelectorAll('button')].find(b => /share your desert photo/i.test(b.textContent));
  if (!trigger) return JSON.stringify({ error: 'no trigger', wallHtml: wall ? wall.innerHTML.slice(0, 300) : null });
  trigger.click();
  return JSON.stringify({ ok: true });
})()`)
console.log('step1:', probe1)
await new Promise((r) => setTimeout(r, 800))

// find the file input node and set the real file
const doc = await send('DOM.getDocument', { depth: -1 })
const fileInput = doc.root.children[0] ? findNode(doc.root, 'INPUT', 'file') : null
function findNode(node, tagName, type) {
  if (node.nodeName === tagName) {
    const t = node.attributes ? attr(node.attributes, 'type') : null
    if (t === type) return node
  }
  for (const c of node.children || []) {
    const f = findNode(c, tagName, type)
    if (f) return f
  }
  return null
}
function attr(attrs, name) {
  const i = attrs.indexOf(name)
  return i >= 0 ? attrs[i + 1] : null
}
if (!fileInput) {
  console.log('FILE INPUT NOT FOUND')
  process.exit(1)
}
await send('DOM.setFileInputFiles', { files: [absPath], nodeId: fileInput.nodeId })
console.log('file attached:', absPath, fs.existsSync(absPath) ? fs.statSync(absPath).size + 'b' : 'MISSING')

const probe2 = await evalJs(`(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const author = document.getElementById('submit-author');
  const caption = document.getElementById('submit-caption');
  if (!author) return JSON.stringify({ error: 'author field missing after trigger' });
  const form = author.closest('form');
  const fileInput = form.querySelector('input[type=file]');
  if (!fileInput) return JSON.stringify({ error: 'file input missing in form' });
  const state = { disabled: submitDisabled(), fileChosen: fileInput.files.length };
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement;
    Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  setVal(author, 'فريق الموقع');
  setVal(caption, 'اختبار رفع — كثبان وادي الحيتان وقت الغروب');
  await sleep(400);
  const submit = form.querySelector('button[type=submit]');
  const state = { disabled: submit.disabled, fileChosen: form.querySelector('input[type=file]').files.length };
  if (submit.disabled) return JSON.stringify({ blocked: true, ...state });
  submit.click();
  // wait for the result message (up to 60s — upload + register)
  let msg = null;
  for (let i = 0; i < 60; i++) {
    await sleep(1000);
    const alert = form.querySelector('[role=alert], .alert, p[class*=error], p[class*=success]');
    const texts = [...form.querySelectorAll('p, div[role=status]')].map(p => p.textContent.trim()).filter(t =>
      /thanks|شكرا|failed|error|خطأ|sent|تم|review|مراجع/i.test(t));
    if (texts.length) { msg = texts[0].slice(0, 200); break; }
    if (submit.disabled === false && i > 5 && submit.textContent !== '') {
      // re-enabled without message? capture generic state
    }
  }
  return JSON.stringify({ ...state, msg, submitText: submit.textContent.trim() });
})()`)
console.log('step2:', probe2)

ws.close()
process.exit(0)