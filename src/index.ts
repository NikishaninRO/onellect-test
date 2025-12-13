import {
  generateNumberSequence,
  sendNumberSequence,
  sortNumberSequence,
} from './utils.ts'

const sequence = generateNumberSequence()
console.log('original:', sequence)
const sortedSequence = sortNumberSequence(sequence)
console.log('sorted:', sortedSequence)
sendNumberSequence(sortedSequence)
