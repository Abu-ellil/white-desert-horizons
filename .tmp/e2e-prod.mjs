// E2E on production: attach real file via CDP DOM.setFileInputFiles, fill form,
// submit, capture the UI result.
import fs from 'node:fs'

const port = 9333
const pageUrl = 'https://www.whitedeserthorizons.com/'
const absPath = process.argv[2]

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

const probe1 = await evalJs(`(() => {
  const wall = document.querySelector('#wall');
  const trigger = wall && [...wall.querySelectorAll('button')].find(b => /share your desert photo/i.test(b.textContent));
  if (!trigger) return JSON.stringify({ error: 'no trigger', wallExists: !!wall });
  trigger.click();
  return JSON.stringify({ ok: true });
})()`)
console.log('step1 open form:', probe1)
await new Promise((r) => setTimeout(r, 800))

// attach the real file to the input node
const doc = await send('DOM.getDocument', { depth: -1 })
function findFileInput(node) {
  if (node.nodeName === 'INPUT') {
    const a = node.attributes || []
    for (let i = 0; i < a.length; i += 2) if (a[i] === 'type' && a[i + 1] === 'file') return node
  }
  for (const c of node.children || []) {
    const f = findFileInput(c)
    if (f) return f
  }
  return null
}
const fileInput = findFileInput(doc.root)
if (!fileInput) {
  console.log('FILE INPUT NOT FOUND')
  process.exit(1)
}
await send('DOM.setFileInputFiles', { files: [absPath], nodeId: fileInput.nodeId })
console.log('file attached:', absPath, fs.statSync(absPath).size + 'b')

const probe2 = await evalJs(`(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const author = document.getElementById('submit-author');
  if (!author) return JSON.stringify({ error: 'author field missing after trigger' });
  const form = author.closest('form');
  const fileInput = form.querySelector('input[type=file]');
  if (!fileInput) return JSON.stringify({ error: 'file input missing in form' });
  const setVal = (el, v) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement;
    Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  setVal(author, 'فريق الموقع');
  setVal(document.getElementById('submit-caption'), 'اختبار رفع — كثبان وادي الحيتان وقت الغروب');
  await sleep(400);
  const submit = form.querySelector('button[type=submit]');
  const state = { fileChosen: fileInput.files.length, submitDisabled: submit.disabled };
  if (submit.disabled) return JSON.stringify({ blocked: true, ...state });
  submit.click();
  let msg = null;
  for (let i = 0; i < 75; i++) {
    await sleep(1000);
    const texts = [...form.querySelectorAll('p')].map(p => p.textContent.trim()).filter(t =>
      /thanks|failed|error|خطأ|شكرا|تم|مراجع|review|وصلت/i.test(t));
    if (texts.length) { msg = texts[0].slice(0, 200); break; }
  }
  return JSON.stringify({ ...state, msg, submitTextAfter: submit.textContent.trim() });
})()`)
console.log('step2 submit:', probe2)

ws.close()
process.exit(0)