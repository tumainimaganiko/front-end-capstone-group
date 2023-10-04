const myReservations = [];

const reservations = [
  {
    rental_date: '2020-01-21',
    date_return: '2020-04-23',
    destination: 'Dar es Salaam',
    car_id: 1,
  },
  {
    rental_date: '2023-01-21',
    date_return: '2023-04-23',
    destination: 'Algeria',
    car_id: 2,
  },
  {
    rental_date: '2020-01-21',
    date_return: '2021-03-07',
    destination: 'Kigali',
    car_id: 3,
  },
  {
    rental_date: '1900-01-21',
    date_return: '1980-03-23',
    destination: 'Africa',
    car_id: 4,
  },
  {
    rental_date: '2020-01-21',
    date_return: '2020-04-23',
    destination: 'Tanzania',
    car_id: 5,
  },
  {
    rental_date: '2020-01-21',
    date_return: '2020-04-23',
    destination: 'World',
    car_id: 6,
  },
  {
    rental_date: '2020-01-21',
    date_return: '2020-04-23',
    destination: 'Dar es Salaam',
    car_id: 7,
  },
];

reservations.forEach((reservation) => {
  myReservations.push({
    rental_date: reservation.rental_date,
    date_return: reservation.date_return,
    destination: reservation.destination,
    car_id: reservation.car_id,
  });
});

export default myReservations;
