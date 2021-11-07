import { EVENT_WORKER, generateObject } from '../utils';
const ports: MessagePort[] = [];

const message: any[] = [];
let patch = 0;

export type MetaTransportProps = Record<string, {
    portSharedWorker?: MessagePort;
    portWorker?: MessagePort;
    worker?: Worker
}>

const metaTransport: MetaTransportProps = {};

const createWorker = (obj: any) => {
    let curPort: MessagePort;

    onmessage = (event: MessageEvent) => {
        const { data } = event;
        if (data.event === EVENT_WORKER.INIT) {
            curPort = data.port;
        }
        else if (data.event === EVENT_WORKER.MESSAGE) {
            const { index, from, patch } = data;
            curPort.postMessage({ obj, index, start: new Date().valueOf(), from, patch });
        }
    };
}

const onMessage = (event: MessageEvent) => {
    const { data, target } = event;
    const currentId = Object.keys(metaTransport).find(key => metaTransport[key].portSharedWorker === target) || '';
    const currentIndex = Object.keys(metaTransport).indexOf(currentId);

    const obj = generateObject(10, 5);

    switch (data.event) {
        case EVENT_WORKER.INIT:
            if (currentId) {
                metaTransport[currentId].portWorker = data.port;

                const urlWorker = URL.createObjectURL(new Blob([`(${createWorker})(${JSON.stringify(obj)})`]));

                const worker = new Worker(urlWorker, { type: 'module' });
                metaTransport[currentId].worker = worker;
                metaTransport[currentId].worker?.postMessage({ event: EVENT_WORKER.INIT, port: data.port }, [data.port]);
            }
            break;
        case EVENT_WORKER.MESSAGE:
            if (currentId) {
                patch += 1;
                Object.values(metaTransport).forEach(({ worker }, index) => {
                    worker?.postMessage({
                        event: EVENT_WORKER.MESSAGE,
                        from: currentIndex,
                        start: new Date().valueOf(),
                        index,
                        patch
                    })
                })
            }
            break;
        case EVENT_WORKER.RESULT:
            const { temp } = data;
            message.push(...temp)
            console.log(message);
            break;
        default:
            break;
    }
}

// @ts-ignore
onconnect = (event: MessageEvent) => {
    const id = ports.length;
    const port = event.ports[0];
    metaTransport[id] = { portSharedWorker: port };
    ports.push(port);
    port.onmessage = onMessage;
};