import logo from './logo.svg';
import './App.css';
import Train from './pages/train'; 
import  Sea from "./pages/sea"
import Road from "./pages/road";
import { useState } from 'react';

function App() {
  const [trainOpt,setTrainOpt]=useState(false)
  const [seaOpt,setSeaOpt]=useState(false)
  const [roadOpt,setRoadOpt]=useState(false)
  return (
    <div className='App-header'>
    <div>
    <h2 className='title'>Traffic Helper</h2>
   
    <label htmlFor='trainCB'>Train traffic Data</label>
    <input className='trainCB' id="trainCB" type='checkbox'onChange={()=>setTrainOpt(!trainOpt)}></input>
   
    <br></br>
    <label htmlFor='roadCB'>Road traffic Data</label> 
    <input className='roadCB' id="roadCB" type='checkbox'onChange={()=>setRoadOpt(!roadOpt)}></input>
    <br></br>
    <label htmlFor='trainCB'>Sea environment & Sea traffic Data</label> 
    <input className='trainCB' id="trainCB" type='checkbox'onChange={()=>setSeaOpt(!seaOpt)}></input>
  
    {trainOpt &&<Train/>}
    {seaOpt&&<Sea/>}
    {roadOpt&&<Road/>}
    
    </div>
    </div>
  );
}

export default App;
