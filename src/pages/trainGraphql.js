import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'


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
        const li = document.createElement("li")
               
        //kentässä näytetää json tulosjoukon roadstationid ja sensorvalue-
        li.innerText= response.data.trainNumber
        document.getElementById("list").appendChild(li)
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