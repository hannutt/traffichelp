import { useState } from "react"
import WeatherCam from "./weatherCamera"

function Road() {
    const [roadCBsel, setRoadCBsel] = useState(true)
    const [wcam, setWcam] = useState(false)

    function roadWorks() {
        /*div johon tieliikennedata asetetaan näkyviin*/
        setRoadCBsel(!roadCBsel)
        const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK'
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(roadUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)

                data.features.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.properties.announcements[0].title
                    document.getElementById("list").appendChild(li)
                })



            })
    }


    function weightRistrictions() {
        setRoadCBsel(!roadCBsel)
        const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION'
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(roadUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)

                data.features.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.properties.announcements[0].location.description + ' ' + d.properties.announcements[0].features[0].name + ' ' + d.properties.announcements[0].features[0].quantity + " t"
                    document.getElementById("list").appendChild(li)
                })



            })
    }






    function roadAnnounce() {
        setRoadCBsel(!roadCBsel)
        const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT'
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(roadUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)

                data.features.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.properties.announcements[0].location.description + ' ' + d.properties.announcements[0].comment
                    document.getElementById("list").appendChild(li)
                })



            })
    }

    return (
        <div>

            <div id="roadContent" hidden={roadCBsel} className="roadContent">
                <ul id="list"></ul>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="announcementCB" onChange={roadAnnounce}></input>
                <label class="form-check-label" for="announcementCB">Road Traffic announcements</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="roadworksCB"  onChange={roadWorks}></input>
                <label class="form-check-label" for="roadworksCB">Active road works</label>
            </div>
            <br></br>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="weightCB" onChange={weightRistrictions}></input>
                <label class="form-check-label" for="weightCB">Active weight Restritctions</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cameraCB" onChange={() => setWcam(!wcam)}></input>
                <label class="form-check-label" for="cameraCB">Weather cameras</label>
            </div>
            {wcam && <WeatherCam />}
         
            {/*}
            <label htmlFor="announcementCB" >Road traffic announcements</label>
            <input id="announcementCB" type="checkbox" onChange={roadAnnounce}></input>
            <br></br>
            <label htmlFor="roadworksCB" >Active road works</label>
            <input id="roadworksCB" type="checkbox" onChange={roadWorks}></input>
            <br></br>
            <label htmlFor="weightCB" >Active weight Restritctions</label>
            <input id="weightB" type="checkbox" onChange={weightRistrictions}></input>
            <br></br>
            <label htmlFor="cameraCB" >Weather cameras</label>
            <input id="cameraCB" type="checkbox" onChange={() => setWcam(!wcam)}></input>
            {wcam && <WeatherCam />}
            {/*}
                <img src="https://weathercam.digitraffic.fi/C0450701.jpg"></img>*/}


        </div>
    )
}
export default Road;