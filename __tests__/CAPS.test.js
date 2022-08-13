'use strict';
const { caps, makeEvent, transitEvent, deliveryEvent, } = require('../app');
const spy = jest.spyOn(caps, 'emit');

describe('CAPS', () => {
  it('Makes a package', () => {
    const response = makeEvent({ store: "The Drunken Huntsman", address: "Plains District, Whiterun", customer: "Nazeem" });
    console.log(response);
    expect(response.status).toBe("pickup");
  });

  it('Moves a package', () => {
    const response = transitEvent({
      status: 'transit',
      time: 'Samstag, 13. August, 4:41 PM',
      payload:
      {
        store: 'Starbucks',
        orderID: 1,
        address: 'Pick one',
        customer: 'A mermaid'
      }
    });
    expect(response.status).toBe("transit");
  });

  it('Delivers a package', () => {
    const response = deliveryEvent({
      status: 'delivered',
      time: 'Samstag, 13. August, 4:41 PM',
      payload:
      {
        store: 'Starbucks',
        orderID: 1,
        address: 'Pick one',
        customer: 'A mermaid'
      }
    });
    expect(response.status).toBe("delivered");
  });
});// test that it's emitting and logging