import React from "react";

export const renderInput = ({input, meta, placeholder}) => {
    return <div>
        <input {...input} placeholder={placeholder}/>
        {meta.error && meta.touched &&
        <span id={input.name + "-error"}>
            {meta.error}
        </span>}
    </div>
}