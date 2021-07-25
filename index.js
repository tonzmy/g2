const fetch = require('node-fetch');

// REPLACE YOUR Cookie
const Cookie = "";

const idToLocation = {
  '18295': 'Oshawa',
}

// const idToLocation = {
//   '18295': 'Oshawa',
//   '': 'Newmarket',
//   '': 'Port Unions',
//   '': 'Metro east',
//   '': 'Downs view', 
// }

const months = [7, 8];

async function fetchAvailableDates() {
  let path = null;
  for (const id of Object.keys(idToLocation)) {
    for (const month of months) {
      path = `https://drivetest.ca/booking/v1/booking/${id}?month=${month}&year=2021`;
      await fetch(path, {
        method: 'GET',
        headers: { 'Cookie': Cookie },
      }).then(res => res.json())
      .then(body => {
        try {
          const dates = body.availableBookingDates;
          dates.map((date) => {
            if (date.description === 'OPEN') {
              console.log(`${idToLocation[id]} is open on ${month} ${date.day}`);
            }
          })
        } catch(err) {
          throw new Error(err);
        }
      })
      .catch(err => console.error(err));
    }
  }
}

setInterval(() => {
  fetchAvailableDates();
}, 1000);

// fetchAvailableDates();