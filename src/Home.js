import React, { useState } from 'react';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import './css/Home.css';
import JobDescTemp1 from './JobDescTemp/JobDescTemp1';
import JobDescTemp2 from './JobDescTemp/JobDescTemp2';
import JobDescTemp3 from './JobDescTemp/JobDescTemp3';


function Home() {

  let { state } = useLocation();
  let serverUserInfo = state[0]
  let processName = state[1]
  let loginUserInfo = state[2]

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState({
    businessName: '',
    title: '',
    location: '',
    description: '',
    responsibilities: [],
    progLangResponsibilities: [],
    qualifications: [],
    jobLengthRadioOption: '',
    skillsAquired: [],
    postDate: null,
    closePostDate: null,
    salary: 0,
    checkboxOption: [],
    proofs:['',''], // TODO:8a dimiourgoume to proof analoga me to size, poy 8a to pernoyme apo ton sxediasti h businesNAMe_Proof isws klaitera
  })


  const validationSchema1 = Yup.object({
    businessName: Yup.string().required('Required'),
  })

  const validationSchema2 = Yup.object({
    location: Yup.string().required('Required'),
    salary: Yup.number().required('Required').min(0).max(1000000),
    description: Yup.string().required('Required'),
  })

  const validationSchema3 = Yup.object({
    title: Yup.string().required('Required'),
    responsibilities: Yup.array().min(1, 'Required'),
    progLangResponsibilities: Yup.array().min(1, 'Required'),
  })


  //not really neaded
  const onSubmit = (formValues, final) => {

    console.log('Form data', formValues)
    // console.log('Final', final)

    nextStep(formValues, final)

  }

  // Proceed to next step
  function nextStep(newData, final = false) {

    setInitialValues((prev) => ({ ...prev, ...newData }))

    if (final) {
      console.log("Form submitted", newData)
      navigate("/JobDescTempFinal", {state: [newData,serverUserInfo,processName,loginUserInfo]});
    }
    else{
      setStep(step => step + 1)
    }

  }

  // Proceed to prev step
  function prevStep(newData) {

    setStep(step => step - 1)

  }



  const pages = [
    <JobDescTemp1 initialValues={initialValues} validationSchema={validationSchema1} onSubmit={onSubmit} />,
    <JobDescTemp2 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema2} onSubmit={onSubmit} />,
    <JobDescTemp3 prevStep={prevStep} initialValues={initialValues} validationSchema={validationSchema3} onSubmit={onSubmit} />
  ]


  return (

    <div>
      { pages[step] }

    </div>


  );

}



export default Home;