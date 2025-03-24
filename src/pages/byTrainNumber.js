import { useState } from "react"

function ByTrainNumber() {
    const [search,setSearch]=useState(false)
    var [trainNumber,setTrainNumber]=useState('')

    function passengerInfoNumber() {
        const URLi = `https://rata.digitraffic.fi/api/v1/passenger-information/active?train_number=${trainNumber}`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                data.forEach(d => {
                    const li = document.createElement("li")
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = d.trainNumber+' '+d.trainDepartureDate+' '+d.video.text.en
                    document.getElementById("list").appendChild(li)
                })

            })
        
    }
    return (
        <div className="numberSearch">
            <label class="form-check-label" for="fiCB">Search by train number</label>
            <input class="form-check-input" type="checkbox" value="fi" id="byTrainNumber" onChange={()=>setSearch(!search)}></input>
            <br></br>
            {search && <><input type="text" placeholder="TRAIN NUMBER" onChange={(e) => setTrainNumber(e.target.value)} /><button class="btn btn-primary btn-sm" onClick={passengerInfoNumber}>Search</button></>}
        </div>
     
    
    )
}
export default ByTrainNumber;