const EventEmitter = require("events");
const caps = new EventEmitter();
const socketIo = require("socket.io");
const io = socketIo(3500);
const allClients = [];
io.on("connection", (client) => {
  console.log('connection')
  allClients.push(client);
  // Instrument clients will send us measurements
  client.on("vendor", (packDoc) => {vendor(packDoc)});
  client.on("driver",(packDoc) => {driver(packDoc)});
  client.on("delivery", delivery);
});



function sleep(amt) {
  return new Promise((resolve) => setTimeout(resolve, amt));
}

function transitEvent(event) {
  event.status = "transit";
  event.time = convertTimestamp(Date.now());
  return event;
};

function deliveryEvent(event) {
  event.status = "delivered";
  event.time = convertTimestamp(Date.now());
  return event;
}

convertTimestamp = (timestamp) => {
  options = {
    hour: 'numeric', minute: 'numeric',
    weekday: 'long', month: 'long', day: 'numeric',
    hour12: true,
  }
  let date = new Intl.DateTimeFormat('de-DE', options).format(timestamp);
  return date;
}

const vendor = async (pickup) => {
  console.log("Vendor", pickup);
  //await sleep(1000);
  io.emit("vendorResponse", pickup);
  //caps.emit("driver", transitEvent(pickup));
};

const driver = async (pickup) => {
  console.log("Driver", pickup);
  //await sleep(1000);
  io.emit("driverResponse", pickup);
};

const delivery = async (pickup) => {
  console.log("Delivery", pickup);
};
console.log('Server ready');
module.exports = {
  transitEvent,
  deliveryEvent,
  caps,
}