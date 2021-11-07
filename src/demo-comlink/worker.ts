import { expose } from "comlink";
import { obj } from "./obj";

const ports: MessagePort[] = []

export const updateAllTab = () => {
    ports.forEach(port => {
        port.postMessage({ type: 'VALUE', value: obj.counter })
    })
}

// @ts-ignore
onconnect = (event: any) => {
    const port = event.ports[0];
    ports.push(port);
    expose({ updateAllTab, obj }, port);
};