'use strict';
const { caps, killCommand} = require('../app');
const { transitEvent, deliveryEvent } = require('../eventHelpers');
const { makeEvent } = require('../generateCustomer');
const spy = jest.spyOn(caps, 'emit');

let response;
describe('CAPS', () => {
  it('Makes a package', () => {
    response = makeEvent({ store: "A store", address: "A place", customer: "Test Guy" });
    //console.log('First');
    expect(response.payload.customer).toBe("Test Guy");
  });

  it('Moves a package', () => {
    response = transitEvent(response, "Lenny");
    //console.log('Second');
    //console.log(moved);
    expect(response.driver).toBe("Lenny");
  });

  it('Delivers a package', () => {
    response = deliveryEvent(response);
    console.log('Third')
    //killCommand();
    expect(response.delivered).toBe(true);
  });
});// test that it's emitting and logging