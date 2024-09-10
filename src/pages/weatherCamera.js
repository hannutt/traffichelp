import { useState } from "react"

function WeatherCam() {
   
    function getCamera(e) {
        //e on parametrina saatava optionin value, joka annetaan img elementille sourceksi.
        document.getElementById("camImg").src=e
        

    }
    return(
        <div>
            {/*e.target value eli valitun optionin value arvo lähetetään getcamera funktiolle*/}
            <select onChange={e=>getCamera(e.target.value)}>
                <option value={'empty'} selected>Select</option>
                <option value={'https://weathercam.digitraffic.fi/C0450701.jpg'}>VT 3 Tampere Lakalaiva</option>
                <option value={'https://weathercam.digitraffic.fi/C0951001.jpg'}>V4 Jyväskylä - Vaajakoski</option>
                <option value={'https://weathercam.digitraffic.fi/C1051401.jpg'}>VT 3 Kurikka</option>
            </select>
            <br></br>
            <img id="camImg" width={700} height={500} src={'empty'}></img>
           

        </div>
    )
}
export default WeatherCam

