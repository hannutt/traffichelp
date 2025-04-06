import { useState } from "react"
import dayjs from 'dayjs';
function TrainStations() {
    const [stationClick, setStationClick] = useState(false)
    var [stationTemp,setStationTemp]=useState(0)
    function getSelctedStation(val,station) {
        setStationClick(!stationClick)
        const stationUrl = `https://rata.digitraffic.fi/api/v1/live-trains/station/${val}?departing_trains=5`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(stationUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                //console.log(data)
                var i = 0
                data.forEach(d => {
                    i += 1
                    var schTime=dayjs(d.timeTableRows[0].scheduledTime)
                    var realizedTime=dayjs(d.timeTableRows[0].actualTime)
                    const li = document.createElement("li")
                    if (i % 1 == 0) {
                        li.setAttribute("class", 'liData')
                    }
                    if (i % 2 == 0) {
                        li.setAttribute("class", "liData2")
                    }

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.trainType + ' ' + d.trainNumber + ' ' + d.timeTableRows[0].type  + ' | Original departure station: ' + d.timeTableRows[0].stationShortCode + " | Track: " + d.timeTableRows[0].commercialTrack + " | Scheduled departure time " + schTime.format("DD.MM.YYYY hh:MM") + ' Realized departure time: ' + realizedTime.format("DD.MM.YYYY hh:MM:ss")
                    document.getElementById("list").appendChild(li)
                })



            })
            getStationWeather(station)
    }


    function getStationWeather(station) {
        const apk=localStorage.getItem('weather')
        const url= `http://api.weatherapi.com/v1/current.json?key=${apk}&q=${station}`
      
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.current.condition.icon)
               
                document.getElementById("temp").innerText=`Temperature at the ${station}: ` +data.current.temp_c+" "+ '\u00B0'+"C"
                document.getElementById("weatherIcon").src=data.current.condition.icon
             
                })
           
    }

    function clear() {

        document.getElementById("list").hidden = true
        document.getElementById("clearBtn").hidden = true
        
    }
    return(
        <div>
              <label for="stations">Choose a station:</label>
                <select name="stations" id="stations" onChange={e => getSelctedStation(e.target.value,e.target.options[e.target.selectedIndex].text)}>
                    <option value="default" selected>select</option>
                    <option value="hki">Helsinki</option>
                    <option value="tku">Turku</option>
                    <option value="tpe">Tampere</option>
                    <option value="sk">Seinäjoki</option>
                </select>
                <span className="clearBtn">
                {stationClick && <button id="clearBtn" class="btn btn-danger btn-sm" onClick={clear}>X</button>}
                </span>
        </div>
    )
}
export default TrainStations;