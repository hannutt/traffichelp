import logo from './logo.svg';
import './App.css';
import Train from './pages/train'; 
import { useState } from 'react';

function App() {
  const [trainOpt,setTrainOpt]=useState(false)
  return (
    <div className='App-header'>
    <div >
    <h2 className='title'>Traffic Helper</h2>
    <label htmlFor='trainCB'>Train information</label>
    <input className='trainCB' id="trainCB" type='checkbox'onChange={()=>setTrainOpt(!trainOpt)}></input>
    {trainOpt && <Train/>}
    
    </div>
    </div>
  );
}

export default App;
