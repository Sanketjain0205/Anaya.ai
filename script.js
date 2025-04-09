const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  userInput.value = '';

  try {
    const response = await fetch("https://7dcead54-aa37-4a18-a581-76af4b696f55-00-1i6uas159ewjr.picard.replit.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    addMessage(data.reply, 'bot');
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
