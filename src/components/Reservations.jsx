import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservations/reservationSlice';

function Reservations() {
  const { reservations } = useSelector((state) => state.reservations);
  const { error } = useSelector((state) => state.reservations);
  const { cars } = useSelector((state) => state.cars);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const { reservationIsLoading } = useSelector((state) => state.reservations);

  const isItLoading = reservationIsLoading ? '' : '';
  return (
    <section className={`${isItLoading} bg-[#95BF02] fixed top-0 overflow-auto left-0 h-full w-full p-2`}>
      <h1 className="text-center">Reservations</h1>
      <p className="text-center">{reservationIsLoading ? 'Fetching Reservations ....' : ''}</p>

      <table className="mx-auto table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">Start Date</th>
            <th className="border border-slate-600">End Date</th>
            <th className="border border-slate-600">City</th>
            <th className="border border-slate-600">Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {!reservationIsLoading && error.length === 0
            ? reservations && reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border border-slate-600">{reservation.rental_date}</td>
                <td className="border border-slate-600">{reservation.date_return}</td>
                <td className="border border-slate-600">{reservation.destination}</td>
                <td className="border border-slate-600">
                  {
                    { ...cars.find((car) => (car.id === reservation.car_id)) }.name
                  }
                </td>
              </tr>
            )) : ('')}
        </tbody>
      </table>
    </section>
  );
}

export default Reservations;
