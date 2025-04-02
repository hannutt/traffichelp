
import './App.css';
import Train from './pages/train';
import Sea from "./pages/sea"
import Road from "./pages/road";
import Buses from "./pages/buses"
import WsComponent from './pages/seaWebSocket';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import train from "./icons/train.png"
import tfLogoBlack from './images/tfLogoBlack.png'
import road from "./icons/road.png"
import ship from "./icons/ship.png"
import bus from "./icons/bus.png"


function App() {
  const [trainOpt, setTrainOpt] = useState(false)
  const [seaOpt, setSeaOpt] = useState(false)
  const [roadOpt, setRoadOpt] = useState(false)
  const [hideRoad, setHideRoad] = useState(false)
  const [hideTrain, setHideTrain] = useState(false)
  const [hideSea, setHideSea] = useState(false)
  const [hideLogo,setHideLogo]=useState(false)
  const [hideBus,setHideBus]=useState(false)
  const [busOpt,setBusOpt]=useState(false)
  
  


  //funktio piilottaa tai näyttää komponentteja saamansa parametrin arvon (stateval) perusteella
  const helper = (stateval) => {
    console.log(stateval)
    if (stateval == 'trainOpt') {
      setHideRoad(!hideRoad)
      setTrainOpt(!trainOpt)
      setHideSea(!hideSea)
      setHideLogo(!hideLogo)
      setHideBus(!hideBus)

    }
    else if (stateval == 'roadOpt') {

      setHideTrain(!hideTrain)
      setHideSea(!hideSea)
      setRoadOpt(!roadOpt)
      setHideLogo(!hideLogo)
      setHideBus(!hideBus)

    }


    else if (stateval === 'seaOpt') {
      setSeaOpt(!seaOpt)
      setHideRoad(!hideRoad)
      setHideTrain(!hideTrain)
      setHideBus(!hideBus)
      setHideLogo(!hideLogo)

    }
    else if (stateval=='busOpt') {
      setHideTrain(!hideTrain)
      setHideRoad(!hideRoad)
      setHideSea(!hideSea)
      setBusOpt(!busOpt)
      setHideLogo(!hideLogo)
      
    }


  }
  return (

    <div className='App-header'>

      <img className='tfLogo' id='tfLogo' hidden={hideLogo} src={tfLogoBlack} height={100} width={200}></img>
      <br></br>
      <div>
      

        <div class="form-check">
          <input class="form-check-input" id='trainCB' hidden={hideTrain} type="checkbox"  onChange={() => helper('trainOpt')}></input>
          <label class="form-check-label"hidden= {hideTrain}  for="trainCB">Train traffic data</label> <img hidden={hideTrain} src={train}></img>
          <br></br>
          <input class="form-check-input" id='roadCB' hidden={hideRoad} type="checkbox"  onChange={() => helper('roadOpt')}></input>
          <label class="form-check-label"hidden= {hideRoad}  for="trainCB">Road traffic data</label> <img hidden={hideRoad} src={road}></img>
          <br></br>
          <input class="form-check-input" id='seaCB' hidden={hideSea} type="checkbox"  onChange={() => helper('seaOpt')}></input>
          <label class="form-check-label"hidden= {hideSea}  for="trainCB">Sea environment & Sea traffic Data</label> <img hidden={hideSea} src={ship}></img>
          <br></br>
          <input class="form-check-input" id='busCB' hidden={hideBus} type="checkbox"  onChange={() => helper('busOpt')}></input>
          <label class="form-check-label"hidden= {hideBus}  for="busCB">Buses</label> <img hidden={hideBus} src={bus}></img>
       
        </div>

        
      
        <br></br>

     
        {trainOpt && <Train />}
        {seaOpt && <Sea />}
        {roadOpt && <Road />}
        {busOpt && <Buses/>}

      </div>
    </div>
  );
}

export default App;
