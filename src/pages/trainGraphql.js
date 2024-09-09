import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ApolloClient, InMemoryCache, gql,useLazyQuery } from '@apollo/client'


const client = new ApolloClient({

    headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip" },
    uri: 'https://rata.digitraffic.fi/api/v2/graphql/graphql',
    cache: new InMemoryCache(),
})



function TrainGraphQL() {
    const [queryText,setQueryText]=useState('')
    const [dataVar,setDataVar]=useState([''])

      function DoQuery() {
     
        const query = gql(queryText)
        client.query({ query })
        .then((response) => {
        console.log(response.data)
        for (var i=0;i<5;i++)
        {
            const li = document.createElement("li")
               
            //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
            li.innerText= "Train number: "+ response.data.currentlyRunningTrains[i].trainNumber+' Train speed: '+response.data.currentlyRunningTrains[i].trainLocations[0].speed+" km/h"
            document.getElementById("list").appendChild(li)

        }
       
  })
  


      }
  
    

    return (
        <div className="graph">
            <h3>GraphQL Queries</h3><br></br>
            <div id="content">
                <ul id="list"></ul>
            </div>
            <textarea rows={5} cols={50} onChange={e=>setQueryText(e.target.value)}></textarea>
            <button class='btn btn-primary' onClick={DoQuery}>Do Query</button>
           
          

        </div>
    )
}
export default TrainGraphQL