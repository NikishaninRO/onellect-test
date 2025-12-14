import {
  NUMBER_VALUE_MAX,
  NUMBER_VALUE_MIN,
  NUMBERS_COUNT_MAX,
  NUMBERS_COUNT_MIN,
} from './constants.ts'
import { SortBy } from './enums.ts'

function getRandomNumber(max: number, min: number): number {
  if (max < min) {
    throw new Error('getRandomNumber: max number must be more than min number')
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

function quickSort(data: number[]): number[] {
  if (data.length <= 1) {
    return [...data]
  }

  const pivot = data[Math.floor(data.length / 2)] as number
  const leftPart: number[] = []
  const rightPart: number[] = []
  const middleValues: number[] = []
  for (const num of data) {
    if (compare(num, pivot)) {
      leftPart.push(num)
    } else if (compare(pivot, num)) {
      rightPart.push(num)
    } else {
      middleValues.push(num)
    }
  }
  return [...quickSort(leftPart), ...middleValues, ...quickSort(rightPart)]
}

function mergeSort(data: number[]): number[] {
  if (data.length <= 1) {
    return [...data]
  }

  const middleIndex = Math.floor(data.length / 2)
  const leftPart = mergeSort(data.slice(0, middleIndex))
  const rightPart = mergeSort(data.slice(middleIndex))
  return merge(leftPart, rightPart)
}

function merge(leftPart: number[], rightPart: number[]): number[] {
  const result: number[] = []
  let leftPartIndex = 0
  let rightPartIndex = 0
  while (leftPartIndex < leftPart.length || rightPartIndex < rightPart.length) {
    const leftValue = leftPart[leftPartIndex]
    const rightValue = rightPart[rightPartIndex]
    if (leftPartIndex >= leftPart.length) {
      if (rightValue != null) {
        result.push(rightValue)
      }
      rightPartIndex++
      continue
    }

    if (rightPartIndex >= rightPart.length) {
      if (leftValue != null) {
        result.push(leftValue)
      }
      leftPartIndex++
      continue
    }

    if (rightValue != null && leftValue != null) {
      if (compare(leftValue, rightValue)) {
        result.push(leftValue)
        leftPartIndex++
      } else {
        result.push(rightValue)
        rightPartIndex++
      }
    }
  }
  return result
}

function compare(left: number, right: number): boolean {
  const sortBy =  process.env.SORT_BY
  switch (sortBy) {
    case SortBy.ASCEND:
      return left < right
    case SortBy.DESCEND:
      return left > right
    default:
      return left < right
  }
}

export function generateNumberSequence(): number[] {
  const numbersCount = getRandomNumber(NUMBERS_COUNT_MAX, NUMBERS_COUNT_MIN)
  const result = []
  for (let i = 0; i < numbersCount; ++i) {
    const randomValue = getRandomNumber(NUMBER_VALUE_MAX, NUMBER_VALUE_MIN)
    result.push(randomValue)
  }
  return result
}

export function sortNumberSequence(data: number[]): number[] {
  const ranomNum = Math.round(Math.random())
  const result = ranomNum === 1 ? quickSort(data) : mergeSort(data)
  return result
}

export async function sendNumberSequence(sequence: number[]): Promise<void> {
  try {
    const result = await fetch(`${process.env.SERVER_URL}/number_sequence`, {
      method: 'POST',
      body: JSON.stringify(sequence),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    console.log(result.status, result.statusText)
  } catch (err) {
    console.error(err)
  }
}
