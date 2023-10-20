const buf = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));

const t1 = (async () => {
  const result = Atomics.waitAsync(buf, 0, 0);
  if (!result.async) {
    throw new Error("AssertionError");
  }
  await result.value;
})();

const t2 = (async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  Atomics.store(buf, 0, 1);
  Atomics.notify(buf, 0);
})();

await Promise.all([t1, t2]);
console.log("ok");
