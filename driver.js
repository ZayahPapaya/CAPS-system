const { io } = require("socket.io-client");
const socket = io("ws://localhost:3500");
const { transitEvent } = require('./eventHelpers');
const chance = require("chance");
const Chance = new chance();

const fleet = ['Lenny', 'Lenard', 'Lenelope'];

function sendPackage() {
  socket.on("driverReturn", (driver) => {fleet.unshift(driver)});
  socket.on("packageClaimed", (packDoc) => {// this needs to emit to packageSelect
    socket.emit("driver", transitEvent(packDoc, fleet.pop()));
  }); // add in drivers logic
  socket.on("packageList", (ready) => {
    console.log(ready);
    socket.emit("packageSelect");
  });
  //setTimeout(sendPackage, Chance.natural({ min: 5000, max: 10000 }));
}
sendPackage();
//setTimeout(() => {socket.disconnect()}, 1000);