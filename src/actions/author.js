import * as _actions from './index'

export const OPERATIONS = _actions.createOperationTypes('AUTHOR')
export const actions = _actions.entityActions(OPERATIONS)


