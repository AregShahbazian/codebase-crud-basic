import React from "react";
import PropTypes from "prop-types";
import config from "../config/index";

import routines from "../actions/domain";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import entityFilterFormContainerGenerator from "../containers/entityFilterFormContainerGenerator";
import entityCreateFormContainerGenerator from "../containers/entityCreateFormContainerGenerator";
import entityUpdateFormContainerGenerator from "../containers/entityUpdateFormContainerGenerator";
import AuthorTable from "./AuthorTable";
import AuthorFilterForm from "./AuthorFilterForm";
import AuthorCreateForm from "./AuthorCreateForm";
import AuthorUpdateForm from "./AuthorUpdateForm";
import DispatchTest from "./test/dispatchTest";
import {authorCreate as authorCreateValidation, authorUpdate as authorUpdateValidation} from "./form/validation"

const AUTHOR_ENTITY_NAME = "author"
const AUTHOR_ROUTINE_NAME = config.entities[AUTHOR_ENTITY_NAME].routineName

const AuthorTableContainer = entityTableContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME)
const AuthorFilterFormContainer = entityFilterFormContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME)
const AuthorCreateFormContainer = entityCreateFormContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorCreateValidation)
const AuthorUpdateFormContainer = entityUpdateFormContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorUpdateValidation)

let AuthorApp = ({entities, entityFilterForm}) => (
    <div>
        <AuthorFilterFormContainer
            // props needed by the container
            entityFilterForm={entityFilterForm}
            entityFilterFormGenerator={
                (entityFilterProps) =>
                    // props needed only by the component
                    <AuthorFilterForm {...entityFilterProps} />}/>
        <AuthorTableContainer
            // props needed by the container
            entityFilterForm={entityFilterForm}
            entityTableGenerator={
                (entityTableProps) =>
                    // props needed only by the component
                    <AuthorTable {...entityTableProps}/>}/>
        <AuthorCreateFormContainer
            entityCreateFormGenerator={
                (entityCreateFormProps) =>
                    // props needed only by the component
                    <AuthorCreateForm {...entityCreateFormProps} />}/>
        <AuthorUpdateFormContainer
            entityUpdateFormGenerator={
                (entityUpdateProps) =>
                    // props needed only by the component
                    <AuthorUpdateForm {...entityUpdateProps} />}/>
        <DispatchTest/>
    </div>
)

AuthorApp.propTypes = {
    entityFilterForm: PropTypes.object.isRequired
}

export default AuthorApp
