function transitEvent(event, driver) {
  event.transit = true;
  event.driver = driver;
  event.time = convertTimestamp(Date.now());
  return event;
};

function deliveryEvent(event) {
  event.delivered = true;
  event.time = convertTimestamp(Date.now());
  return event;
}

function convertTimestamp(timestamp) {
  options = {
    hour: 'numeric', minute: 'numeric',
    weekday: 'long', month: 'long', day: 'numeric',
    hour12: true,
  }
  let date = new Intl.DateTimeFormat('de-DE', options).format(timestamp);
  return date;
}
module.exports = {
  transitEvent,
  deliveryEvent,
  convertTimestamp,
}