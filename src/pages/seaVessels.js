import { useState } from "react"
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from "@mui/x-charts";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
function SeaVessels() {
    var [latCoord, setLatCoord] = useState(0)
    var [longCoord, setLongCoord] = useState(0)
    var [i, setI] = useState(0)
    var [speed, setSpeed] = useState(0)
    var [showVesselsMap, setShowVesselsMap] = useState(false)
    var [mapDisable, setMapDisable] = useState(false)
    var [shipWidth,setShipWidth]=useState(0)
    var [shipLength,setShipLength]=useState(0)
    function getVesselData(id) {
        document.getElementById("vesselDetails").innerText = " "
        var details = document.getElementById(id).value
        var title = document.getElementById(id).title
        var s = document.getElementById(id).name
        setSpeed(speed = parseFloat(s))
        var coordinates = title.split(",")
        setLatCoord(latCoord = parseFloat(coordinates[0]))
        setLongCoord(longCoord = parseFloat(coordinates[1]))


        console.log(document.getElementById(id).title)
        document.getElementById("vesselDetails").innerText = details
        if (mapDisable) {
            setShowVesselsMap(showVesselsMap = false)
        }
        else {
            setShowVesselsMap(showVesselsMap = true)

        }


    }

    function getVessels() {
        document.getElementById("vesselDetails").innerText = " "
        const seaUrl = "https://meri.digitraffic.fi/api/winter-navigation/v1/vessels"
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(seaUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {


                console.log(data)
                var j = 0
                data.features.forEach(d => {
                    j = j + 1
                    if (j > i) {
                        return
                    }

                    else {
                        const vesselBtn = document.createElement("button")
                        vesselBtn.id = "v" + j
                        vesselBtn.setAttribute("class", "btn btn-dark btn-sm")
                        vesselBtn.style = "margin-bottom: 10px;"
                        const li = document.createElement("li")
                        const br = document.createElement("br")
                        //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                        vesselBtn.textContent = d.properties.name
                        vesselBtn.value = d.properties.name + " " + "Nat: " + d.properties.nationality + " Coordinates: " + d.geometry.coordinates + '. Length: ' + d.properties.aisLength + ". Width: " + d.properties.aisWidth + " Activity: " + d.properties.shipActivities[0].activityText + ". Course: " + d.properties.shipState.course + ". Comment: " + d.properties.shipState.aisStateText + " \n Area: " + d.properties.shipState.posArea
                        vesselBtn.name = d.properties.shipState.speed
                        vesselBtn.title = d.geometry.coordinates
                        setShipLength(shipLength=parseFloat(d.properties.aisLength))
                        setShipWidth(shipWidth=d.properties.aisWidth)
                        vesselBtn.addEventListener("click", () => getVesselData(vesselBtn.id))
                        document.getElementById("list").appendChild(vesselBtn)
                        //rivinvaihto aina yhden li:n jälkeen
                        document.getElementById("list").appendChild(br)



                    }

                })
            })

    }
    return (
        <div>
            <div className="map">
                {showVesselsMap && <APIProvider apiKey={""}>
                    <Map

                        style={{ width: '20vw', height: '30vh' }}
                        defaultCenter={{ lat: latCoord, lng: longCoord }}
                        defaultZoom={10}
                        gestureHandling={'greedy'}
                        disableDefaultUI={false} />
                </APIProvider>}
                <br></br>
                <span className="speed">Vessel Statistics</span>
                <Gauge width={125} height={100} value={speed} valueMax={40} startAngle={-90} endAngle={90} />
                <span className="bar">
                <BarChart
                xAxis={[{ scaleType: 'band', data: ['Width', 'Length',] }]}
                series={[{ data: [shipWidth, 0] }, { data: [0, shipLength] },]}
                width={200}
                height={200}
            />
            </span>
            </div>

            
            <input type="number" placeholder="How many vessels?" style={{ marginRight: 10 + "px" }} onChange={(e) => setI(e.target.value)}></input>
            {i > 0 && <><button class="btn-dark btn-sm" onClick={getVessels}>Get vessels</button><br></br><input class="form-check-input" type="checkbox" id="disableMaps" onChange={() => setMapDisable(!mapDisable)}></input> <label class="form-check-label"> Disable automatic maps</label></>}


        </div>
    )
}
export default SeaVessels