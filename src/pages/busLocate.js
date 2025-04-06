
import { useState } from "react";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Autocomplete, TextField } from "@mui/material";
function BusLocate() {
    var [line, setLine] = useState('')
    var [busLat, setBusLat] = useState(0)
    var [busLong, setBusLong] = useState(0)
    var [showBus, setShowBus] = useState(false)
    var dst;
    var destination;
    var lines=['101','8A','8B']
    function getCoordinates(values) {
        var coords = values.split(",")
        setBusLong(busLong = parseFloat(coords[0]))
        setBusLat(busLat = parseFloat(coords[1]))
        setShowBus(!showBus)

    }

    function getLocation() {

        var stops = { 2560: "Messukeskus B", 4045: "Levonmäki", 1668: 'Haukiluoma' }

        fetch(`http://data.itsfactory.fi/journeys/api/1/vehicle-activity?lineRef=${line}`, {
            method: 'GET',

        })
            .then(response => {
                return response.json()
            })

            .then(data => {
                console.log(data)
                var i = 0
                data.body.forEach(d => {

                    destination = d.monitoredVehicleJourney.destinationShortName
                    if (destination in stops) {
                        dst = stops[destination]
                        console.log(dst)
                        const li = document.createElement("li")
                        const mapBtn = document.createElement("button")
                        mapBtn.setAttribute("class", "btn btn-dark btn-sm")
                        mapBtn.textContent = "Show in map"
                        mapBtn.value = d.monitoredVehicleJourney.vehicleLocation.longitude + "," + d.monitoredVehicleJourney.vehicleLocation.latitude
                        mapBtn.addEventListener("click", () => getCoordinates(mapBtn.value))
                        li.innerText = "Line: " + d.monitoredVehicleJourney.lineRef + " Coordinates: " + d.monitoredVehicleJourney.vehicleLocation.longitude + " " + d.monitoredVehicleJourney.vehicleLocation.latitude + " Current speed: " + d.monitoredVehicleJourney.speed + " km/h" + "\n Destination: " + dst
                        document.getElementById("busContent").appendChild(li)
                        document.getElementById("busContent").appendChild(mapBtn)
                        i = i + 1
                    }

                    else if (i > 1) {
                        return

                    }

                    /*
                    else{
                        const li = document.createElement("li")
                        const mapBtn = document.createElement("button")
                        mapBtn.setAttribute("class","btn btn-dark btn-sm")
                        mapBtn.textContent="Show in map"
                        mapBtn.value= d.monitoredVehicleJourney.vehicleLocation.longitude + "," + d.monitoredVehicleJourney.vehicleLocation.latitude
                        mapBtn.addEventListener("click",()=>getCoordinates(mapBtn.value))
                        li.innerText = "Line: "+d.monitoredVehicleJourney.lineRef+" Coordinates: "+ d.monitoredVehicleJourney.vehicleLocation.longitude + " " + d.monitoredVehicleJourney.vehicleLocation.latitude+" Current speed: "+d.monitoredVehicleJourney.speed+" km/h"+"\n Destination: "+dst
                        document.getElementById("busContent").appendChild(li)
                        document.getElementById("busContent").appendChild(mapBtn)
                    }*/

                });
            })
            .catch(err => console.error(err));


    }
    return (
        <div>
            <Autocomplete
                className="fromAC"
                id="fromStation"
                freeSolo
                //autocompleten arvot eli asemat
                options={lines}
                size="small"
                renderInput={(params) => <TextField{...params} label="Line" />}
                //event on onchange eventti eli se kun kentän sisältö muuttuu, value on itse kentän sisältö
                onChange={(event, value) => setLine(value)}
            />
          
            <button class="btn btn-dark btn-sm" onClick={getLocation}>Get location</button>
            <br></br><br></br>
            {showBus && <APIProvider apiKey={""}>
                <Map

                    style={{ width: '35vw', height: '47vh' }}
                    defaultCenter={{ lat: busLat, lng: busLong }}
                    defaultZoom={20}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false} />
            </APIProvider>}
        </div>
    )
}
export default BusLocate