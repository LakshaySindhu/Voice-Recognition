document.addEventListener('DOMContentLoaded', function() {
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        

        const recognition = new SpeechRecognition();
        recognition.interimResults = true; 

        let isRecording = false; 


        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0].transcript) 
                .join(''); 

            
            document.getElementById("convert_text").value = transcript;
            console.log(transcript); 
        });


        document.getElementById("click_to_record").addEventListener('click', function() {
            if (!isRecording) {
                recognition.start(); // Start speech recognition
                isRecording = true;
                document.getElementById("click_to_record").textContent = 'Stop Recording';
            } else {
                recognition.stop(); // Stop speech recognition
                isRecording = false;
                document.getElementById("click_to_record").textContent = 'Start Recording';
            }
        });

        
        recognition.addEventListener('end', () => {
            if (isRecording) {
                recognition.start(); 
            }
        });
    } else {
        console.error('Speech recognition not supported in this browser.');
    }
});
