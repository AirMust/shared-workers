import React from 'react';
import { useDisposableWebworker } from './hook';
import { createWorker } from './worker';

export const DemoHookBlob: React.FC = () => {
  const ulrWorker = URL.createObjectURL(new Blob([`${createWorker}()`]))

  const { run, result } = useDisposableWebworker(ulrWorker);

  const handleInc = () => {
    run();
  };


  return (
    <div>
      <h1>SharedWorker Demo Hook Blob </h1>
      <h2>{`State: ${result}`}</h2>
      <button onClick={handleInc}>Increment</button>
    </div>
  );
};
