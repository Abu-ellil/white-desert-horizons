// E2E production test: navigate, open form, attach file, fill, submit, wait for result.
import fs from 'node:fs'
const absPath = process.argv[2]
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const target = list.find((t) => t.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => { const m = ++id; pending.set(m, { resolve, reject }); ws.send(JSON.stringify({ id: m, method, params })) })
ws.addEventListener('message', (ev) => { const msg = JSON.parse(ev.data); if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result) } })
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const evalJs = async (expression) => {
  const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails).slice(0, 400))
  return res.result?.value
}
await send('Page.enable'); await send('DOM.enable')
await send('Page.navigate', { url: 'https://www.whitedeserthorizons.com/' })
await new Promise((r) => setTimeout(r, 6000))

console.log('open:', await evalJs(`(() => {
  const wall = document.querySelector('#wall');
  const trigger = wall && [...wall.querySelectorAll('button')].find(b => /share your desert photo/i.test(b.textContent));
  if (!trigger) return 'no trigger'; trigger.click(); return 'opened';
})()`))
await new Promise((r) => setTimeout(r, 800))

const doc = await send('DOM.getDocument', { depth: -1 })
function findFileInput(node) {
  if (node.nodeName === 'INPUT') { const a = node.attributes || []; for (let i = 0; i < a.length; i += 2) if (a[i] === 'type' && a[i + 1] === 'file') return node }
  for (const c of node.children || []) { const f = findFileInput(c); if (f) return f }
  return null
}
const fi = findFileInput(doc.root)
if (!fi) { console.log('FILE INPUT NOT FOUND'); process.exit(1) }
await send('DOM.setFileInputFiles', { files: [absPath], nodeId: fi.nodeId })
console.log('attached:', fs.statSync(absPath).size, 'bytes')

console.log('submit:', await evalJs(`(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const author = document.getElementById('submit-author');
  const form = author.closest('form');
  const setVal = (el, v) => { const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement;
    Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true })); };
  setVal(author, 'فريق الموقع');
  setVal(document.getElementById('submit-caption'), 'اختبار — كثبان وادي الحيتان وقت الغروب');
  await sleep(400);
  const submit = form.querySelector('button[type=submit]');
  if (submit.disabled) return JSON.stringify({ blocked: true, file: form.querySelectorAll('img').length > 0 });
  submit.click();
  let msg = null, lastSubmit = null;
  for (let i = 0; i < 90; i++) {
    await sleep(1000);
    const btn = form.querySelector('button[type=submit]');
    lastSubmit = btn ? btn.textContent.trim() : null;
    const texts = [...form.querySelectorAll('p')].map(p => p.textContent.trim()).filter(t =>
      /thanks|failed|error|خطأ|شكرا|تم|وصلت|sent/i.test(t));
    if (texts.length) { msg = texts[0].slice(0, 200); break; }
  }
  return JSON.stringify({ msg, lastSubmit });
})()`))
ws.close(); process.exit(0)
