// COMMAND CENTER LOGIC

document.addEventListener('DOMContentLoaded', () => {
    initSystemMonitor();
    initTypingEffect();
});

/* --- SYSTEM MONITOR --- */
function initSystemMonitor() {
    const trafficElement = document.getElementById('net-traffic');
    
    // Random Network Traffic Simulation
    setInterval(() => {
        const rx = Math.floor(Math.random() * 900) + 50;
        const tx = Math.floor(Math.random() * 300) + 20;
        if(trafficElement) {
            trafficElement.innerText = `RX: ${rx}kb/s | TX: ${tx}kb/s`;
        }
    }, 1500);

    // Random Console Log Effect (Optional background noise)
    console.log("SYSTEM.ROOT: Access Granted.");
    console.log("MODULE.ARSENAL: Loaded.");
    console.log("MODULE.CASES: Loaded.");
}

/* --- TYPING EFFECT --- */
function initTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;

    const text = "Digital Forensics Specialist";
    // Clear initial content
    element.innerText = "";
    
    let index = 0;
    const speed = 100; // ms per char

    function type() {
        if (index < text.length) {
            element.innerText += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // Blink cursor forever or restart?
            // Let's restart after a long pause to keep it alive
            setTimeout(() => {
                element.innerText = "";
                index = 0;
                type();
            }, 5000);
        }
    }

    type();
}
