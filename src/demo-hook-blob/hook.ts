import { useState, useMemo } from 'react'

const WORKER_CONFIG: WorkerOptions = {
  name: 'demo-hook-blob-v1',
};

export const useDisposableWebworker = (urlWorker: string) => {
  const [result, setResult] = useState()

  const worker = useMemo(() => new SharedWorker(
    urlWorker,
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