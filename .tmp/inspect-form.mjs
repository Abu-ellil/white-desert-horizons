// Inspect the submit form structure on production: what ids/classes exist.
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
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
    resolve(msg)
  }
})
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const wall = document.querySelector('#wall');
    if (!wall) return 'NO WALL';
    const trigger = [...wall.querySelectorAll('button')].find(b => /share your desert photo/i.test(b.textContent));
    if (trigger) trigger.click();
    return new Promise(r => setTimeout(() => {
      const inputs = [...document.querySelectorAll('input, textarea')].map(el => ({
        tag: el.tagName, type: el.type || null, id: el.id || null, name: el.name || null,
      }));
      r(JSON.stringify({ inputs }, null, 1));
    }, 800));
  })()`,
  returnByValue: true,
  awaitPromise: true,
})
console.log(JSON.stringify(res.result?.value ?? res, null, 1))
ws.close()
process.exit(0)