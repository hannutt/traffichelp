import { useState } from 'react';
import mqtt from 'mqtt';
var client;



function WsComponent() {
    const [mesg, setMesg] = useState('Waiting on message...')
   
    
    function readSocket () {
        client = mqtt.connect('wss://meri.digitraffic.fi:443/mqtt',"tf")
        const connectionProperties = {
            onSuccess: onConnect,
            onFailure: onConnectFailure,
            mqttVersion: 4,
            useSSL: true,
          };
          client.connect(connectionProperties);
    }
    function onConnect() {
        console.info(Date.now() + " Connection open");
        client.subscribe("vessels-v2/#");
      }

      function onConnectFailure(response) {
        console.info(
          Date.now() + " Connection failed ." + response.errorCode +
            ": " + response.errorMessage,
        );
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