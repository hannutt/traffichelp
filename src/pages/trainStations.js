import { useState } from "react"
function TrainStations() {
    const [stationClick, setStationClick] = useState(false)
    function getSelctedStation(val) {
        setStationClick(!stationClick)
        const stationUrl = `https://rata.digitraffic.fi/api/v1/live-trains/station/${val}?departing_trains=5`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(stationUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
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

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "Train: " + d.trainType + ' ' + d.trainNumber + ' Departure/arrival: ' + d.timeTableRows[0].type + ' | ' + '| Original departure station: ' + d.timeTableRows[0].stationShortCode + " | Track: " + d.timeTableRows[0].commercialTrack + "| Scheduled departure time " + d.timeTableRows[0].scheduledTime.replace("T", " ").replace(":00.000Z", " ") + 'Realized departure time: ' + d.timeTableRows[0].actualTime.replace("T", " ").replace(".000Z", " ")
                    document.getElementById("list").appendChild(li)
                })



            })
    }
    function clear() {

        document.getElementById("list").hidden = true
        document.getElementById("clearBtn").hidden = true
        
    }
    return(
        <div>
              <label for="stations">Choose a station:</label>
                <select name="stations" id="stations" onChange={e => getSelctedStation(e.target.value)}>
                    <option value="default" selected>select</option>
                    <option value="hki">Helsinki station</option>
                    <option value="tku">Turku station</option>
                    <option value="tpe">Tampere station</option>
                    <option value="sk">Seinäjoki station</option>
                </select>
                <span className="clearBtn">
                {stationClick && <button id="clearBtn" class="btn btn-danger btn-sm" onClick={clear}>X</button>}
                </span>
        </div>
    )
}
export default TrainStations;