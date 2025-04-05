import { useState } from "react"
import { legendClasses, PieChart } from "@mui/x-charts"
function AutomaticTraffic() {
    var [i, setI] = useState(0)
 
  
    var [graphics, setGraphics] = useState(false)
    var [avg, setAvg] = useState(false)
    var [avgTitle,setAvgTitle]=useState('')
    var [avgTitle2,setAvgTitle2]=useState('')
    var [avg1,setAvg1]=useState(0)
    var [avg2,setAvg2]=useState(0)
    var [byPass1,setBypass1]=useState(0)
    var [byPass2,setBypass2]=useState(0)
    var [bypass,setBypass]=useState(false)
    var [byPassTitle1,SetByPassTitle1]=useState('')
    var [byPassTitle2,SetByPassTitle2]=useState('')
    var [road,setRoad]=useState('')
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

                    if (i > 8) {
                        return
                    }
                    else {
                        const li = document.createElement("li")
                        li.innerText = d.name + ' ' + d.value+" "+d.timeWindowStart.replace("T"," ").replace(":00Z"," ")+" - "+d.timeWindowEnd.replace(":00Z"," ").replace("T"," ")
                        li.id = "data"
                        if (i===3)
                        {
                            setAvgTitle(avgTitle=d.name)
                            setAvg1(avg1=d.value)
                          
                        }
                        else if (i===4)
                        {
                            setAvgTitle2(avgTitle2=d.name)
                            setAvg2(avg2=d.value)
                        }
                        else if (i===1)
                        {
                            
                            SetByPassTitle1(byPassTitle1=d.name)
                            setBypass1(byPass1=d.value)
                            console.log(byPass1)

                        }
                        else if (i===2)
                            {
                                
                                SetByPassTitle2(byPassTitle2=d.name)
                                setBypass2(byPass2=d.value)
    
                            }
                       
                        document.getElementById("content").appendChild(li)
                    }         
                });
            })
    }

    return (
        <div>

            <div id="content" className="content">
            </div>
            <select onChange={e => {getData(e.target.value);setRoad(e.target.options[e.target.selectedIndex].text)}}>
                <option>Select</option>
                <option value="23001">Tie 7 Porvoo</option>
                <option value="20011">VT 1 Espoo Sinimäki</option>
            </select>
            <br></br><br></br>
            <input class="form-check-input" type="checkbox" id="avgCB" onChange={() => setAvg(!avg)}></input>
            <label class="form-check-label" for="avgCB">Average speed on the {road}</label>
            <br></br>
            <input class="form-check-input" type="checkbox" id="avgCB" onChange={() => setBypass(!bypass)}></input>
            <label class="form-check-label" for="avgCB">Bypasses {road}</label>

            <div id="graphics">

                {avg && <PieChart
                
                 slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'top', horizontal: 'right' },
                    },
                  }}
             
                
                    series={[
                        {
                            data: [
                                
                                { id: 0, value: avg1, label: avgTitle },
                                { id: 1, value: avg2, label: avgTitle2 },
                                
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />}
                  {bypass && <PieChart
                    series={[
                        {
                            data: [
                                
                                { id: 0, value: byPass1, label: byPassTitle1 },
                                { id: 1, value: byPass2, label: byPassTitle2 },
                                
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