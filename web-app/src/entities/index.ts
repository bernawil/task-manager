import {
  User,
  Task,
} from '@prisma/client'
  
export type {
  User,
  Task,
} from '@prisma/client'

export type Entity = 
  | User
  | Task
  | never
