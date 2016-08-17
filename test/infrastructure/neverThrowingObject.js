
if(typeof Proxy === 'undefined'){
  console.warn("The standard Proxy built-in is not defined. You need Node v6+. You're using version", process.version)
  process.exit(-1);
}

export default function(){
  const target = function () { return proxy; };
  const handler = {
    get() { return proxy; }
  }
  const proxy = new Proxy(target, handler);

  return proxy;
}