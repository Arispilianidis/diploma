import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './components/FormikControl'
import axios from 'axios';
import './css/Login.css';


const workersURL = "http://localhost:3000/users"


function Login() {

    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const onSubmit = loginValues => {

        console.log('Form data', loginValues)

        axios.get(workersURL, {
            params: { loginValues },
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {

                if (response.data.data !== undefined) {

                    alert("Welcome " + loginValues.username)
                    setTimeout(function () {
                        navigate("/Processes", { state: [response.data.data] });
                    }, 500);
                }
                else {
                    alert("You dont have access to this page")
                }

            })
            .catch(error => console.log("Error at get users " + error.message))


    }

    return (
        <div className="flexBoxes">

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => <Form className="form-container">
                        <div className="imgcontainer">
                            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" />
                        </div>
                        <FormikControl control='input' type='text' label='Username' name='username' placeholder="Enter Username" />
                        <FormikControl control='input' type='text' label='Password' name='password' placeholder="Enter Password" />
                        <button type='submit' disabled={!formik.isValid}> Submit</button>
                    </Form>
                }
            </Formik>

        </div>
    )

}

export default Login


