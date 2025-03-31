import { useEffect, useState,useRef } from "react"

function WeatherCam() {

    const camTre = ['https://weathercam.digitraffic.fi/C0450701.jpg', 'https://weathercam.digitraffic.fi/C0450702.jpg', 'https://weathercam.digitraffic.fi/C0450703.jpg']
    const camKur = ["https://weathercam.digitraffic.fi/C1051401.jpg", "https://weathercam.digitraffic.fi/C1051402.jpg", "https://weathercam.digitraffic.fi/C1051409.jpg"]
    const camJkl = ["https://weathercam.digitraffic.fi/C0951001.jpg", "https://weathercam.digitraffic.fi/C0951002.jpg", "https://weathercam.digitraffic.fi/C0951009.jpg"]
    const [camView, setCamView] = useState(0)
    //sanakirjaolio, ensin tulee avain, eli esim tre, joka saadaan select komponentin optionin valuesta
    //avaimen avulla käytetään arvona olevaa listaa
    const cams = { "tre": camTre, "kur": camKur, "jkl": camJkl }
    const [cameraParam, setCameraParam] = useState('')
    var [camWidth, setCamWidth] = useState(500)
    var [camHeight, setCamHeight] = useState(300)
    var [scale, setScale] = useState(1.0)
    var slid = document.getElementById("zoomRng")
    var [contrast,setContrast]=useState(100)
    var [hideStopBtn,setHideStopBtn]=useState(true)
    const intervalRef = useRef(null)
   

    function getCamera(e) {
        setCamView(0)
        //optiom valuen tallennus state-muuttujaan
        setCameraParam(e)
        document.getElementById("camImg").src = cams[e][camView]


    }
    function changeView() {


        setCamView(camView + 1)
        if (camView === 3) {
            document.getElementById("camImg").src = cams[cameraParam][0]
            setCamView(0)
        }
        else {
            setCamView(camView + 1)
            //cams[cameraParam][camView]= esim cams[kur][kameran numero]
            document.getElementById("camImg").src = cams[cameraParam][camView]
        }


    }
    function increaseImage() {
        setCamHeight(camHeight + 10)
        setCamWidth(camWidth + 10)
    }

    function decreaseImage() {
        setCamHeight(camHeight - 10)
        setCamWidth(camWidth - 10)

    }

    function resetValues() {
        setCamHeight(camHeight = 300)
        setCamWidth(camWidth = 500)
    }

    const sliderMove = () => {
        document.getElementById("sliderval").innerText = slid.value
        setScale(scale = slid.value)
    }
    const automateChange = () => {

        setHideStopBtn(!hideStopBtn)
        intervalRef.current=setInterval(() => {
            document.getElementById("cameraChange").click()
            
        }, 5000);
      

    }
    const stopChange = () => {
        //poistaa checkboksin valinnan
        const cb=document.getElementById("automChangeCB")
        cb.checked=false
        //pysäyttää intervallin
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    return (
        <div>
            {/*e.target value eli valitun optionin value arvo lähetetään getcamera funktiolle*/}
            <select id="cameras" onChange={e => getCamera(e.target.value, this)}>
                <option value={'empty'} selected>Select</option>
                <option value={"tre"}>VT 3 Tampere Lakalaiva</option>
                <option value={"jkl"}>VT 4 Jyväskylä - Vaajakoski</option>
                <option value={"kur"}>VT 3 Kurikka</option>
            </select>
            <br></br><br></br>
            <button class="btn btn-primary btn-sm" id="cameraChange" onClick={changeView}>Change camera</button>
            <span className="changeBtn">
                <button class="btn btn-info btn-sm" onClick={increaseImage}>+</button>
            </span>
            <button class="btn btn-warning btn-sm" onClick={decreaseImage}>-</button>
            <button class="btn btn-success btn-sm" style={{ marginLeft: 10 + "px" }} onClick={resetValues}>Reset</button>
            <br></br><br></br>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="automChangeCB" onClick={automateChange}></input>
                <label class="form-check-label" for="automChangeCB">Automatically switch every 60 seconds</label>
            </div>
            <button class="btn btn-success btn-sm" onClick={()=>setContrast(contrast+10)}>Contrast +</button> <button class="btn btn-danger btn-sm" onClick={()=>setContrast(contrast-10)}>Contrast -</button>
            <button class="btn btn-danger btn-sm" hidden={hideStopBtn} onClick={stopChange}>stop</button>
            <div class="slidecontainer">
                <input type="range" min="1" max="3" step={0.1} defaultValue={1} class="slider" id="zoomRng" onInput={sliderMove}></input>
                <br></br>
                <span className="currentScale">Current scale: </span>
                <span id="sliderval"></span>
            </div>
            <br></br>
            <img id="camImg" style={{ transform: "scale(" + scale + ")",filter:"contrast("+contrast+"%)"}} width={camWidth} height={camHeight} alt="camera" src={'empty'}></img>

        </div>
    )
}
export default WeatherCam

