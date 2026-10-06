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
    const wall = document.querySelector('#wall');
    // find the dropzone then dump its full html
    const dz = wall.querySelector('[class*=drop], [class*=upload], [class*=drag]');
    if (!dz) return 'no dz';
    return dz.outerHTML.slice(0, 1200);
  })()`,
  returnByValue: true,
})
console.log(res.result?.value ?? JSON.stringify(res))
ws.close(); process.exit(0)
