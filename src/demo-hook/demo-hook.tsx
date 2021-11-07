import React, { useState, useEffect } from 'react';
import { useDisposableWebworker } from './hook';

export const DemoHook: React.FC = () => {
  const { run, result } = useDisposableWebworker();

  const handleInc = () => {
    run();
  };


  return (
    <div>
      <h1>SharedWorker Simple Demo </h1>
      <h2>{`State: ${result}`}</h2>
      <button onClick={handleInc}>Increment</button>
    </div>
  );
};
