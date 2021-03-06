import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function CheckboxGroup(props) {
    const { label, name, options, ...rest } = props

    function SearchBox() {
        // Declare variables
        var input, filter, ul, li, i, mylabels;
        var inputsWeActuallyWant = [];
        input = document.getElementById(props.name);
        console.log(input)
        filter = input.value.toLowerCase();
        ul = document.getElementById(props.id);
        console.log(ul)
        li = ul.getElementsByTagName("input");
        mylabels = ul.getElementsByTagName("label");

        for (i = 0; i <= (li.length - 1); i++) {
            if (li[i].id !== props.name) {
                inputsWeActuallyWant.push(li[i]);

            }
        }
        li = inputsWeActuallyWant;

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {

            if (mylabels[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                mylabels[i].style.display = "";

            } else {
                li[i].style.display = "none";
                mylabels[i].style.display = "none";
            }
        }
    }

    return (
        <div>
            <label style={{textAlign: 'center' }}><b>{label}</b></label>
            <div id={props.id} className="CheckboxContainer">

                <input type="text" id={props.name} onKeyUp={SearchBox} placeholder="Search.." />

                <Field name={name} {...rest}>
                    {
                        ({ field }) => {
                            return options.map(option => {
                                return (
                                    <React.Fragment key={option.key}>
                                        <div style={{ justifyContent: 'flex-start' }} className="flexBoxes">
                                            <input type='checkbox' id={option.value} {...field} value={option.value} checked={field.value.includes(option.value)} />
                                            <label style={{ fontSize: 13.5, marginTop: 7.5, fontStyle: 'italic' }} htmlFor={option.value}>{option.key}</label>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    }
                </Field>

            </div>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default CheckboxGroup


