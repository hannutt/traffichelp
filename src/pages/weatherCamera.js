import { useState } from "react"

function WeatherCam() {
    const camTre=['https://weathercam.digitraffic.fi/C0450701.jpg','https://weathercam.digitraffic.fi/C0450702.jpg','https://weathercam.digitraffic.fi/C0450703.jpg']
    const camKur=["https://weathercam.digitraffic.fi/C1051401.jpg","https://weathercam.digitraffic.fi/C1051402.jpg","https://weathercam.digitraffic.fi/C1051409.jpg"]
    const [camView,setCamView]=useState(0)   
    function getCamera(e) {
      
        //talletetaan muuttujaan merkkijonon 3 ensimmäistä kirjainta
        var city=e.substring(0,3)
        //poistetaan 3 ensimmäistä kirjainta
        var final=e.substring(3)
        localStorage.setItem("city",city)
        
        
        //e on parametrina saatava optionin value, joka annetaan img elementille sourceksi.
        document.getElementById("camImg").src=final
        
    }
    function changeView() {
        var city=localStorage.getItem("city")
        console.log(city)
      
    
        if (city==='tre')
        {
            setCamView(camView+1)
            document.getElementById("camImg").src=camTre[camView]

        }
        else if (city==='kur')
        {
            setCamView(camView+1)
            document.getElementById("camImg").src=camKur[camView]
        }
        //var val = WeatherCam()
        //console.log(val)*/
      
    
    }
    return(
        <div>
            {/*e.target value eli valitun optionin value arvo lähetetään getcamera funktiolle*/}
            <select id="cameras" onChange={e=>getCamera(e.target.value,this)}>
                <option value={'empty'} selected>Select</option>
                <option value={"tre"+camTre[camView]}>VT 3 Tampere Lakalaiva</option>
                <option value={'https://weathercam.digitraffic.fi/C0951001.jpg'}>V4 Jyväskylä - Vaajakoski</option>
                <option value={"kur"+camKur[camView]}>VT 3 Kurikka</option>
            </select>
            <br></br>
            <button class="btn btn-primary btn-sm" onClick={changeView}>Change camera</button>
            <br></br>
            <img id="camImg" width={700} height={500} alt="camera image" src={'empty'}></img>
           

        </div>
    )
}
export default WeatherCam

