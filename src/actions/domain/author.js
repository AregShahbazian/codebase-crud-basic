import * as actions from "../index";

export const OPERATIONS = actions.createOperationTypes('AUTHOR')
export const entityActions = actions.entityActions(OPERATIONS)


