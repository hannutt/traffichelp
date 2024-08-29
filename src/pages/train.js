import { useState } from "react"

function Train() {
    const [trainClick,setTrainClick]=useState(false)
    const [stationClick,setStationClick]=useState(false)

    const URLi = 'https://rata.digitraffic.fi/api/v1/passenger-information/active'
    const USERID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}

   function clear() {
    
    document.getElementById("list").hidden=true
   }

   function getSelctedStation(val) {
    setStationClick(!stationClick)
    const stationUrl = `https://rata.digitraffic.fi/api/v1/live-trains/station/hki/${val}`
    const USERID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}
    fetch(stationUrl, {headers:USERID})
    .then(response =>{
        return response.json()
    })
    //data on json-tulosjoukon nimi
    .then(data=>{
        console.log(data)
    
        data.forEach(d => {
            const li = document.createElement("li")
           
            //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
            li.innerText= "Train number: "+d.trainNumber+" Cancelled: "+d.cancelled + ' Departure date '+d.departureDate
            document.getElementById("list").appendChild(li)
       })

        
        
    })
}


    function handleTrainData() {
        setTrainClick(!trainClick)
        fetch(URLi, {headers:USERID})
        .then(response =>{
            return response.json()
        })
        //data on json-tulosjoukon nimi
        .then(data=>{
            console.log(data)
            //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
            
             data.forEach(d => {
             const li = document.createElement("li")
            
             //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
             li.innerText=+d.trainNumber+' ' +d.video.text.en+" Notification valid: "+d.endValidity
             document.getElementById("list").appendChild(li)
        })
        
})
}
    return(
        <div>
           
        <button class="btn btn-info btn-sm" onClick={handleTrainData}>Show Active passenger info</button>
        <div id="trainContent" className="trainContent">
            <ul id="list" className="list"></ul>
        </div>
        <div className="selection">
            <h4>Display data from selected station</h4>
            <br></br>
        <label for="stations">Choose a station:</label>

<select name="stations" id="stations" onChange={e=>getSelctedStation(e.target.value)}>
    <option value="default" selected>select</option>
  <option value="hki">Helsinki station</option>
  <option value="tku">Turku station</option>
  <option value="tre">Tampere station</option>
  <option value="sjk">Seinäjoki station</option>
</select>
        </div>
        {trainClick && <button onClick={clear}>X</button>}
        {stationClick&& <button onClick={clear}>X</button> }
        
        </div>

    )
}

export default Train;