const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const target = list.find((t) => t.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => { const m = ++id; pending.set(m, { resolve, reject }); ws.send(JSON.stringify({ id: m, method, params })) })
ws.addEventListener('message', (ev) => { const msg = JSON.parse(ev.data); if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result) } })
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
await send('Page.enable')
await send('Page.navigate', { url: 'https://www.whitedeserthorizons.com/admin' })
await new Promise((r) => setTimeout(r, 5000))
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const inputs = [...document.querySelectorAll('input')].map(i => ({ type: i.type, id: i.id, name: i.name }));
    return JSON.stringify({ url: location.pathname, inputs, title: document.querySelector('h1')?.textContent.trim() });
  })()`,
  returnByValue: true,
})
console.log(res.result?.value)
ws.close(); process.exit(0)
