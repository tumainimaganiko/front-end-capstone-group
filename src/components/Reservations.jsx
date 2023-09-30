import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservations/reservationSlice';

function Reservations() {
  const { reservations } = useSelector((store) => store.reservations);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div>
      <h1>Reservations</h1>

      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>City</th>
            <th>Motorcycle</th>
          </tr>
        </thead>
        <tbody>
          {reservations && reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.rentDate}</td>
              <td>{reservation.returnDate}</td>
              <td>{reservation.city}</td>
              <td>{reservation.car.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
