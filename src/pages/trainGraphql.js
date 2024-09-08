import { useState } from "react";
import { useQuery } from "react-query";
function TrainGraphQL() {
    const [queryText,setQueryText]=useState('')
    const [dataVar,setDataVar]=useState([''])

    function DoQuery() {
        const endpoint = 'https://rata.digitraffic.fi/api/v2/graphql/graphql'

    

        //const { data, loading, error } = useQuery("qu", () => {
            return fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip" },
                body: JSON.stringify({ query: queryText })
            })
            .then(response =>response.json())
            //data on json-tulosjoukon nimi
            .then(data=>{
                
                console.log(data)
                
                data.forEach(d => {
                    
                    const li = document.createElement("li")
                   
                    //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
                    li.innerText= d.currentlyRunningTrains[0]
                    //document.getElementById("list").appendChild(li)
                    document.getElementById("list").appendChild(li)
               })
        
                
                
            })

    }


    return (
        <div className="graph">
            <h3>GraphQL Queries</h3><br></br>
            <div id="content">
                <ul id="list"></ul>
            </div>
            <textarea onChange={e=>setQueryText(e.target.value)}></textarea>
            <button onClick={DoQuery}>Query</button>
          

        </div>
    )
}
export default TrainGraphQL