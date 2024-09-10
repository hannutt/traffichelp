import { useState } from "react"

function WeatherCam() {
    const [camTre,setCamTre]=useState('https://weathercam.digitraffic.fi/C0450701.jpg')
    const [camJkl,setCamJkl]=useState('https://weathercam.digitraffic.fi/C0450703.jpg')

    function getCamera(e) {
        console.log(e)
        document.getElementById("camImg").src=e
        

    }
    return(
        <div>
            <select onChange={e=>getCamera(e.target.value)}>
                <option value={'empty'} selected>Select</option>
                <option value={camTre}>VT 3 Tampere Lakalaiva</option>
                <option value={camJkl}>VT 9 Jyväskylä</option>
            </select>
            <br></br>
            <img id="camImg" width={700} height={500} src={camTre}></img>
           

        </div>
    )
}
export default WeatherCam

