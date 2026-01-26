import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDeck } from './useDeck'

describe('useDeck', () => {
  it('초기 상태: currentCard는 null이고 52장이 남아있다', () => {
    const { result } = renderHook(() => useDeck())

    expect(result.current.currentCard).toBeNull()
    expect(result.current.remainingCount).toBe(52)
    expect(result.current.totalCount).toBe(52)
  })

  it('drawCard: 카드를 뽑으면 currentCard가 설정되고 남은 카드 수가 줄어든다', () => {
    const { result } = renderHook(() => useDeck())

    act(() => {
      result.current.drawCard()
    })

    expect(result.current.currentCard).not.toBeNull()
    expect(result.current.remainingCount).toBe(51)
  })

  it('drawCard: 여러 번 뽑으면 남은 카드 수가 계속 줄어든다', () => {
    const { result } = renderHook(() => useDeck())

    act(() => {
      result.current.drawCard()
    })
    act(() => {
      result.current.drawCard()
    })
    act(() => {
      result.current.drawCard()
    })

    expect(result.current.remainingCount).toBe(49)
  })

  it('drawCard: 뽑은 카드를 반환한다', () => {
    const { result } = renderHook(() => useDeck())

    let drawnCard
    act(() => {
      drawnCard = result.current.drawCard()
    })

    expect(drawnCard).toEqual(result.current.currentCard)
  })

  it('drawCard: 덱이 비면 null을 반환한다', () => {
    const { result } = renderHook(() => useDeck())

    for (let i = 0; i < 52; i++) {
      act(() => {
        result.current.drawCard()
      })
    }

    expect(result.current.remainingCount).toBe(0)

    let drawnCard
    act(() => {
      drawnCard = result.current.drawCard()
    })

    expect(drawnCard).toBeNull()
  })

  it('reset: 덱을 초기화하면 52장으로 돌아가고 currentCard는 null이 된다', () => {
    const { result } = renderHook(() => useDeck())

    act(() => {
      result.current.drawCard()
    })
    act(() => {
      result.current.drawCard()
    })

    expect(result.current.remainingCount).toBe(50)

    act(() => {
      result.current.reset()
    })

    expect(result.current.remainingCount).toBe(52)
    expect(result.current.currentCard).toBeNull()
  })
})
