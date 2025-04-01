import { useState } from "react"

function ByTrainNumber() {
    const [search,setSearch]=useState(false)
    var [trainNumber,setTrainNumber]=useState('')

    function passengerInfoNumber() {
        document.getElementById("list").innerText=" "
        const URLi = `https://rata.digitraffic.fi/api/v1/passenger-information/active?train_number=${trainNumber}`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                if (data=="")
                {
                    const li = document.createElement("li")
                    li.innerText="No active passenger information"
                    document.getElementById("list").appendChild(li)
                }
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                data.forEach(d => {
                    const li = document.createElement("li")
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText = "Train "+d.trainNumber+' '+' '+d.video.text.en+" Notification valid: "+d.startValidity.replace("T"," ").replace("Z"," ")+" - "+d.endValidity.replace("T"," ").replace("Z"," ")
                    document.getElementById("list").appendChild(li)
                })

            })
        
    }
    return (
        <div className="numberSearch">
            <input class="form-check-input" type="checkbox" value="fi" id="byTrainNumber" onChange={()=>setSearch(!search)}></input>
            <label class="form-check-label" for="fiCB">Search by train number</label>
            
            <br></br>
            {search && <><input type="text" placeholder="TRAIN NUMBER" onChange={(e) => setTrainNumber(e.target.value)} /><button class="btn btn-primary btn-sm" onClick={passengerInfoNumber}>Search</button></>}
        </div>
     
    
    )
}
export default ByTrainNumber;