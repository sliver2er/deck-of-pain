import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWorkoutSession } from './useWorkoutSession'

describe('useWorkoutSession', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('초기 상태', () => {
    it('phase는 ready, 카드와 운동 정보는 null', () => {
      const { result } = renderHook(() => useWorkoutSession())

      expect(result.current.phase).toBe('ready')
      expect(result.current.currentCard).toBeNull()
      expect(result.current.currentExercise).toBeNull()
      expect(result.current.exerciseCount).toBe(0)
      expect(result.current.completedCards).toBe(0)
      expect(result.current.totalCards).toBe(52)
      expect(result.current.isPaused).toBe(false)
    })

    it('stats가 초기화되어 있다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      expect(result.current.stats).toEqual({
        squat: 0,
        situp: 0,
        burpee: 0,
        pushup: 0,
        totalExerciseTime: 0,
        totalRestTime: 0,
        completedCards: 0,
      })
    })
  })

  describe('startSession', () => {
    it('세션을 시작하면 phase가 exercise가 되고 카드가 설정된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      expect(result.current.phase).toBe('exercise')
      expect(result.current.currentCard).not.toBeNull()
      expect(result.current.currentExercise).not.toBeNull()
      expect(result.current.difficulty).toBe('beginner')
    })

    it('다른 난이도로 시작할 수 있다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('hardcore')
      })

      expect(result.current.difficulty).toBe('hardcore')
    })
  })

  describe('completeExercise', () => {
    it('운동을 완료하면 completedCards가 증가한다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.completeExercise()
      })

      expect(result.current.stats.completedCards).toBe(1)
    })

    it('쉬는 시간이 있는 난이도면 rest phase로 전환된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.completeExercise()
      })

      expect(result.current.phase).toBe('rest')
      expect(result.current.restTime).toBeGreaterThan(0)
    })

    it('하드코어 난이도면 바로 다음 카드로 넘어간다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('hardcore')
      })

      const firstCard = result.current.currentCard

      act(() => {
        result.current.completeExercise()
      })

      expect(result.current.phase).toBe('exercise')
      expect(result.current.currentCard).not.toEqual(firstCard)
    })
  })

  describe('skipRest', () => {
    it('쉬는 시간을 건너뛰고 다음 운동으로 넘어간다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.completeExercise()
      })

      expect(result.current.phase).toBe('rest')

      act(() => {
        result.current.skipRest()
      })

      expect(result.current.phase).toBe('exercise')
    })
  })

  describe('pause / resume', () => {
    it('pause하면 isPaused가 true가 된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.pause()
      })

      expect(result.current.isPaused).toBe(true)
    })

    it('resume하면 isPaused가 false가 된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.pause()
      })

      act(() => {
        result.current.resume()
      })

      expect(result.current.isPaused).toBe(false)
    })
  })

  describe('quit', () => {
    it('포기하면 phase가 complete가 된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.quit()
      })

      expect(result.current.phase).toBe('complete')
    })
  })

  describe('reset', () => {
    it('초기 상태로 돌아간다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      act(() => {
        result.current.completeExercise()
      })

      act(() => {
        result.current.reset()
      })

      expect(result.current.phase).toBe('ready')
      expect(result.current.currentCard).toBeNull()
      expect(result.current.stats.completedCards).toBe(0)
    })
  })

  describe('운동 통계', () => {
    it('완료한 운동의 횟수가 stats에 누적된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('beginner')
      })

      const exercise = result.current.currentExercise!
      const count = result.current.exerciseCount

      act(() => {
        result.current.completeExercise()
      })

      expect(result.current.stats[exercise]).toBe(count)
      expect(result.current.stats.completedCards).toBe(1)
    })
  })

  describe('52장 완료', () => {
    it('52장을 모두 완료하면 phase가 complete가 된다', () => {
      const { result } = renderHook(() => useWorkoutSession())

      act(() => {
        result.current.startSession('hardcore')
      })

      for (let i = 0; i < 52; i++) {
        act(() => {
          result.current.completeExercise()
        })
      }

      expect(result.current.phase).toBe('complete')
      expect(result.current.stats.completedCards).toBe(52)
    })
  })
})
