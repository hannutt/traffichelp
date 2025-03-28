import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TrainGraphQl from "./trainGraphql"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import ByTrainNumber from "./byTrainNumber";
import LanguageOptions from "./languageOptions";
import ConvertText from "./convertText";
import emailIcon from "../icons/email24px.png"
import check from "../icons/checked 24px.png"
import { createClient } from "smtpexpress"
import axios from "axios";
import TrainStations from "./trainStations";



function Train() {
    
    const [trainClick, setTrainClick] = useState(false)
   
    const [trainComposition, setTrainComposition] = useState(false)
    const [station, setStation] = useState('')
    const [trainNum, setTrainNum] = useState('')
    const [selectionDiv, setSelectionDiv] = useState(false)
    const [routeGuide, setRouteGuide] = useState(true)
    const [TrainNumberFeat, setTrainNumberFeat] = useState(false)
    const [switchChanged, setSwitchChanged] = useState(false)
    var [showTts, setShowTts] = useState(false)

    var [FromStation, setFromStation] = useState('')
    var [toStation, setToStaion] = useState('')
    let date = Date()
    var [dateValue, setDateValue] = useState(dayjs(date))

    function clear() {

        document.getElementById("list").hidden = true
        document.getElementById("clearBtn").hidden = true
        setShowTts(showTts = false)
    }
    function fromStation(day) {
        const URLi = `https://rata.digitraffic.fi/api/v1/live-trains/station/${FromStation}/${toStation}?departure_date=${day}`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                var i = 0
                data.forEach(d => {
                    i += 1
                    const li = document.createElement("li")
                    if (i % 1 == 0) {
                        li.setAttribute("class", 'liData')
                    }
                    if (i % 2 == 0) {
                        li.setAttribute("class", "liData2")
                    }

                    li.innerText = "Departure from: " + d.timeTableRows[0].stationShortCode + " Track: " + d.timeTableRows[0].commercialTrack + " " + " " + d.timeTableRows[0].scheduledTime.replace("T", " ").replace(".000Z", " ")
                    document.getElementById("list").appendChild(li)
                })

            })
    }

    function handlePassengerData() {
        setShowTts(!showTts)
        var URLi = ''
        if (station === 'general') {
            URLi = 'https://rata.digitraffic.fi/api/v1/passenger-information/active?only_general=true'
        }
        else {
            URLi = `https://rata.digitraffic.fi/api/v1/passenger-information/active?station=${station}`
        }

        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        setTrainClick(!trainClick)
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                var i = 0
                data.forEach(d => {
                    i += 1
                    const li = document.createElement("li")
                    li.id = "list"
                    if (i % 1 == 0) {
                        li.setAttribute("class", 'liData')
                    }
                    if (i % 2 == 0) {
                        li.setAttribute("class", "liData2")
                    }

                    li.innerText = "Train number " + d.trainNumber + ' Depar. date: ' + d.trainDepartureDate + ' ' + d.video.text.en + " Notification valid: " + d.endValidity.replace("T00:00:00Z", " ")
                    document.getElementById("list").appendChild(li)
                })
            })
    }


    function handleCompositionData(pDay, pTrainNum) {

        const URLi = `https://rata.digitraffic.fi/api/v1/compositions/${pDay}/${pTrainNum}`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                data.journeySections.forEach(d => {
                    const li = document.createElement("li")
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "Departure from " + d.beginTimeTableRow.stationShortCode + " at " + d.beginTimeTableRow.scheduledTime.replace("T", " ").replace("Z", " ").replace("000", " ") + " arrival to " + d.endTimeTableRow.stationShortCode + " at " + d.endTimeTableRow.scheduledTime.replace("T", " ").replace("Z", " ").replace("000 ", " ")
                    document.getElementById("list").appendChild(li)
                })
                const mail = document.createElement('img')
                mail.src = emailIcon
                mail.addEventListener("click", sendMail)
                document.getElementById("list").appendChild(mail)
            })
    }
    async function sendMail() {
        var notice = document.createElement("span")
        var success=document.createElement("img")
        notice.textContent="Email sent!"
        notice.setAttribute("class","notice")
        notice.id="notice"
        success.id="success"
        success.src=check
        document.getElementById("list").appendChild(notice)
        document.getElementById("list").appendChild(success)
        var mailAddress=prompt("Enter email address")
        var apk=localStorage.getItem("apk")
   
        
        try {
           
            var msg = document.getElementById("list").innerText
            const api = axios.create({
                baseURL: "https://api.smtpexpress.com/",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${apk}`,
                },
              });
              const body = {
                subject: "Traffic data",
                message: `<h3> ${msg} </h3>`,
                sender: {
                  name: "Traffic Helper",
                  email: "traffic-helper-b1134d@smtpexpress.email",
                },
                recipients: {
                  email: mailAddress,
                },
              };
              const response = await api.post("send", body);
              console.log(response.data);
        } catch (error) {
            console.error("Error sending email:", error);
          }
          const timeOut=setTimeout(clearEmailVertification,5000)
    }

    function clearEmailVertification() {
        const notice = document.getElementById("notice")
        const success = document.getElementById("success")
        notice.remove()
        success.remove()
    }

    
    function changeStates() {
        setRouteGuide(!routeGuide)
        setTrainNumberFeat(!TrainNumberFeat)
    }
    return (

        <div>
            <div className="pasInfo">
                <button class="btn btn-info btn-sm" onClick={handlePassengerData}>Show Active passenger info</button>
                <select id="stations" onChange={(e) => setStation(e.target.value)}>
                    <option value={"TPE"}>Tampere</option>
                    <option value={"HKI"}>Helsinki</option>
                    <option value={"SK"}>Seinäjoki</option>
                    <option value={"OL"}>Oulu</option>
                    <option value={"general"}>General</option>
                </select>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="langSwitch" onChange={() => setSwitchChanged(!switchChanged)}></input>
                <label class="form-check-label" for="langSwitch">Lang. options</label>

            </div>
            {switchChanged && <><LanguageOptions /><LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format="YYYY-MM-DD" value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
            </LocalizationProvider></>}

            <br></br>
            <ByTrainNumber />

            <Routes>
                <Route>
                    <Route path="/traingql" element={<TrainGraphQl />} />
                </Route>
            </Routes>

            <Link to="/traingql"><button className="btn btn-info btn-sm">GraphQL Queries</button></Link>
            {showTts && <ConvertText />}

            <div id="trainContent" className="trainContent">
                <ul id="list" className="list"></ul>
            </div>
            <label htmlFor="stationCB">Get information about train stations</label>
            <input class="form-check-input" type="checkbox" id="stationCB" onChange={() => setSelectionDiv(!selectionDiv)}></input>
            {selectionDiv && <TrainStations/>}
            <div class="arrNdep">

                <label class="form-check-label" for="ArrivingDeparting">Train route guide</label>
                <input class="form-check-input" type="checkbox" value="" id="routeguide" onChange={changeStates}></input>
            </div>
            <div className="routeInputs" hidden={routeGuide}>
                <input type="text" id="from" placeholder="FROM STATION" onChange={(e) => setFromStation(e.target.value)}></input>
                <input type="text" id="to" placeholder="TO STATION" onChange={(e) => setToStaion(e.target.value)}></input>
                <button class="btn btn-primary btn-sm" onClick={() => fromStation(dayjs(dateValue).format('YYYY-MM-DD'))}>Show trains</button>
            </div>


            <div>
                <label class="form-check-label" for="srcCB">Search for train information by date and train number</label>
                <input class="form-check-input" type="checkbox" onChange={() => setTrainComposition(!trainComposition)}></input>
            </div>
            <div>
                {/*checkboxin klikkaus muuttaa trainCompositionin trueksi ja silloin näytetään alla olevat input kentät*/}
                {trainComposition && <>  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/*newvalue parametri on valittu päivämäärä*/}
                    <DatePicker format="YYYY-MM-DD" value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                    {/*dayjs kirjastolla saadaan muutettua Date objektin päivämäärä muotoon YYYY-DD-MM*/}

                    {console.log(dayjs(dateValue).format('YYYY-MM-DD'))}


                </LocalizationProvider><><input className="trainNumber" type="text" onChange={e => setTrainNum(e.target.value)} name="trainNum" id="trainNum" placeholder="eg. 59"></input><button class="btn btn-primary" onClick={() => handleCompositionData(dayjs(dateValue).format('YYYY-MM-DD'), trainNum)}>Fetch Data</button></></>}

                {!routeGuide && <>  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/*newvalue parametri on valittu päivämäärä*/}
                    <DatePicker format="YYYY-MM-DD" value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                    {/*dayjs kirjastolla saadaan muutettua Date objektin päivämäärä muotoon YYYY-DD-MM*/}

                    {console.log(dayjs(dateValue).format('YYYY-MM-DD'))}
                </LocalizationProvider></>}
            </div>
            <div>
            </div>
            {trainClick && <button id="clearBtn" class="btn btn-danger btn-sm" onClick={clear}>X</button>}
            

        </div>

    )
}

export default Train;