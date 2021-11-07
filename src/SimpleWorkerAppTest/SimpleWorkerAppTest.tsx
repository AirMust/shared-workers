import React, { useEffect, useState } from 'react';
import { EVENT_WORKER } from '../utils';

const nameFile = 'worker-simple';
const version = 2232;

const worker = new SharedWorker(
  new URL('worker-simple.ts', import.meta.url),
  { type: 'module', name: `${nameFile}-${version}` },
);

type MessageProps = { id: string; from: string; time: number };

export const SimpleWorkerAppTest: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [id, setId] = useState(undefined);

  //@ts-ignore
  function download(text, name, type) {
    const a = document.createElement('a');
    const file = new Blob([text], { type: type });
    console.log(file, text, URL.createObjectURL(file));
    //@ts-ignore
    a.href = URL.createObjectURL(file);
    //@ts-ignore
    a.download = name;
    a.click();
  }

  const getResult = (event: MessageEvent) => {
    const rti = new Date().valueOf();
    console.log(event.data);
    const { data } = event as MessageEvent;
    const { obj, start, index, length, from, size, patch } = data;
    if (data.event === 'end') {
      download(JSON.stringify(data.message), data.name, 'text/json');
    }
    const temp = [{ id: index, from, time: rti - start }];
    worker.port.postMessage({
      event: EVENT_WORKER.RESULT,
      temp: [{ id: index, from, time: rti - start, size, patch }],
    });

    // console.log(`${from} -> ${index}`, new Date().valueOf() - start);
  };

  useEffect(() => {
    const msgChn = new MessageChannel();
    worker.port.onmessage = getResult;
    msgChn.port1.onmessage = getResult;
    worker.port.postMessage(
      { event: EVENT_WORKER.INIT, port: msgChn.port2, message: 'from Main' },
      [msgChn.port2],
    );
  }, []);

  const handleClick = () => {
    let x = -1;
    setInterval(() => {
      if (++x < 100) {
        worker.port.postMessage({ event: EVENT_WORKER.MESSAGE });
      }
    }, 10000);
  };

  const handleGenerateTabs = () => {
    Array(19)
      .fill(0)
      .forEach(() => window.open('/', '_blank'));
  };
  return (
    <div>
      <h1>Simple - SharedWorker (API) - App</h1>
      <h2>{`ID: ${id}`}</h2>
      <button type="button" onClick={handleClick}>
        Send
      </button>
      <button type="button" onClick={handleGenerateTabs}>
        Generate tabs
      </button>
      <h3>Messages:</h3>
      <ul>
        {messages.map((obj, index) => (
          <li
            key={obj.id + index}
            style={{ color: obj.id === id ? 'green' : 'blue' }}
          >
            {`${obj.from} -> ${obj.id} | ${obj.time}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
