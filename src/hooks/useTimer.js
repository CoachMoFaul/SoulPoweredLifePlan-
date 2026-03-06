import { useState, useEffect, useRef } from 'react'

export function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  function start() { setRunning(true) }

  function pause() { setRunning(false) }

  function stop() {
    setRunning(false)
    const elapsed = seconds
    setSeconds(0)
    return elapsed
  }

  function reset() {
    setRunning(false)
    setSeconds(0)
  }

  return { seconds, running, start, pause, stop, reset }
}
