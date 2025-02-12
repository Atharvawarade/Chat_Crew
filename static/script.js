document.addEventListener("DOMContentLoaded", function () {
    // Toggle Chatbot visibility
    function toggleChatbot() {
        const chatbot = document.getElementById("chatbot");
        chatbot.classList.toggle("active");
    }

    // Send Message function
    async function sendMessage() {
        const userMessage = document.getElementById("userMessage").value.trim();
        const chatBody = document.getElementById("chatBody");
        if (userMessage === "") return;

        // Append user message
        chatBody.innerHTML += `<div class="chat-message user-message">${userMessage}</div>`;
        document.getElementById("userMessage").value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        // Show a "thinking" indicator
        // Show a "thinking" animation instead of text
        chatBody.innerHTML += `<div class="chat-message bot-message thinking">
        <span class="loader"></span>
        </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;

        // Send message to server and fetch response
        try {
            const response = await fetch("/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage }),
            });
            const data = await response.json();

            // Remove "thinking" indicator and append bot response
            document.querySelector(".thinking").remove();
            chatBody.innerHTML += `<div class="chat-message bot-message">${data.response}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        } catch (error) {
            document.querySelector(".thinking").remove();
            chatBody.innerHTML += `<div class="chat-message bot-message">Error processing your request.</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    // Attach Enter key event listener
    document
        .getElementById("userMessage")
        .addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission
                document.querySelector(".send-button").click(); // Trigger the send button
            }
        });

    // Attach toggleChatbot function to the toggle button
    document
        .querySelector(".chatbot-toggle")
        .addEventListener("click", toggleChatbot);
});
