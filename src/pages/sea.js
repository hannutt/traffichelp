function Sea() {
    function getSelctedLake(lake){
        
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
                 li.innerText="lake name: "+d.properties.siteName+' lake temperature: ' +d.properties.temperature+ ' C '+ 'Coordinates: '+d.geometry.coordinates
                 document.getElementById("list").appendChild(li)
            })


    })

    }
    return(
        
        <div>
             <div id="lakeContent" className="lakeContent">
            <ul id="list" className="list"></ul>
        </div>
            <label for="lake">Choose a lake:</label>

<select name="lake" id="lake"onChange={e=>getSelctedLake(e.target.value)}>
  <option value="8859">Kelloniemi</option>
  <option value="20169">Hattukari</option>
  <option value="20243">Kipsi</option>
  <option value="20244">Talla</option>
</select>
        </div>
    )
}
export default Sea