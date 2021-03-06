import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'


function Input(props) {
  const { label, name, ...rest } = props

    return (

      <div style={{ display: 'inline' }}>

        <label htmlFor={name}><b>{label}</b></label>
        <Field id={name} name={name} {...rest} />
        <ErrorMessage name={name} component={TextError} />

      </div>
    )
  
}

export default Input
