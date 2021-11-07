import { obj } from "./obj";

const ports: MessagePort[] = []

const handleMessage = (event: MessageEvent) => {
    const { data: { type } } = event;
    if (type === 'INCREMENT') {
        obj.increment();
        ports.forEach(port => {
            port.postMessage({
                type: 'VALUE',
                value: obj.counter
            })
        })
    }
}

//@ts-ignore
onconnect = (event: MessageEvent) => {
    const port = event.ports[0];
    port.onmessage = handleMessage;
    ports.push(port);
};