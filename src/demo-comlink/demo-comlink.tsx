import React, { useState } from 'react';
import * as Comlink from 'comlink';

const WORKER_CONFIG: WorkerOptions = {
  name: 'demo-comlink-v1',
  type: 'module',
};

export const DemoComlink: React.FC = () => {
  const worker = new SharedWorker(
    new URL('worker.ts', import.meta.url),
    WORKER_CONFIG,
  );
  const port = Comlink.wrap<any>(worker.port);

  const [state, setState] = useState<number>();

  const handleInc = async () => {
    await port.obj.increment();
    await port.updateAllTab();
  };

  worker.port.onmessage = async ({ data: { type, value } }: MessageEvent) => {
    if (type === 'VALUE') {
      setState(value);
    }
  };

  return (
    <div>
      <h1>SharedWorker Comlink Demo </h1>
      <h2>{`State: ${state}`}</h2>
      <button onClick={handleInc}>Increment</button>
    </div>
  );
};
