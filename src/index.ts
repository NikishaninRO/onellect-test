import {
  generateNumberSequence,
  sendNumberSequence,
  sortNumberSequence,
} from './utils.ts'

const sequence = generateNumberSequence()
console.log('original:', sequence.toString())
const sortedSequence = sortNumberSequence(sequence)
console.log('sorted:', sortedSequence.toString())
sendNumberSequence(sortedSequence)
