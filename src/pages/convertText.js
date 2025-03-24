function ConvertText() {
    function speak(val) {
        const utterance = new SpeechSynthesisUtterance(val);
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];
        utterance.lang = "en-US"
        speechSynthesis.speak(utterance);
    }
    return(
        <div>
            
            <input class="form-check-input" id="speakCB" onClick={() => speak(document.getElementById("list").innerHTML)}></input>
            <label class="form-check-label" for="speakCB">Convert text to speech</label>
        </div>
    )
}
export default ConvertText;