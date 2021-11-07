import { useState, useMemo } from 'react'

const WORKER_CONFIG: WorkerOptions = {
  name: 'demo-hook-v1',
};

export const useDisposableWebworker = () => {
  const [result, setResult] = useState()

  const worker = useMemo(() => new SharedWorker(
    new URL('worker.ts', import.meta.url),
    WORKER_CONFIG
  ), [])

  worker.port.onmessage = ({ data: { value } }: MessageEvent) => {
    setResult(value)
  }

  const run = () => {
    worker.port.postMessage({ type: 'INCREMENT' })
  }

  return {
    result,
    run,
  }
}