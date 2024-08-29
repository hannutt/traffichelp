import logo from './logo.svg';
import './App.css';
import Train from './pages/train'; 
import  Sea from "./pages/sea"
import { useState } from 'react';

function App() {
  const [trainOpt,setTrainOpt]=useState(false)
  const [seaOpt,setSeaOpt]=useState(false)
  return (
    <div className='App-header'>
    <div >
    <h2 className='title'>Traffic Helper</h2>
    <label htmlFor='trainCB'>Train traffic information</label>
    <input className='trainCB' id="trainCB" type='checkbox'onChange={()=>setTrainOpt(!trainOpt)}></input>
    <br></br>
    <label htmlFor='trainCB'>Sea environment & traffic information</label> 
    <input className='trainCB' id="trainCB" type='checkbox'onChange={()=>setSeaOpt(!seaOpt)}></input>
    {trainOpt && <Train/>}
    {seaOpt&&<Sea/>}
    
    </div>
    </div>
  );
}

export default App;
