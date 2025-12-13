import {
  NUMBER_VALUE_MAX,
  NUMBER_VALUE_MIN,
  NUMBERS_COUNT_MAX,
  NUMBERS_COUNT_MIN,
} from './constants.ts'
import { SortBy } from './enums.ts'

function getRanomNumber(max: number, min: number): number {
  if (max < min) {
    throw new Error('getRanomNumber: max number must be more than min number')
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
    if (compareFunc(num, pivot)) {
      leftPart.push(num)
    } else if (compareFunc(pivot, num)) {
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
  let i = 0
  let j = 0
  while (i < leftPart.length || j < rightPart.length) {
    const leftValue = leftPart[i]
    const rightValue = rightPart[j]
    if (i >= leftPart.length) {
      if (rightValue != null) {
        result.push(rightValue)
      }
      j++
      continue
    }

    if (j >= rightPart.length) {
      if (leftValue != null) {
        result.push(leftValue)
      }
      i++
      continue
    }

    if (rightValue != null && leftValue != null) {
      if (compareFunc(leftValue, rightValue)) {
        result.push(leftValue)
        i++
      } else {
        result.push(rightValue)
        j++
      }
    }
  }
  return result
}

function compareFunc(left: number, right: number) {
  return process.env.SORT_BY === SortBy.ASCEND ? left < right : left > right
}

export function generateNumberSequence(): number[] {
  const numbersCount = getRanomNumber(NUMBERS_COUNT_MAX, NUMBERS_COUNT_MIN)
  const result = []
  for (let i = 0; i < numbersCount; ++i) {
    const randomValue = getRanomNumber(NUMBER_VALUE_MAX, NUMBER_VALUE_MIN)
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
