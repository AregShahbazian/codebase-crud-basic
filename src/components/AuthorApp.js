import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";

import routines from "../actions/domain";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import entityCreateFormContainerGenerator from "../containers/entityCreateFormContainerGenerator";
import entityUpdateFormContainerGenerator from "../containers/entityUpdateFormContainerGenerator";
import AuthorTable from "./AuthorTable";
import AuthorCreateForm from "./AuthorCreateForm";
import AuthorUpdateForm from "./AuthorUpdateForm";
import DispatchTest from "./test/dispatchTest";
import {authorCreate as authorCreateValidation, authorUpdate as authorUpdateValidation} from "./form/validation"

const AUTHOR_ENTITY_NAME = "author"
const AUTHOR_ROUTINE_NAME = config.get("entities")[AUTHOR_ENTITY_NAME].routineName

const AuthorTableContainer = entityTableContainerGenerator(routines[AUTHOR_ROUTINE_NAME])
const AuthorCreateFormContainer = entityCreateFormContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorCreateValidation)
const AuthorUpdateFormContainer = entityUpdateFormContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorUpdateValidation)

let AuthorApp = ({entities, entityCreateForm, entityUpdateForm}) => (
    <div>
        <AuthorTableContainer
            entityTableGenerator={
                (entityTableProps) =>
                    // props needed only by the component
                    <AuthorTable {...entityTableProps} entities={entities}/>}/>
        <AuthorCreateFormContainer
            // props needed by the container
            entityCreateForm={entityCreateForm}
            entityCreateFormGenerator={
                (entityCreateFormProps) =>
                    // props needed only by the component
                    <AuthorCreateForm {...entityCreateFormProps} />}/>
        <AuthorUpdateFormContainer
            // props needed by the container
            entityUpdateForm={entityUpdateForm}
            entityUpdateFormGenerator={
                (entityUpdateProps) =>
                    // props needed only by the component
                    <AuthorUpdateForm {...entityUpdateProps} />}/>
        <DispatchTest/>
    </div>
)

AuthorApp.propTypes = {
    entities: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    entityCreateForm: PropTypes.object.isRequired,
    entityUpdateForm: PropTypes.object.isRequired
}

export default AuthorApp
