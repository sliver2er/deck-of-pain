import { describe, it, expect } from 'vitest'
import { createDeck, shuffleDeck, createShuffledDeck, getExerciseCount } from './deck'
import type { Card, Difficulty } from '../types'

describe('createDeck', () => {
  it('52장의 카드를 생성한다', () => {
    const deck = createDeck()
    expect(deck).toHaveLength(52)
  })

  it('각 문양별로 13장씩 있다', () => {
    const deck = createDeck()
    const suits = ['spade', 'club', 'heart', 'diamond'] as const

    suits.forEach((suit) => {
      const suitCards = deck.filter((card) => card.suit === suit)
      expect(suitCards).toHaveLength(13)
    })
  })

  it('각 문양의 카드 값이 1~13까지 있다', () => {
    const deck = createDeck()
    const spadeCards = deck.filter((card) => card.suit === 'spade')
    const values = spadeCards.map((card) => card.value).sort((a, b) => a - b)

    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
  })

  it('카드 display가 올바르게 설정된다', () => {
    const deck = createDeck()
    const aceCard = deck.find((card) => card.value === 1)
    const jackCard = deck.find((card) => card.value === 11)
    const kingCard = deck.find((card) => card.value === 13)

    expect(aceCard?.display).toBe('A')
    expect(jackCard?.display).toBe('J')
    expect(kingCard?.display).toBe('K')
  })
})

describe('shuffleDeck', () => {
  it('셔플 후에도 52장을 유지한다', () => {
    const deck = createDeck()
    const shuffled = shuffleDeck(deck)

    expect(shuffled).toHaveLength(52)
  })

  it('원본 덱을 변경하지 않는다', () => {
    const deck = createDeck()
    const originalFirst = deck[0]
    shuffleDeck(deck)

    expect(deck[0]).toBe(originalFirst)
  })

  it('셔플된 덱은 원본과 다른 순서를 가진다 (높은 확률)', () => {
    const deck = createDeck()
    const shuffled = shuffleDeck(deck)

    const sameOrder = deck.every((card, i) =>
      card.suit === shuffled[i].suit && card.value === shuffled[i].value
    )
    expect(sameOrder).toBe(false)
  })

  it('셔플 후에도 같은 카드들이 존재한다', () => {
    const deck = createDeck()
    const shuffled = shuffleDeck(deck)

    const deckSorted = [...deck].sort((a, b) =>
      `${a.suit}-${a.value}`.localeCompare(`${b.suit}-${b.value}`)
    )
    const shuffledSorted = [...shuffled].sort((a, b) =>
      `${a.suit}-${a.value}`.localeCompare(`${b.suit}-${b.value}`)
    )

    expect(shuffledSorted).toEqual(deckSorted)
  })
})

describe('createShuffledDeck', () => {
  it('셔플된 52장의 덱을 반환한다', () => {
    const deck = createShuffledDeck()
    expect(deck).toHaveLength(52)
  })
})

describe('getExerciseCount', () => {
  const createCard = (value: number): Card => ({
    suit: 'spade',
    value: value as Card['value'],
    display: String(value),
  })

  describe('일반 난이도 (beginner/easy/medium/hard)', () => {
    const difficulties: Difficulty[] = ['beginner', 'easy', 'medium', 'hard']

    it.each(difficulties)('%s: 숫자 카드(2-10)는 카드 값만큼 반환한다', (difficulty) => {
      expect(getExerciseCount(createCard(2), difficulty)).toBe(2)
      expect(getExerciseCount(createCard(5), difficulty)).toBe(5)
      expect(getExerciseCount(createCard(10), difficulty)).toBe(10)
    })

    it.each(difficulties)('%s: A 카드는 faceCardValue(10)을 반환한다', (difficulty) => {
      expect(getExerciseCount(createCard(1), difficulty)).toBe(10)
    })

    it.each(difficulties)('%s: J, Q, K 카드는 faceCardValue(10)을 반환한다', (difficulty) => {
      expect(getExerciseCount(createCard(11), difficulty)).toBe(10)
      expect(getExerciseCount(createCard(12), difficulty)).toBe(10)
      expect(getExerciseCount(createCard(13), difficulty)).toBe(10)
    })
  })

  describe('하드코어 난이도', () => {
    const difficulty: Difficulty = 'hardcore'

    it('모든 카드가 카드 값 그대로 반환한다', () => {
      expect(getExerciseCount(createCard(1), difficulty)).toBe(1)
      expect(getExerciseCount(createCard(5), difficulty)).toBe(5)
      expect(getExerciseCount(createCard(10), difficulty)).toBe(10)
      expect(getExerciseCount(createCard(11), difficulty)).toBe(11)
      expect(getExerciseCount(createCard(12), difficulty)).toBe(12)
      expect(getExerciseCount(createCard(13), difficulty)).toBe(13)
    })
  })
})
