import prisma from '../dbClient.js'

import { getTasks } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getTasks as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type GetTasks = typeof getTasks 
