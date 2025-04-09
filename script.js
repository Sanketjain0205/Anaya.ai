const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');

// Function to speak the text using SpeechSynthesis API
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  // Set voice properties (this may vary depending on the available voices in the browser)
  const voices = speechSynthesis.getVoices();
  const indianVoice = voices.find(voice => voice.name.includes('Indian')); // Adjust this condition for the desired voice
  utterance.voice = indianVoice || voices[0]; // Default to first available voice if Indian voice is not found

  // Optional: Adjust speech rate, pitch, etc.
  utterance.rate = 1; // Adjust speed (1 is normal)
  utterance.pitch = 1; // Adjust pitch (1 is normal)

  // Speak the text
  speechSynthesis.speak(utterance);
}

// Function to add a message with typing effect
function addMessageWithTypingEffect(message, sender) {
  const p = document.createElement('p');
  p.className = sender;

  let i = 0;
  const typingSpeed = 100; // Speed of typing in milliseconds

  function type() {
    if (i < message.length) {
      p.textContent += message.charAt(i);
      i++;
      setTimeout(type, typingSpeed);
    }
  }

  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;

  type(); // Start the typing animation
}

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  userInput.value = '';
  
  // Display a "thinking..." message while waiting for response
  addMessage("Thinking...", 'bot');

  try {
    const response = await fetch("https://7dcead54-aa37-4a18-a581-76af4b696f55-00-1i6uas159ewjr.picard.replit.dev/anaya", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if data.reply exists
    if (data.reply) {
      addMessageWithTypingEffect(data.reply, 'bot'); // Call the typing effect function
      speakText(data.reply); // Call the speakText function to speak the reply
    } else {
      addMessage("Sorry, I didn't quite catch that. Could you try again?", 'bot');
    }
  } catch (err) {
    console.error("Error talking to Anaya:", err);
    addMessage("Hmm, I’m having trouble responding right now. Try again later?", 'bot');
  }
}

function addMessage(message, sender) {
  const p = document.createElement('p');
  p.className = sender;
  p.textContent = message;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
