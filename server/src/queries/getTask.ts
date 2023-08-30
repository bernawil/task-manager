import prisma from '../dbClient.js'

import { getTask } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type GetTask = typeof getTask 
