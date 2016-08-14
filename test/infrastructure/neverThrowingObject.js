export default function(){
    const target = function(){ return proxy; };
    const handler = {
        get(){ return proxy; }
    }
    const proxy = new Proxy(target, handler);

    return proxy;
}