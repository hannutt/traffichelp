function Road() {
    
   function roadAnnounce () {
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
        <div id="roadContent">
            <ul id="list"></ul>
        </div>
            <label htmlFor="announcementCB" >Road traffic announcements</label>
                <input type="checkbox"onChange={roadAnnounce}></input>
        
        </div>
    )
}
export default Road;