const EventEmitter = require("events");
const chance = require("chance");
const Chance = new chance();
const caps = new EventEmitter();
let availableID = 0;
//let request;

function createOrderID()
{
  availableID++;
  return availableID;
}

function sleep(amt) {
  return new Promise((resolve) => setTimeout(resolve, amt));
}

function generateCustomer()
{
  const rng = Chance.integer({min: 1, max: 4});
  let customer;
  switch (rng) {
    case 1:
      customer = {store: "Philip Sherman's Dentist Office", address: "P. Sherman, 42 Wallaby Way, Sydney", customer: "Philip Sherman"};
      break;
    case 2:
      customer = {store: "Papaya'R'Us", address: "8727 171st Ave SE", customer: "Zayah"};
      break;
    case 3:
      customer = {store: "Starbucks", address: "Pick one", customer: "A mermaid"};
      break;
    case 4:
      customer = {store: "The Drunken Huntsman", address: "Plains District, Whiterun", customer: "Nazeem"};
      break;
    default:
      console.log('How did you even get here?');
  }
  return customer;
}

function makeEvent(payload)
{
  const { store, address, customer } = payload;
  return {
    status: "pickup",
    time: convertTimestamp(Date.now()),
    payload: {
      store,
      orderID: createOrderID(),
      address,
      customer,
    },
  };
}

function transitEvent(event)
{
  event.status = "transit";
  event.time = convertTimestamp(Date.now());
  return event;
};

function deliveryEvent(event)
{
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
  caps.emit("polo", transitEvent(pickup));
};

const driver = async (pickup) => {
  console.log("Driver", pickup);
  //await sleep(1000);
  caps.emit("poland", deliveryEvent(pickup));
};

const delivery = async (pickup) => {
  console.log("Delivery", pickup);
};

caps.addListener("marco", vendor);
caps.addListener("polo", driver);
caps.addListener("poland", delivery);
//setInterval(() => {
caps.emit("marco", makeEvent(generateCustomer()));
//}, 2000);

module.exports = {
  makeEvent,
  transitEvent,
  deliveryEvent,
  caps,
}