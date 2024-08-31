import { useState } from "react"

function Sea() {
    const [waterName,setWaterName]=useState('')
    function getSelectedLake(lake){
        
        const seaUrl = `https://meri.digitraffic.fi/api/sse/v1/measurements?siteNumber=${lake}`
        const USERID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}
        fetch(seaUrl, {headers:USERID})
        .then(response =>{
            return response.json()
        })
        //data on json-tulosjoukon nimi
        .then(data=>{
            
            console.log(data)

                 data.features.forEach(d => {
                 const li = document.createElement("li")
                
                 //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                 li.innerText="name: "+d.properties.siteName+' water temperature: ' +d.properties.temperature+ ' °C '+ 'Coordinates: '+d.geometry.coordinates+" Wind-wave direction: "+d.properties.windWaveDir   
                 document.getElementById("list").appendChild(li)
            })


    })

    }
    return(
        
        <div>
             <div id="lakeContent" className="lakeContent">
            <ul id="list" className="list"></ul>
        </div>
            <label for="lake">Choose a water area:</label>

<select name="lake" id="lake"onChange={e=>getSelectedLake(e.target.value)}>
  <option value="8859">Kelloniemi</option>
  <option value="20169">Hattukari</option>
  <option value="20243">Kipsi</option>
  <option value="20244">Talla</option>
</select>
<div>
    <p>Or write name here</p>
    {/*käytetään samaa halufunktiota sekä select että input kentässä. erona ainoastaa se
    että syötekenttä haussa parametri tallennetaan state-muuttujaan ja lähetetään funktiolle
    vasta onclick kutsussa.*/}
    <input type="text" id="name" className="name" onChange={e=>setWaterName(e.target.value)}></input>
    
    <br></br>
    <button onClick={()=>getSelectedLake(waterName)} class="btn btn-primary">Fetch</button>
</div>
        </div>
        
    )
}
export default Sea