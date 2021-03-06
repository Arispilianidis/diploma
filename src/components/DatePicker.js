import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import "react-datepicker/dist/react-datepicker.css";
import "../css/Datepicker.css"


function DatePicker(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <label htmlFor={name}><b>{label}</b></label>
            <Field name={name}>
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return <DateView id={name} {...field} {...rest} selected={value} onChange={val => setFieldValue(name, val)} />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </>
    )
}

export default DatePicker
