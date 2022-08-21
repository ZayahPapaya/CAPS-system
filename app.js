const EventEmitter = require("events");
const caps = new EventEmitter();
const socketIo = require("socket.io");
const io = socketIo(3500);
const allClients = [];

let ready = [];
let complete = [];

io.on("connection", (client) => {
  console.log('connection')
  allClients.push(client);
  // Instrument clients will send us measurements
  client.on("vendor", (packDoc) => { vendor(packDoc), mailCall(client) });
  client.on("driver", (packDoc) => { driver(packDoc) });
  client.on("delivery", delivery);
  client.on("mailRequest", () => mailCall(client));
  client.on("mailRecieved", () => { complete = [] });
  client.on("packageSelect", () => {
    client.emit("packageClaimed", ready.pop());
  });
});


function mailCall(client) {
  client.emit("mailResponse", complete);
}
function sleep(amt) {
  return new Promise((resolve) => setTimeout(resolve, amt));
}

// function transitEvent(event) {
//   event.transit = true;
//   event.time = convertTimestamp(Date.now());
//   return event;
// };

// function deliveryEvent(event) {
//   event.delivered = true;
//   event.time = convertTimestamp(Date.now());
//   return event;
// }

convertTimestamp = (timestamp) => {
  options = {
    hour: 'numeric', minute: 'numeric',
    weekday: 'long', month: 'long', day: 'numeric',
    hour12: true,
  }
  let date = new Intl.DateTimeFormat('de-DE', options).format(timestamp);
  return date;
}

const vendor = (pickup) => { // Now queues up package lists
  console.log("Vendor", pickup);
  ready.unshift(pickup);
  io.emit("packageList", ready);
};

const driver = async (pickup) => { // Now has a limited driver pool
  await sleep(10000)
  console.log("Driver", pickup);
  //await sleep(1000);
  io.emit("driverResponse", pickup);
};

const delivery = (pickup) => { // Now returns drivers to pool. Needs to pool missed delivery messages
  console.log("Delivery", pickup);
  complete.push(pickup);
  io.emit("driverReturned", pickup.driver);
};

const killCommand = () => {
  socketIo.disconnect()
}

console.log('Server ready');
module.exports = {
  killCommand,
  caps,
}