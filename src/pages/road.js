import { useState } from "react"

function Road() {
    const [roadCBsel,setRoadCBsel]=useState(true)

    
   function roadAnnounce () {
    setRoadCBsel(!roadCBsel)
    const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT'
    const USERID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}
    fetch(roadUrl, {headers:USERID})
    .then(response =>{
        return response.json()
    })
    //data on json-tulosjoukon nimi
    .then(data=>{
        console.log(data)
        
        data.features.forEach(d => {
            const li = document.createElement("li")
           
            //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
            li.innerText= d.properties.announcements[0].location.description+' '+ d.properties.announcements[0].comment
            document.getElementById("list").appendChild(li)
       })

        
        
    })
}
    
    return(
        <div>
            
        <div id="roadContent" hidden={roadCBsel} className="roadContent">
            <ul id="list"></ul>
        </div>
            <label htmlFor="announcementCB" >Road traffic announcements</label>
                <input id="announcementCB" type="checkbox"onChange={roadAnnounce}></input>
                <br></br>
                <label htmlFor="roadworksCB" >Active road works</label>
                <input id="roadworksCB" type="checkbox"></input>
        
        </div>
    )
}
export default Road;