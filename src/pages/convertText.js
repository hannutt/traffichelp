import { useState } from "react";

function ConvertText() {
    const [ttsShown,setTtsShown]=useState(false)
    function speak(val) {

        setTtsShown(!ttsShown)
        const utterance = new SpeechSynthesisUtterance(val);
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];
        utterance.lang = "en-US"
        speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
        speechSynthesis.cancel()
    }
    return(
        <div>
            
            <input class="form-check-input" type="checkbox" id="speakCB" onClick={() => speak(document.getElementById("list").innerHTML)}></input>
            <label class="form-check-label" for="speakCB">Convert text to speech</label>
            {ttsShown &&<button class="btn btn-danger btn-sm" onClick={stopSpeaking}>||</button>}
            
        </div>
    )
}
export default ConvertText;