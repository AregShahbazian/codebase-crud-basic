import * as _actions from '../index'

export const OPERATIONS = _actions.createOperationTypes('AUTHOR')
export const entityActions = _actions.entityActions(OPERATIONS)


