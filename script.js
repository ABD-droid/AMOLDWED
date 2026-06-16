const wrapper = document.getElementById('envelope-wrapper');
const audio1 = document.getElementById('weddingAudio1');
const audio2 = document.getElementById('weddingAudio2');
const instructionText = document.querySelector('.instruction-text');
let isOpen = false;
let flowerInterval; // Controls the flower shower

// --- Seamless Audio Transition ---
// When the first audio file finishes, instantly start playing the second audio file
audio1.addEventListener('ended', () => {
    audio2.play().catch(error => {
        console.log("Audio 2 play blocked or file not found.");
    });
});

// --- Click Event to Open/Close Envelope ---
wrapper.addEventListener('click', () => {
    if (!isOpen) {
        // Open envelope and slide letter up
        wrapper.classList.add('open');
        
        // Play the first part of the audio
        audio1.play().catch(error => {
            console.log("Audio 1 play blocked or file not found.");
        });
        
        instructionText.innerText = "स्वागत आहे! (Welcome!)";
        isOpen = true;

        // 🌸 Start the beautiful flower shower!
        startFlowerShower();
    } else {
        // Close envelope and slide letter back inside
        wrapper.classList.remove('open');
        
        // Stop both audios instantly and reset their timelines to the beginning
        audio1.pause();
        audio2.pause();
        audio1.currentTime = 0; 
        audio2.currentTime = 0; 
        
        instructionText.innerText = "💌 लिफाफा उघडण्यासाठी क्लिक करा";
        isOpen = false;

        // 🛑 Stop the flower shower completely
        stopFlowerShower();
    }
});

// --- 🌸 Flower Shower Logic 🌸 ---

function startFlowerShower() {
    // Drop a burst of 8 flowers immediately upon opening
    for (let i = 0; i < 8; i++) {
        setTimeout(createFlower, i * 100);
    }
    // Continue dropping a steady stream of flowers every 300 milliseconds
    flowerInterval = setInterval(createFlower, 300);
}

function stopFlowerShower() {
    // Stop the interval loop from making new flowers
    clearInterval(flowerInterval);
    
    // Clear all existing flowers currently falling down the screen
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(f => f.remove());
}

function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    
    // Traditional Indian wedding flower emoji mix (Rose, Marigold, Jasmine, Hibiscus)
    const flowerTypes = ['🌸', '🌼', '🌹', '🌺', '🏵️'];
    flower.innerText = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    
    // Randomize horizontal placement across the screen width
    flower.style.left = Math.random() * 100 + 'vw';
    
    // Randomize flower sizes so some look closer and some look further away
    flower.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    
    // Randomize fall speeds (between 4 to 7 seconds) and swaying paths (between 2 to 4 seconds)
    const fallDuration = Math.random() * 3 + 4; 
    const swayDuration = Math.random() * 2 + 2;
    flower.style.animationDuration = `${fallDuration}s, ${swayDuration}s`; 
    
    document.body.appendChild(flower);
    
    // Automatically delete the flower element after it falls completely off the screen
    setTimeout(() => {
        flower.remove();
    }, fallDuration * 1000); 
}