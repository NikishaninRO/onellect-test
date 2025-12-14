import type { SortBy } from './enums.ts'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string
      SORT_BY: SortBy
    }
  }
}

export {}
