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
    const author = document.getElementById('submit-author');
    if (!author) return 'no author field';
    const form = author.closest('form');
    if (!form) return 'author has no form parent';
    const first = form.innerHTML.slice(0, 1500);
    return JSON.stringify({ formId: form.id || null, first1500: first }, null, 1);
  })()`,
  returnByValue: true,
})
console.log(res.result?.result?.value ?? JSON.stringify(res))
ws.close(); process.exit(0)
