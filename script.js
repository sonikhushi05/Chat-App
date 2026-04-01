let username = "";
let currentRoom = "general";
const socket = new WebSocket("ws://localhost:3000");

function joinApp() {
  username = document.getElementById("username").value;
  if (!username) return alert("Enter username");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function createRoom() {
  const room = document.getElementById("newRoom").value;
  if (!room) return;
  addRoom(room);
}

function addRoom(room) {
  const li = document.createElement("li");
  li.innerText = room;
  li.onclick = () => currentRoom = room;
  document.getElementById("rooms").appendChild(li);
}

function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) return;

  socket.send(JSON.stringify({ username, msg, room: currentRoom }));
  document.getElementById("messageInput").value = "";
}

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.room !== currentRoom) return;

  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<b>${data.username}</b><br>${data.msg}<br><small>${new Date().toLocaleTimeString()}</small>`;
  document.getElementById("messages").appendChild(div);
};