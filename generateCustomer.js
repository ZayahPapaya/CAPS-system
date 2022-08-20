const chance = require("chance");
const Chance = new chance();
let availableID = 0;
const { convertTimestamp } = require('./eventHelpers');
function createOrderID()
{
  availableID++;
  return availableID;
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

module.exports = {
  generateCustomer,
  makeEvent,
}