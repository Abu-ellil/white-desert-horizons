const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const target = list.find((t) => t.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => { const m = ++id; pending.set(m, { resolve, reject }); ws.send(JSON.stringify({ id: m, method, params })) })
ws.addEventListener('message', (ev) => { const msg = JSON.parse(ev.data); if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result) } })
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const wall = document.querySelector('#wall');
    const success = wall ? [...wall.querySelectorAll('p, h3, div')].map(e => e.textContent.trim()).find(t => /thanks|شكرا|review|تم|وصلت|sent/i.test(t)) : null;
    return JSON.stringify({ success, wallTextSample: wall ? wall.textContent.slice(0, 400) : null });
  })()`,
  returnByValue: true,
})
console.log(res.result?.value)
ws.close(); process.exit(0)
