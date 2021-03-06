import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const workersURL = "http://localhost:3000/users"

function JobDescTempFinal() {

    const navigate = useNavigate();
    let { state } = useLocation();
    const formData = state[0]
    const serverUserInfo = state[1]
    const processName = state[2]

    function isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }


    function printItem(Item) {

        if (typeof (Item) === 'object') {

            if (isValidDate(Item)) {
                return Item.toLocaleDateString('en-GB')
            }
            else {

                return Item.map((element) => {
                    return <p key={element} style={{ textAlign: 'left' }}>- {element}</p>
                });
            }
        }
        else {
            return <p key={Item} style={{ textAlign: 'left' }}> {Item}</p>
        }

    }


    //Update user's info since he completed the process
    function completeTask() {


        axios.post("http://localhost:3000/" + processName, {formData,processName}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response)
                navigate("/Processes", { state: [serverUserInfo] });
            })
            .catch(error => console.log("Error at complete Task => " + error.message))

    }

    return (
        <div style={{ width: "50%", margin: "auto", maxWidth: 650, minWidth: 500 }}>
            <h1>Job Description Overview</h1><br />
            <hr></hr><br />

            <div style={{ backgroundColor: 'white', wordWrap: 'break-word' }}>
              
 			<h4> Business name:</h4> <div>{printItem(formData.bussinessName)}</div>  <br />
 			<h4> Which language do you prefer?:</h4> <div>{printItem(formData.radio1)}</div>  <br />
 			<h4> Choose favorite color::</h4> <div>{printItem(formData.drop1)}</div>  <br />
 			<h4> Salary:</h4> <div>{printItem(formData.input2)}</div>  <br />
 			<h4> Summary Of The Job:</h4> <div>{printItem(formData.textarea1)}</div>  <br />
 			<h4> Jot down language responsibilities:</h4> <div>{printItem(formData.check1)}</div>  <br />

            </div>

            <button className="btn_complete" onClick={completeTask}>Complete Task</button>


        </div>
    )
}


export default JobDescTempFinal

