const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const target = list.find((t) => t.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve) => { const m = ++id; pending.set(m, resolve); ws.send(JSON.stringify({ id: m, method, params })) })
ws.addEventListener('message', (ev) => { const msg = JSON.parse(ev.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) } })
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const all = [...document.querySelectorAll('input')].map(i => i.type).join(',');
    const wall = document.querySelector('#wall');
    const dropzone = wall ? wall.querySelector('[class*=drop], [class*=upload], [class*=drag]') : null;
    const labels = wall ? [...wall.querySelectorAll('label')].map(l => l.textContent.trim().slice(0,40)) : [];
    return JSON.stringify({ allInputTypes: all, hasDropzone: !!dropzone, labels }, null, 1);
  })()`,
  returnByValue: true,
})
console.log(JSON.stringify(res.result?.value ?? res, null, 1))
ws.close(); process.exit(0)
