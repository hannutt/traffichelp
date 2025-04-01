import { useState } from "react"
import sweFlag24px from '../icons/Sweflag24px.png'
import fiFlag24px from '../icons/Fiflag24px.png'
function LanguageOptions() {
    var [language, setLanguage] = useState('')

    function passengerData() {
        //stations on train.js komponentissa, talletetaan sen valittu arvo muuttujaan
        var stationName=document.getElementById("stations").value
    
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        const URLi = `https://rata.digitraffic.fi/api/v1/passenger-information/active?station=${stationName}`
        
       
        fetch(URLi, { headers: USERID })
            .then(response => {
                return response.json()
            })
            //data on json-tulosjoukon nimi
            .then(data => {
                console.log(data)
                //data käydään silmukassa läpi, d on silmukkamuuttuja kuin esim i for-loopissa
                var i = 0
                data.forEach(d => {
                    i += 1
                    const li = document.createElement("li")
                    if (i % 1 == 0) {
                        li.setAttribute("class", 'liData')
                    }
                    if (i % 2 == 0) {
                        li.setAttribute("class", "liData2")
                    }
                    if (language==='fi')
                    {
                        li.innerText = "Train number " + d.trainNumber + ' Depar. date: ' + d.trainDepartureDate + ' ' + d.video.text.fi + " Notification valid: " + d.endValidity.replace("T00:00:00Z", " ")
                        document.getElementById("list").appendChild(li)
                    }
                    if (language==='sv')
                        {
                            li.innerText = "Train number " + d.trainNumber + ' Depar. date: ' + d.trainDepartureDate + ' ' + d.video.text.sv + " Notification valid: " + d.endValidity.replace("T00:00:00Z", " ")
                            document.getElementById("list").appendChild(li)
                        }
                })

            })
    }
    
    return (
        <div>
            <input class="form-check-input" type="checkbox" value="fi" id="fiCB" onClick={(e) => setLanguage(e.target.value)}></input>
            <label class="form-check-label" for="fiCB">FI</label>
            <input class="form-check-input" type="checkbox" value="sv" id="svCB" onClick={(e) => setLanguage(e.target.value)}></input>
            <label class="form-check-label" for="svCB">SV</label>
            {language==='fi' && <button class="btn btn-info btn-sm" onClick={passengerData}>Show info in <img src={fiFlag24px}/></button>}
            {language==='sv' && <button class="btn btn-info btn-sm" onClick={passengerData}>Show info in <img src={sweFlag24px}/></button>}
            <br></br>
            </div>

            )
}
export default LanguageOptions;