import { useState } from "react";
import '../App.css';
import treLogo from "../icons/treLogo.png"
import dayjs from "dayjs";
import BusLocate from "./busLocate";
function Buses() {
    var [keyword, setKeyword] = useState('')
    var [url, setUrl] = useState('')
    var [locate,setLocate]=useState(false)
    function processData() {
        //regex-kaava, jolla etsitään merkkijonosta numeroita väliltä 0-9
        let regex = /\d/;
        if (regex.test(keyword)) {
            setUrl(url = `https://data.itsfactory.fi/journeys/api/1/lines/${keyword}`)
        }
        else {
            setUrl(url = `http://data.itsfactory.fi/journeys/api/1/lines?description=${keyword}`)
        }

        fetch(url, {
            method: 'GET',

        })
            .then(response => {
                return response.json()
            })

            .then(data => {
                console.log(data)
                var i = 0
                data.body.forEach(d => {
                    const li = document.createElement("li")
                    li.innerText = d.description + " Line number: " + d.name
                    document.getElementById("busContent").appendChild(li)
                    i += 1
                    if (i % 1 == 0) {
                        li.setAttribute("class", "liData")
                    }
                    if (i % 2 == 0) {
                        li.setAttribute("class", "liData2")
                    }

                });
            })
            .catch(err => console.error(err));
    }

    

    return (
        <div>
            <center>
                <h3>Tampere city bus service data</h3>
                <img src={treLogo} height={60}></img>

                <div id="busContent"></div>
              
                <div>
                    <input hidden={locate} class="form-check-input" type="checkbox" value="" id="location" onChange={()=>setLocate(!locate)}></input>
                        <label hidden={locate} class="form-check-label" for="location">Get bus location</label>
                        <br></br><br></br>
                        {locate&&<BusLocate/>}
                        <input hidden={locate} type="text" placeholder="keyword or line" onChange={(e) => setKeyword(e.target.value)}></input>
                        <span hidden={locate} className="busInput">
                            <button class="btn btn-primary btn-sm" onClick={processData}>Get data</button>
                            {/*}
                            <button class="btn btn-primary btn-sm" onClick={getLineData}>Line data</button>*/}

                        </span>
                </div>
            </center>

        </div>

    )
}
export default Buses;