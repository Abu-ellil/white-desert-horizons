// End-to-end upload test against PRODUCTION: fill the form, pick a real file,
// submit, and report what comes back.
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const out = {};

  const wall = document.querySelector('#wall');
  out.wallPresent = !!wall;
  if (!wall) return JSON.stringify(out);

  const trigger = [...wall.querySelectorAll('button')].find((b) =>
    /share your desert photo/i.test(b.textContent),
  );
  if (!trigger) {
    out.error = 'trigger button not found';
    return JSON.stringify(out);
  }
  trigger.click();
  await sleep(600);

  const author = document.getElementById('submit-author');
  const caption = document.getElementById('submit-caption');
  const fileInput = document.querySelector('input[type=file]');
  out.formOpen = !!author && !!fileInput;
  if (!author || !fileInput) return JSON.stringify(out);

  const setVal = (el, v) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement;
    Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  setVal(author, 'فريق الموقع');
  setVal(caption, 'اختبار رفع — كثبان وادي الحيتان وقت الغروب');

  // Attach the real file through DataTransfer so the change event fires.
  const res = await fetch('/favicon.ico').catch(() => null);
  const fileResp = await fetch(window.location.origin + '/images/test-upload.jpg').catch(() => null);
  out.fileFetch = fileResp ? fileResp.status : 'no /images path';
  return JSON.stringify(out);
})()