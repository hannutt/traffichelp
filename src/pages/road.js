import { useState } from "react"
import WeatherCam from "./weatherCamera"
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { use } from "react";

function Road() {
    const [roadCBsel, setRoadCBsel] = useState(true)
    const [wcam, setWcam] = useState(false)
    var [lat,setLat]=useState(0)
    var [long,setLong]=useState(0)
    const [showMap,setShowMap]=useState(false)
    const [hideOthers,setHideOthers]=useState(false)

    const setMapCoordinates=(id)=>{
        //setLat(lat=0)
        //setLong(long=0)
        var coordinates = document.getElementById(id).value
        var coordSplit = coordinates.split(",")
        setLong(long=parseFloat(coordSplit[0]))
        setLat(lat=parseFloat(coordSplit[1]))
        setShowMap(!showMap)

    }

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
                var i = 0
                data.features.forEach(d => {
                    i+=1
                    const li = document.createElement("li")
                    const mapBtn=document.createElement("button")
                    mapBtn.setAttribute("class","btn btn-primary btn-sm")
                    
                    mapBtn.id="mapBtn"+i
                    //funktion lisääminen dynaamisesti luotuun buttoniin
                    mapBtn.addEventListener("click",()=>setMapCoordinates(mapBtn.id))
                    mapBtn.textContent="Show in map"
                    //koordinaattien tallennus buttonin value propertyyn
                    mapBtn.value=d.geometry.coordinates[0][0]
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.properties.announcements[0].title
                    document.getElementById("list").appendChild(li)
                    document.getElementById("list").appendChild(mapBtn)
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
                var j =0

                data.features.forEach(d => {

                    j+=1
                    const li = document.createElement("li")
                    const mapBtn=document.createElement("button")
                    mapBtn.setAttribute("class","btn btn-primary btn-sm")
                    //funktion lisääminen dynaamisesti luotuun buttoniin
                    mapBtn.id="mapBtn"+j
                    mapBtn.addEventListener("click",()=>setMapCoordinates(mapBtn.id))
                    mapBtn.textContent="Show in map"
                    //mapBtn.value=d.properties.geometry[0].coordinates
                    

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.properties.announcements[0].location.description + ' ' + d.properties.announcements[0].comment+' Ask more: '+d.properties.contact.email+' '+d.properties.contact.phone
                    document.getElementById("list").appendChild(li)
                    document.getElementById("list").appendChild(mapBtn)
                })



            })
    }

    return (
        <div>

            <div id="roadContent" hidden={roadCBsel} className="roadContent">
                <ul id="list"></ul>
            </div>
            {showMap &&
            <APIProvider apiKey={""}>
                            <Map
                                
                                style={{ width: '50vw', height: '50vh' }}
                                defaultCenter={{ lat: lat, lng: long }}
                                defaultZoom={13}
                                gestureHandling={'greedy'}
                                disableDefaultUI={false} />
                        </APIProvider>}
            {wcam && <WeatherCam />}
           
            <div class="form-check" hidden={hideOthers}>
                <input class="form-check-input" type="checkbox" id="announcementCB" onChange={roadAnnounce}></input>
                <label class="form-check-label" for="announcementCB">Road Traffic announcements</label>
            </div>
            <div class="form-check"hidden={hideOthers}>
                <input class="form-check-input" type="checkbox" id="roadworksCB"  onChange={roadWorks}></input>
                <label class="form-check-label" for="roadworksCB">Active road works</label>
            </div>
            <br></br>
            <div class="form-check" hidden={hideOthers}>
                <input class="form-check-input" type="checkbox" id="weightCB" onChange={weightRistrictions}></input>
                <label class="form-check-label" for="weightCB">Active weight Restritctions</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cameraCB" onChange={() => {setWcam(!wcam);setHideOthers(!hideOthers)}}></input>
                <label class="form-check-label" for="cameraCB">Weather cameras</label>
            </div>
           
         
      
        </div>
    )
}
export default Road;