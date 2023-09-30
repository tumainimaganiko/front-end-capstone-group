import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservations/reservationSlice';

function Reservations() {

    const { reservations } = useSelector( store => store.reservations )

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchReservations())
    }, [dispatch])
    
  return (
    <div>Reservations</div>
  );
}

export default Reservations;
