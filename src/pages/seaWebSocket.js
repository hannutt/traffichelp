import { useState } from 'react';


function WsComponent() {
    const [mesg, setMesg] = useState('Waiting on message...')
   
    
    function readSocket () {
        console.log("clicked")
        var mqtt = require('mqtt')
        var client = mqtt.connect('wss://meri.digitraffic.fi:443/mqtt')
        console.log(client.subscribe("vessels-v2/#"));
    }
    
    return(
        <div className="ws">
            <h3>MQTT WebSocket</h3>
            {mesg}
            <button onClick={readSocket}>read</button>
            
        </div>
    )

}

export default WsComponent