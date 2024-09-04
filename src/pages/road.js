import { useState } from "react"

function Road() {
    const [roadCBsel,setRoadCBsel]=useState(true)

    function roadWorks() {
        /*div johon tieliikennedata asetetaan näkyviin*/
        setRoadCBsel(!roadCBsel)
        const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK'
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
                li.innerText= d.properties.announcements[0].title
                document.getElementById("list").appendChild(li)
           })
    
            
            
        })
    }
    

    function weightRistrictions(){
        setRoadCBsel(!roadCBsel)
        const roadUrl = 'https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION'
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
                li.innerText=d.properties.announcements[0].location.description+' '+ d.properties.announcements[0].features[0].name + ' '+d.properties.announcements[0].features[0].quantity +" t"
                document.getElementById("list").appendChild(li)
           })
    
            
            
        })
    }

    

    

    
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
                <input id="roadworksCB" type="checkbox"onChange={roadWorks}></input>
                <br></br>
                <label htmlFor="weightCB" >Active weight Restritctions</label>
                <input id="weightB" type="checkbox"onChange={weightRistrictions}></input>
        
        
        </div>
    )
}
export default Road;