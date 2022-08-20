const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const { transitEvent } = require('./eventHelpers');
const chance = require("chance");
const Chance = new chance();
function sendPackage() {
  socket.on("vendorResponse", (packDoc) => {
    console.log(packDoc);
    socket.emit("driver", transitEvent(packDoc))
  });
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
}
sendPackage();
//setTimeout(() => {socket.disconnect()}, 1000);