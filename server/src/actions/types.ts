import {
  type _Task,
  type AuthenticatedAction,
  type Payload,
} from '../_types'

export type CreateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

export type UpdateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

export type DeleteTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

