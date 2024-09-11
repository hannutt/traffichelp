function MarineWarnings() {
    
    document.getElementById("lakeContent").hidden=false
    const seaUrl="https://meri.digitraffic.fi/api/nautical-warning/v1/warnings/active"
    fetch(seaUrl)
    .then(response => {
        return response.json()
    })
    //data on json-tulosjoukon nimi
    .then(data => {

        
        console.log(data)
        
        data.features.forEach(d => {
            const li = document.createElement("li")
            const br = document.createElement("br")

            //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
            li.innerText = "Area: " + d.properties.areasEn + " "+d.properties.contentsEn
            document.getElementById("list").appendChild(li)
            //rivinvaihto aina yhden li:n jälkeen
            document.getElementById("list").appendChild(br)
    })
})


        
}
export default MarineWarnings