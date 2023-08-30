import HttpError from '../core/HttpError.js'

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const tasks = await context.entities.Task.findMany({
    where: {
      user: { id: context.user.id }
    },
    orderBy: {
      dueDate: args.sortBy === 'date' ? 'asc' : undefined,
      type: args.sortBy === 'type' ? 'asc' : undefined,
      label: args.sortBy === 'label' ? 'asc' : undefined
    }
  })

  return tasks
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.findUnique({
    where: {
      id: args.taskId,
      user: { id: context.user.id }
    }
  });

  if (!task) { throw new HttpError(400) }

  return task;
}