import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TrainGraphQl from "./trainGraphql"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

function Train() {
    const [trainClick, setTrainClick] = useState(false)
    const [stationClick, setStationClick] = useState(false)
    const [trainComposition, setTrainComposition] = useState(false)
    const [station, setStation] = useState('')
    const [trainNum, setTrainNum] = useState('')
    const [selectionDiv, setSelectionDiv] = useState(true)
    const [routeGuide,setRouteGuide]=useState(true)
    var [FromStation,setFromStation]=useState('')
    var [toStation,setToStaion]=useState('')
    let date = Date()
    var [dateValue, setDateValue] = useState(dayjs(date))

    function clear() {

        document.getElementById("list").hidden = true
        document.getElementById("clearBtn").hidden = true
    }

    function getSelctedStation(val) {
        setStationClick(!stationClick)
        const stationUrl = `https://rata.digitraffic.fi/api/v1/live-trains/station/${val}?departed_trains=5`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(stationUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)

                data.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "Train: " + d.trainNumber + ' | ' + '| Goes to: ' + d.timeTableRows[0].stationShortCode + " | Leaves from track: " + d.timeTableRows[0].commercialTrack + "| at " + d.timeTableRows[0].scheduledTime.replace("T", " ").replace(":00.000Z", " ")
                    document.getElementById("list").appendChild(li)
                })



            })
    }

    function fromStation(day) {
        //
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
                i+=1
                const li = document.createElement("li")
                if (i % 1 == 0)
                    {
                        li.setAttribute("class",'liData')
                    }
                    if (i % 2 == 0)
                    {
                        li.setAttribute("class","liData2")
                    }

                li.innerText = "Departure from: " +d.timeTableRows[0].stationShortCode+" Track: "+d.timeTableRows[0].commercialTrack+" "+" "+d.timeTableRows[0].scheduledTime.replace("T"," ").replace(".000Z"," ")
                document.getElementById("list").appendChild(li)
            })

        })
    }

    function handleTrainData() {
        const URLi = `https://rata.digitraffic.fi/api/v1/passenger-information/active?station=${station}`
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
                    i+=1
                    const li = document.createElement("li")
                    if (i % 1 == 0)
                    {
                        li.setAttribute("class",'liData')
                    }
                    if (i % 2 == 0)
                    {
                        li.setAttribute("class","liData2")
                    }
                    //li.innerText="Train number: "+d.trainNumber+" "+d.audio.text.en
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    //li.innerText=d.audio.text.en
                    li.innerText = "Train number " + d.trainNumber + ' Depar. date: '+d.trainDepartureDate +' '+ d.audio.text.en + " Notification valid: " + d.endValidity.replace("T00:00:00Z", " ")
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

            })
    }
    return (

        <div>
            <div className="pasInfo">
                <button class="btn btn-info btn-sm" onClick={handleTrainData}>Show Active passenger info</button>
                <select onChange={(e) => setStation(e.target.value)}>
                    <option value={"TPE"}>Tampere</option>
                    <option value={"HKI"}>Helsinki</option>
                    <option value={"SK"}>Seinäjoki</option>
                    <option value={"OL"}>Oulu</option>
                </select>
            </div>
            <br></br><br></br>
            <Routes>
                <Route>
                    <Route path="/traingql" element={<TrainGraphQl />} />
                </Route>
            </Routes>

            <Link to="/traingql"><button className="btn btn-info btn-sm">GraphQL Queries</button></Link>

            <div id="trainContent" className="trainContent">
                <ul id="list" className="list"></ul>
            </div>
            <label htmlFor="stationCB">Get information about train stations</label>
            <input class="form-check-input" type="checkbox" id="stationCB" onChange={() => setSelectionDiv(!selectionDiv)}></input>
            <div hidden={selectionDiv} className="selection">

                <br></br>

                <label for="stations">Choose a station:</label>
                <select name="stations" id="stations" onChange={e => getSelctedStation(e.target.value)}>
                    <option value="default" selected>select</option>
                    <option value="hki">Helsinki station</option>
                    <option value="tku">Turku station</option>
                    <option value="tpe">Tampere station</option>
                    <option value="sjk">Seinäjoki station</option>
                </select>
            </div>
            <br></br>
            <div class="arrNdep" hidden={selectionDiv}>
                
                    <label class="form-check-label" for="ArrivingDeparting">Train route guide</label>
                    <input class="form-check-input" type="checkbox" value="" id="ArrivingDeparting" onChange={()=>setRouteGuide(!routeGuide)}></input>
            </div>
            <div className="routeInputs" hidden={routeGuide}>
                <input type="text" id="from" placeholder="FROM STATION" onChange={(e)=>setFromStation(e.target.value)}></input>
                <input type="text" id="to" placeholder="TO STATION" onChange={(e)=>setToStaion(e.target.value)}></input>
                <button class="btn btn-primary btn-sm" onClick={()=>fromStation(dayjs(dateValue).format('YYYY-MM-DD'))}>Show trains</button>
            </div>
            
            <div> 
                <label class="form-check-label" for="srcCB">Search for train information by date and train number</label>
                <input class="form-check-input" type="checkbox" onChange={() => setTrainComposition(!trainComposition)}></input>
                <div>
                    {/*checkboxin klikkaus muuttaa trainCompositionin trueksi ja silloin näytetään alla olevat input kentät*/}
                    {trainComposition || !routeGuide && <>  <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*newvalue parametri on valittu päivämäärä*/}
                        <DatePicker format="YYYY-MM-DD" value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                        {/*dayjs kirjastolla saadaan muutettua Date objektin päivämäärä muotoon YYYY-DD-MM*/}

                        {console.log(dayjs(dateValue).format('YYYY-MM-DD'))}


                    </LocalizationProvider><><input className="trainNumber" type="text" onChange={e => setTrainNum(e.target.value)} name="trainNum" id="trainNum" placeholder="eg. 59"></input><button class="btn btn-primary" onClick={() => handleCompositionData(dayjs(dateValue).format('YYYY-MM-DD'), trainNum)}>Fetch Data</button></></>}
                </div>
            </div>

            {trainClick && <button id="clearBtn" class="btn-close" onClick={clear}>X</button>}
            {stationClick && <button id="clearBtn" class="btn-close" onClick={clear}>X</button>}

        </div>

    )
}

export default Train;