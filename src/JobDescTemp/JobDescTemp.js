import React, { useState } from 'react';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios'
import '../css/JobDescTemp.css';


import JobDescTemp1 from './JobDescTemp1'

import JobDescTemp2 from './JobDescTemp2'

import JobDescTemp3 from './JobDescTemp3'


function JobDescTemp() {

  let { state } = useLocation();
  let serverUserInfo = state[0] 
  let processName = state[1] 

  const navigate = useNavigate();
  const [step, setStep]= useState(0);
  const [initialValues, setInitialValues] = useState({
 	bussinessName: "",
 	bussinessNameProof: "",
 	radio1: "",
 	drop1: "",
 	drop1Proof: "",
 	input2: 0,
 	textarea1: "",
 	check1: [],
  })


  function postProof(imagefileName) {

    var uploadsPostURL = "http://localhost:3000/uploadeFiles"

    var formData = new FormData();
    var imagefile = document.getElementById(imagefileName)
    console.log(imagefile)
    formData.append("file", imagefile.files[0]);
    axios.post(uploadsPostURL, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'multipart/form-data',
      }
    })
    .catch(error => console.log("Error at postProof => " + error.message))

  }

  const validationSchema1 = Yup.object({
    bussinessName: Yup.string().required('Required'),
    radio1: Yup.string().required('Required'),
    drop1: Yup.string().required('Required'),
  })

  const validationSchema2 = Yup.object({
    input2: Yup.number().required('Required').min(0).max(1000),
    textarea1: Yup.string().required('Required'),
  })

  const validationSchema3 = Yup.object({
    check1: Yup.array().required('Required').min(1, 'Required'),
  })


  // Proceed to next step
  const onSubmit = (formValues, final) => {

    setInitialValues((prev) => ({ ...prev, ...formValues }))

    if (final) {
      console.log("Form submitted", formValues)

      navigate("/JobDescTempFinal", {state: [formValues,serverUserInfo,processName]});
    }
    else{
      setStep(step => step + 1)
    }

  }

  // Proceed to prev step
  function prevStep() {
    setStep(step => step - 1)
  }

  const pages = [

		<JobDescTemp1 initialValues={initialValues} validationSchema={validationSchema1} onSubmit={onSubmit} postProof={postProof} />,
		<JobDescTemp2 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema2} onSubmit={onSubmit} postProof={postProof} />,
		<JobDescTemp3 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema3} onSubmit={onSubmit} postProof={postProof} />,
	]

  return (
    <div>
      { pages[step] }
    </div>
  );

}

export default JobDescTemp;
