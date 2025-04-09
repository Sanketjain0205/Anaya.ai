// script.js
const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  userInput.value = '';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Anaya, a kind, emotionally intelligent friend. You offer warm, empathetic support and never judge. Let the user feel heard, safe, and comforted." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  addMessage(reply, 'bot');
}

function addMessage(message, sender) {
  const p = document.createElement('p');
  p.className = sender;
  p.textContent = message;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
