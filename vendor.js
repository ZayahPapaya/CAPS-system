const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const chance = require("chance");
const Chance = new chance();
const { generateCustomer, makeEvent } = require('./generateCustomer');

socket.on("mailResponse", (mail) => {
  console.log(mail);
  socket.emit("mailRecieved");
});
socket.emit("mailRequest");

function sendPackage() {
  const packDoc = makeEvent(generateCustomer())
  console.log(packDoc);
  socket.emit("vendor", packDoc);
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
  // Emit any events we want
}
console.log('Vendor ready');
setInterval(() => {
  sendPackage()
}, 2000);
//sendPackage();

//setTimeout(() => {socket.disconnect()}, 1000);