import { useState } from "react"

function WeatherCam() {
    const camTre='https://weathercam.digitraffic.fi/C0450701.jpg'
    const camJkl='https://weathercam.digitraffic.fi/C0450703.jpg'

    function getCamera(e) {
        //e on parametrina saatava optionin value, joka annetaan img elementille sourceksi.
        document.getElementById("camImg").src=e
        

    }
    return(
        <div>
            {/*e.target value eli valitun optionin value arvo lähetetään getcamera funktiolle*/}
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

