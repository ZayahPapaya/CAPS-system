const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const { deliveryEvent } = require('./eventHelpers');
const chance = require("chance");
const Chance = new chance();
function sendPackage() {
  
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
  socket.on("driverResponse", (document) => {
    console.log(document);
    socket.emit("delivery", deliveryEvent(document));
});
}
sendPackage();
//setTimeout(() => {socket.disconnect()}, 1000);