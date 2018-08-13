import React from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    value,
    name,
    placeholder,
    error,
    onChange,
    type
})=>{

    return (
        <div className="form-field">
            <input type={type} value={value} onChange={onChange} name={name} placeholder={placeholder} className={classnames("input", {"is-error": error}) } type="text"/>
            {error&&(<span className="input-msg--error">{error}</span>)}
        </div>
    )

}


TextFieldGroup.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup;
