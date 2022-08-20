const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const chance = require("chance");
const Chance = new chance();
const { generateCustomer, makeEvent } = require('./generateCustomer');
function sendPackage() {
  const document = makeEvent(generateCustomer())
  console.log(document);
  socket.emit("vendor", document);
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
  // Emit any events we want
}
console.log('Vendor ready');
setInterval(() => {
  sendPackage()
}, 2000);
//sendPackage();

//setTimeout(() => {socket.disconnect()}, 1000);