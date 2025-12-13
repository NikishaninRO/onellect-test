import type { SortBy } from './enums.ts'

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string
      SORT_BY: SortBy
    }
  }
}
