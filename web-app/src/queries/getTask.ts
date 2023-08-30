import { createQuery } from './core'
import { GetTask } from '../../../server/src/queries/getTask'


const query = createQuery<GetTask>(
  'operations/get-task',
  ['Task'],
)

export default query
