import { useState } from "react"

function SeaVessels() {

    var [i,setI]=useState(0)

    function getVesselData(id) {
        document.getElementById("vesselDetails").innerText=" "
        var details=document.getElementById(id).value
        document.getElementById("vesselDetails").innerText=details

    }

    function getVessels() {
        const seaUrl="https://meri.digitraffic.fi/api/winter-navigation/v1/vessels"
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(seaUrl,{headers:USERID})
        .then(response => {
            return response.json()
        })
        //data on json-tulosjoukon nimi
        .then(data => {
    
            
            console.log(data)

            data.features.forEach(d => {
                setI(i+=1)
                if (i>8)
                {
                    return
                }

                else{
                    const vesselBtn = document.createElement("button")
                    vesselBtn.id="v"+i
                    vesselBtn.setAttribute("class","btn btn-dark btn-sm")
                    vesselBtn.style="margin-bottom: 10px;"
                    const br = document.createElement("br")
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    vesselBtn.textContent= d.properties.name
                    vesselBtn.value=d.properties.name+" "+"Nat: "+d.properties.nationality+" Coordinates: " +d.geometry.coordinates+'. Length: '+d.properties.aisLength+". Width: "+d.properties.aisWidth+" Activity: "+ d.properties.shipActivities[0].activityText+". Course: "+d.properties.shipState.course+". Comment: "+d.properties.shipState.aisStateText+" \n Area: "+d.properties.shipState.posArea
                    vesselBtn.addEventListener("click",()=>getVesselData(vesselBtn.id))
                    document.getElementById("list").appendChild(vesselBtn)
                    //rivinvaihto aina yhden li:n jälkeen
                    document.getElementById("list").appendChild(br)
                    

                }
               
        })
    })
    
    }
    return(
        <div>
            <button onClick={getVessels}>Get vessels</button>

        </div>
    )
}
export default SeaVessels