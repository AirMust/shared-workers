const createWorker = () => {
    const obj = {
        counter: 0,

        increment() {
            this.counter++;
        },
    };

    const ports: MessagePort[] = []

    const updateAllTab = () => {
        console.log(obj)
        ports.forEach(port => {
            port.postMessage({ type: 'VALUE', value: obj.counter })
        })
    }

    const handleMessage = (event: MessageEvent) => {
        console.log(event);
        const { data: { type } } = event;
        if (type === 'INCREMENT') {
            obj.increment();
            updateAllTab();
        }
    }

    // @ts-ignore
    onconnect = (event: MessageEvent) => {
        const port = event.ports[0];
        port.onmessage = handleMessage;
        ports.push(port);
    };
}

export { createWorker }