import React, { useState } from 'react';

const WORKER_CONFIG: WorkerOptions = {
  name: 'demo-simple-v1',
  type: 'module',
};

export const DemoSimple: React.FC = () => {
  const [state, setState] = useState<number>();

  const worker = new SharedWorker(
    new URL('worker.ts', import.meta.url),
    WORKER_CONFIG,
  );

  worker.port.onmessage = (
    { data: { type, value } }: MessageEvent
  ) => {
    if (type === 'VALUE') {
      setState(value);
    }
  };

  const handleIncrement = () => {
    worker.port.postMessage({ type: 'INCREMENT' });
  };

  return (
    <div>
      <h1>SharedWorker Simple Demo </h1>
      <h2>{`State: ${state}`}</h2>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};
