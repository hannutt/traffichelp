import { useState } from "react"
import { PieChart } from "@mui/x-charts"
function AutomaticTraffic() {
    var [i, setI] = useState(0)
    var [numberValues, setNumberValues] = useState([])
    var [labelValues, SetLabelValues] = useState()
    var [graphics, setGraphics] = useState(false)
    var [avg, setAvg] = useState(false)
    function getData(roadname) {
        setI(i = 0)

        document.getElementById("content").innerText = " "

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
                        const li = document.createElement("li")
                        li.innerText = d.name + ' ' + d.value
                        li.id = "data"
                        //SetLabelValues(labelValues.push(d.name))
                        setNumberValues(numberValues=d.value)
                        console.log(numberValues)

                        document.getElementById("content").appendChild(li)

                    }
                    

                });
               
            })

        
    }

    return (
        <div>

            <div id="content" className="content">
            </div>
            <select onChange={e => getData(e.target.value)}>
                <option>Select</option>
                <option value="23001">Tie 7 Porvoo</option>
                <option value="20011">VT 1 Espoo Sinimäki</option>
            </select>
            <br></br><br></br>
            <input class="form-check-input" type="checkbox" id="avgCB" onChange={() => setAvg(!avg)}></input>
            <label class="form-check-label" for="avgCB">Average speed on the selected road</label>

            <div id="graphics">
                <input class="form-check-input" type="checkbox" id="graphicsCB" onChange={() => setGraphics(!graphics)}></input>
                <label class="form-check-label" for="graphicsCB">Create graphics</label>

                {graphics && <PieChart
                    series={[
                        {
                            data: [
                                
                                { id: 0, value: numberValues, label: 'series A' },
                                { id: 1, value: numberValues, label: 'series B' },
                                { id: 2, value: numberValues, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />}
            </div>



        </div>
    )
}
export default AutomaticTraffic