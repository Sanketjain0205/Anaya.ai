const response = await fetch("https://7dcead54-aa37-4a18-a581-76af4b696f55-00-1i6uas159ewjr.picard.replit.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  });
  