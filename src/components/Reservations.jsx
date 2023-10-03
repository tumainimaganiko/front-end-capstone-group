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
    <section className="bg-[#95BF02] fixed top-0 bottom-0 left-0 right-0">
      <h1 className="text-center">Reservations</h1>

      <table className="mx-auto table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">Start Date</th>
            <th className="border border-slate-600">End Date</th>
            <th className="border border-slate-600">City</th>
            <th className="border border-slate-600">Vehicles</th>
            <th className="border border-slate-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {reservations && reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="border border-slate-600">{reservation.rental_date}</td>
              <td className="border border-slate-600">{reservation.date_return}</td>
              <td className="border border-slate-600">{reservation.destination}</td>
              <td className="border border-slate-600">{reservation.car_id.name}</td>
              <td className="border border-slate-600">{reservation.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Reservations;
