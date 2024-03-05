// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = firebase.database();

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message !== '') {
        database.ref('messages').push({
            message: message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
}

// Function to display messages
function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
}

// Listen for new messages in the database
database.ref('messages').on('child_added', function(snapshot) {
    const message = snapshot.val().message;
    displayMessage(message);
});
