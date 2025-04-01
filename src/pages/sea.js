import { useState, useEffect, createElement } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import WsComponent from "./seaWebSocket";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MarineWarnings from "./marineWarns"
import ConvertText from "./convertText"
import SeaVessels from "./seaVessels";
import '../App.css';
function Sea() {

    const [waterName, setWaterName] = useState('')
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [mapState, setMapState] = useState(false)
    const [waterAreas, setWaterAreas] = useState(true)
    const [closeButton, setCloseButton] = useState(true)
    const [warnings, setWarnigns] = useState(false)
    const [hideSafety, setHideSafety] = useState(false)
    const [hideMarine, setHideMarine] = useState(false)
    const [ttsBtn, setTtsBtn] = useState(false)
    const [vessels,setVessels]=useState(false)
    var clicks = 0
    //useeffect huomaa heti, jos latitude longitude statet muuttuvat
    useEffect(() => {
        setLatitude(latitude);
        setLongitude(longitude)

    }, [latitude, longitude])

    function hideContent() {
        clicks = clicks + 1
        if (clicks % 1 === 0) {
            document.getElementById("lakeContent").hidden = true
            setCloseButton(!closeButton)
            //poistetaan cb:n valinta
            document.getElementById("safetyCB").checked = false

        }

    }

    function executeWaterArea() {
        setWaterAreas(!waterAreas)
        setHideSafety(!hideSafety)
        setHideMarine(!hideMarine)
    }


    function safetyFails() {
        document.getElementById("lakeContent").hidden = false
        setCloseButton(!closeButton)
        const seaUrl = 'https://meri.digitraffic.fi/api/aton/v1/faults'

        fetch(seaUrl)
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {

                console.log(data)
                data.features.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "Area: " + d.properties.area_description + 'fairway: ' + d.properties.fairway_name_fi + " fixed: " + d.properties.fixed
                    document.getElementById("list").appendChild(li)

                })
            })
    }

    function siteId(id) {
        var site = document.getElementById(id).innerText
        document.getElementById("list").hidden = true
        document.getElementById("name").value = site
        getSelectedLake(site)

    }

    function availableAreas() {
        clicks = clicks + 1
        if (clicks % 2 === 0) {
            document.getElementById("list").innerText = ""
            document.getElementById("list").hidden = true

        }
        else {
            document.getElementById("list").hidden = false
            const seaUrl = 'https://meri.digitraffic.fi/api/sse/v1/measurements'
            const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
            fetch(seaUrl, { headers: USERID })
                .then(response => {
                    return response.json()
                })
                //data on json-tulosjoukon nimi
                .then(data => {

                    console.log(data)
                    var i = 1
                    data.features.forEach(d => {
                        const li = document.createElement("li")
                        const liSite = document.createElement("span")
                        liSite.id = "site" + i

                        i += 1

                        //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                        li.innerText = "name: " + d.properties.siteName + ' site number: '
                        liSite.innerText = d.properties.siteNumber
                        liSite.addEventListener("dblclick", () => siteId(liSite.id))
                        document.getElementById("list").appendChild(li)
                        document.getElementById("list").appendChild(liSite)
                    })


                })
        }

    }


    function getSelectedLake(lake) {
        
        document.getElementById("list").innerText = " "

        const seaUrl = `https://meri.digitraffic.fi/api/sse/v1/measurements?siteNumber=${lake}`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(seaUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {

                console.log(data)


                data.features.forEach(d => {
                    const li = document.createElement("li")

                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "name: " + d.properties.siteName + ' water temperature: ' + d.properties.temperature + ' °C ' + 'Coordinates: ' + d.geometry.coordinates + " Wind-wave direction: " + d.properties.windWaveDir + ' Data updated: ' + d.properties.lastUpdate.replace("T", " ").replace("Z", " ")

                    setLongitude(d.geometry.coordinates[0])
                    setLatitude(d.geometry.coordinates[1])
                    document.getElementById("list").hidden = false
                    document.getElementById("list").appendChild(li)
                })
            })
        setTtsBtn(!ttsBtn)
       
    }
    return (
        <div>
           
            <Routes>
                <Route>
                    <Route path="/websocket" element={<WsComponent />} />
                </Route>
            </Routes>
           
            <button id="closeBtn" hidden={closeButton} onClick={hideContent}>X</button>
            <div id="lakeContent" className="lakeContent">
                <ul id="list" className="list"></ul>
            </div>
            <br></br>
            <p id="vesselDetails" className="vesselDetails"></p>
            {ttsBtn && <ConvertText />}

            <hr className="hrLine"></hr>
            <input class="form-check-input" hidden={hideSafety} id='safetyCB' type="checkbox" onClick={safetyFails}></input>
            <label class="form-check-label" hidden={hideSafety} for="safetyCB">Safety device faults</label>
            <br></br>
            <input class="form-check-input" hidden={hideMarine} id='marineCB' onChange={() => setWarnigns(!warnings)} type="checkbox" ></input>
            <label class="form-check-label" hidden={hideMarine} for="marineCB">Marine warnings</label>
            <br></br>
            <input class="form-check-input" id='waterCB' type="checkbox" onChange={executeWaterArea} ></input>
            <label class="form-check-label" for="waterCB">Water area information</label>
            <br></br>
            <input class="form-check-input" id='vesselCB' type="checkbox" onChange={()=>setVessels(!vessels)} ></input>
            <label class="form-check-label" for="vesselCB">Sea vessels</label>
            <br></br>
            <label for="lake" hidden={waterAreas}>Choose a water area:</label>
            {warnings && <MarineWarnings />}

            {vessels && <SeaVessels/>}

            <select hidden={waterAreas} name="lake" id="lake" onChange={e => getSelectedLake(e.target.value)}>
                <option value="8859">Kelloniemi</option>
                <option value="20169">Hattukari</option>
                <option value="20243">Kipsi</option>
                <option value="20244">Talla</option>
            </select>
            <hr className="hrLine"></hr>
            
            <div className="mapArea">
                    {mapState && <APIProvider apiKey={""}>
                        <Map

                            style={{ width: '35vw', height: '50vh' }}
                            defaultCenter={{ lat: latitude, lng: longitude }}
                            defaultZoom={12}
                            gestureHandling={'greedy'}
                            disableDefaultUI={false} />
                    </APIProvider>}
                </div>
            <input class="form-check-input" hidden={waterAreas} id="map" type="checkbox" onChange={() => setMapState(!mapState)}></input>
            <label class="form-check-label" hidden={waterAreas} for="map">Show the water area on the map</label>

            <br></br>

            <div>
                {/*käytetään samaa halufunktiota sekä select että input kentässä. erona ainoastaa se
                että syötekenttä haussa parametri tallennetaan state-muuttujaan ja lähetetään funktiolle
                vasta onclick kutsussa.*/}

                <br></br>
                <Link hidden to="/websocket">WebSocket</Link>
                <div className="seaInput">
                    <input type="text" hidden={waterAreas} id="name" className="name" placeholder="Or write site number here" onChange={e => setWaterName(e.target.value)}></input>

                    <button onClick={() => getSelectedLake(waterName)} hidden={waterAreas} class="btn btn-primary btn-sm">Fetch Data</button>

                    <button class="btn btn-primary btn-sm" hidden={waterAreas} onClick={availableAreas}>Show site numbers</button>
                </div>
                <br></br>
              
            </div>
        </div>

    )
}
export default Sea