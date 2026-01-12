import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQDOkFSKdwrmuSUL4Xa8OgI6PsUuhsGJk",
  authDomain: "chatapp-html.firebaseapp.com",
  projectId: "chatapp-html",
  storageBucket: "chatapp-html.firebasestorage.app",
  messagingSenderId: "584721854760",
  appId: "1:584721854760:web:f01003e71d7b821591601d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input");
const sendBtn = document.querySelector(".send-btn");
const clearBtn = document.querySelector(".clear-chat-button");

let username = "";

// realtime listener
const q = query(collection(db, "messages"), orderBy("time"));
onSnapshot(q, (snapshot) => {
  chatMessages.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${data.user}:</b> ${data.text}`;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// kirim pesan
sendBtn.addEventListener("click", async () => {
  if (!chatInput.value.trim()) return;

  await addDoc(collection(db, "messages"), {
    user: username,
    text: chatInput.value,
    time: serverTimestamp()
  });

  chatInput.value = "";
});

// clear chat global
clearBtn.addEventListener("click", async () => {
  const snap = await getDocs(collection(db, "messages"));
  snap.forEach(d => deleteDoc(d.ref));
});

// expose username
window.setUsername = (name) => {
  username = name;
};
