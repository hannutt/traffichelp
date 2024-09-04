
import './App.css';
import Train from './pages/train'; 
import  Sea from "./pages/sea"
import Road from "./pages/road";
import { useState } from 'react';

function App() {
  const [trainOpt,setTrainOpt]=useState(false)
  const [seaOpt,setSeaOpt]=useState(false)
  const [roadOpt,setRoadOpt]=useState(false)
  const [hideRoad,setHideRoad]=useState(false)
  const [hideTrain,setHideTrain]=useState(false)
  const [hideSea,setHideSea]=useState(false)

  const helper=(stateval)=>{
    console.log(stateval)
    if (stateval=='trainOpt')
    {
      setHideRoad(!hideRoad)
      setTrainOpt(!trainOpt)
      setHideSea(!hideSea)

    }
    else if (stateval=='roadOpt')
    {
    
      setHideTrain(!hideTrain)
      setHideSea(!hideSea)
      setRoadOpt(!roadOpt)

    }
     
  
    else if(stateval==='seaOpt')
    {
      setSeaOpt(!seaOpt)
      setHideRoad(!hideRoad)
      setHideTrain(!hideTrain)
      
    }
    /*
    else{

   
      setSeaOpt(false)
      setHideRoad(false)
      setHideTrain(false)
      setRoadOpt(false)
      setHideSea(false)
      setTrainOpt(false)
    }*/
    
  }
  return (
    <div className='App-header'>
    <div>
    <h2 className='title'>Traffic Helper</h2>
   
    <label htmlFor='trainCB' hidden={hideTrain}>Train traffic Data</label>
    <input className='trainCB' id="trainCB" hidden={hideTrain} type='checkbox'onChange={()=>helper('trainOpt')}></input>
   
    <br></br>
    
    <label htmlFor='roadCB' hidden={hideRoad}>Road traffic Data</label> 
    <input className='roadCB'  hidden={hideRoad} id="roadCB" type='checkbox'onChange={()=>helper('roadOpt')}></input>
    <br></br>
    <label htmlFor='seaCB' hidden={hideSea}>Sea environment & Sea traffic Data</label> 
    <input className='seaCB' hidden={hideSea} id="seaCB" type='checkbox'onChange={()=>helper('seaOpt')}></input>
  
    {trainOpt &&<Train/>}
    {seaOpt&&<Sea/>}
    {roadOpt&&<Road/>}
    
    </div>
    </div>
  );
}

export default App;
