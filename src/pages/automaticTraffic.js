import { useState } from "react"

function AutomaticTraffic() {
    var [i, setI] = useState(0)
    var [numberValues, setNumberValues] = useState([])

    var [graphics,setGraphics]=useState(true)
    var [avg,setAvg]=useState(false)
    function getData(roadname) {
      
        const roadUrl = `https://tie.digitraffic.fi/api/tms/v1/stations/${roadname}/data`
        const USERID = { 'Digitraffic-User': 'Junamies/FoobarApp 1.0' }
        fetch(roadUrl, { headers: USERID })
            .then(response => {
                return response.json()
            })

            .then(data => {


                console.log(data)
                data.sensorValues.forEach(d => {
                    setI(i += 1)

                    if (i > 4) {
                        return
                    }
                    else {
                        const p = document.createElement("p")
                        p.innerText = d.name + ' ' + d.value
                        p.id="data"
                        console.log(i)
                        setNumberValues(numberValues.push(d.value))
                        document.getElementById("content").appendChild(p)

                    }
                    console.log(numberValues)


                });
                setGraphics(graphics=false)

            })

    }
    function clear() {
        var p =document.getElementById("data")
        p.remove()
    }
    return (
        <div id="content" className="content">
            <select onChange={e => getData(e.target.value)}>
                <option>Select</option>
                <option value="23001">Tie 7 Porvoo</option>
                <option value="20011">VT 1 Espoo Sinimäki</option>
            </select>
            <br></br><br></br>
            <input class="form-check-input" type="checkbox" id="avgCB"onChange={()=>setAvg(!avg)}></input>
            <label class="form-check-label" for="avgCB">Average speed on the selected road</label>
            
            <div id="graphics" hidden={graphics}>
                <input class="form-check-input" type="checkbox" id="graphicsCB"></input>
                <label class="form-check-label" for="graphicsCB">Create graphics</label>
                <button onClick={clear}>X</button>
            </div>

        </div>
    )
}
export default AutomaticTraffic