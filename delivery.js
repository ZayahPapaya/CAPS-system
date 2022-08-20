const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const { deliveryEvent } = require('./eventHelpers');
const chance = require("chance");
const Chance = new chance();
function sendPackage() {
  
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
  socket.on("driverResponse", (packDoc) => {
    console.log(packDoc);
    socket.emit("delivery", deliveryEvent(packDoc));
});
}
sendPackage();
//setTimeout(() => {socket.disconnect()}, 1000);