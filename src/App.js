
import './App.css';
import Train from './pages/train';
import Sea from "./pages/sea"
import Road from "./pages/road";
import WsComponent from './pages/seaWebSocket';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import tfLogoBlack from './images/tfLogoBlack.png'


function App() {
  const [trainOpt, setTrainOpt] = useState(false)
  const [seaOpt, setSeaOpt] = useState(false)
  const [roadOpt, setRoadOpt] = useState(false)
  const [hideRoad, setHideRoad] = useState(false)
  const [hideTrain, setHideTrain] = useState(false)
  const [hideSea, setHideSea] = useState(false)


  //funktio piilottaa tai näyttää komponentteja saamansa parametrin arvon (stateval) perusteella
  const helper = (stateval) => {
    console.log(stateval)
    if (stateval == 'trainOpt') {
      setHideRoad(!hideRoad)
      setTrainOpt(!trainOpt)
      setHideSea(!hideSea)

    }
    else if (stateval == 'roadOpt') {

      setHideTrain(!hideTrain)
      setHideSea(!hideSea)
      setRoadOpt(!roadOpt)

    }


    else if (stateval === 'seaOpt') {
      setSeaOpt(!seaOpt)
      setHideRoad(!hideRoad)
      setHideTrain(!hideTrain)

    }


  }
  return (

    <div className='App-header'>


      <div>
      
        <img className='tfLogo' src={tfLogoBlack} height={100} width={200}></img>
       <br></br><br></br>
        <div class="form-check">
          <input class="form-check-input" id='trainCB' hidden={hideTrain} type="checkbox"  onChange={() => helper('trainOpt')}></input>
          <label class="form-check-label"hidden= {hideTrain}  for="trainCB">Train traffic data</label>
          <br></br>
          <input class="form-check-input" id='roadCB' hidden={hideRoad} type="checkbox"  onChange={() => helper('roadOpt')}></input>
          <label class="form-check-label"hidden= {hideRoad}  for="trainCB">Road traffic data</label>
          <br></br>
          <input class="form-check-input" id='seaCB' hidden={hideSea} type="checkbox"  onChange={() => helper('seaOpt')}></input>
          <label class="form-check-label"hidden= {hideSea}  for="trainCB">Sea environment & Sea traffic Data</label>
       
        </div>

        
      
        <br></br>

     
        {trainOpt && <Train />}
        {seaOpt && <Sea />}
        {roadOpt && <Road />}

      </div>
    </div>
  );
}

export default App;
