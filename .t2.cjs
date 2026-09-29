/* Probe Mongo connection without printing secrets. */
const fs = require("fs");
const env = {};
for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const uri = env.MONGODB_URI;
const u = new URL(uri.replace("mongodb://", "http://").replace("mongodb+srv://", "http://"));
console.log("host(s):", u.hostname, "| params:", u.searchParams.toString().replace(/[^&=]+=[^&]*/g, (s) => s.split("=")[0] + "=***"));

const { MongoClient } = require("mongodb");
(async () => {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  try {
    await client.connect();
    const hello = await client.db("admin").command({ hello: 1 });
    console.log("hello:", JSON.stringify({
      isWritablePrimary: hello.isWritablePrimary,
      secondary: hello.secondary,
      setName: hello.setName,
      me: hello.me,
      hosts: hello.hosts,
      primary: hello.primary,
    }));
    const col = client.db().collection("testimonials");
    try {
      const n = await col.countDocuments({});
      console.log("READ OK — testimonials count:", n);
    } catch (e) {
      console.log("READ FAIL:", e.code || "", e.codeName || "", String(e.message).slice(0, 160));
    }
  } catch (e) {
    console.log("CONNECT FAIL:", String(e.message).slice(0, 300));
  } finally {
    try { await client.close(); } catch {}
  }
})();
