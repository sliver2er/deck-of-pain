import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStopwatch, useCountdown } from './useTimer'

describe('useStopwatch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('초기 상태: time은 0이고 isRunning은 false', () => {
    const { result } = renderHook(() => useStopwatch())

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('start: 시작하면 isRunning이 true가 된다', () => {
    const { result } = renderHook(() => useStopwatch())

    act(() => {
      result.current.start()
    })

    expect(result.current.isRunning).toBe(true)
  })

  it('start: 시간이 1초씩 증가한다', () => {
    const { result } = renderHook(() => useStopwatch())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.time).toBe(1)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.time).toBe(3)
  })

  it('stop: 멈추면 isRunning이 false가 되고 시간이 멈춘다', () => {
    const { result } = renderHook(() => useStopwatch())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    act(() => {
      result.current.stop()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.time).toBe(2)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.time).toBe(2)
  })

  it('reset: 시간과 상태를 초기화한다', () => {
    const { result } = renderHook(() => useStopwatch())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })
})

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('초기 상태: time은 0, isRunning/isComplete는 false', () => {
    const { result } = renderHook(() => useCountdown())

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isComplete).toBe(false)
  })

  it('start: 지정된 초로 시작한다', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => {
      result.current.start(10)
    })

    expect(result.current.time).toBe(10)
    expect(result.current.isRunning).toBe(true)
    expect(result.current.isComplete).toBe(false)
  })

  it('start: 시간이 1초씩 감소한다', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => {
      result.current.start(5)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.time).toBe(4)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.time).toBe(2)
  })

  it('카운트다운 완료 시 isComplete가 true가 되고 onComplete가 호출된다', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useCountdown(onComplete))

    act(() => {
      result.current.start(2)
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isComplete).toBe(true)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('stop: 카운트다운을 멈춘다', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => {
      result.current.start(10)
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    act(() => {
      result.current.stop()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.time).toBe(7)
  })

  it('reset: 상태를 초기화한다', () => {
    const { result } = renderHook(() => useCountdown())

    act(() => {
      result.current.start(10)
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isComplete).toBe(false)
  })
})
