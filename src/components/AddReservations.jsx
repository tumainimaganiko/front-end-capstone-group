import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createReservation } from '../redux/reservations/reservationSlice';
import { getUser } from '../util/auth';
import { fetchCars } from '../redux/cars/carsSlice';

function AddReservations() {
  const { id } = useParams();

  const { cars } = useSelector((store) => store.cars);

  const getCarId = () => {
    const car = cars.find((car) => car.id === Number(id));
    return car ? car.id : '';
  };

  const [state, setState] = useState({
    user: getUser().id,
    carId: getCarId(),
    city: '',
    rentDate: '',
    returnDate: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const carOptions = Array.isArray(cars)
    ? cars.map((car) => (
      <option value={car.id} key={car.id}>
        {car.name}
      </option>
    ))
    : null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReservation(state),
      setState({
        username: '',
        carId: '',
        city: '',
        rentDate: '',
        returnDate: '',
      }),
    );
  };

  return (
    <section className="bg-[#95BF02] fixed top-0 bottom-0 left-0 right-0 text-white">
      <div className="p-5 text-justify md:mx-auto md:w-1/2 md:my-[10%]">
        <h2 className="text-center font-bold">RESERVE A CAR TEST-RIDE</h2>
        <p className="my-2 text-[9px] md:text-center">
          There are 34 different versions of the Vespa. Today five series are in
          production: the classic manual transmission PX and the modern CVT
          transmission S: LX. GT, and GTS: We have showrooms all over the globe
          which some include test-riding facilities. if you wish to find out if
          a test-ride is available in your area, please use the selector below.
          London Book Now
        </p>

        <form onSubmit={handleFormSubmit} className="md:grid grid-cols-2 gap-3">
          <input
          type='text'
            name="city"
            id="input-car"
            value={state.city}
            onChange={handleChange}
            className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02]"
          />
          <select
            name="carId"
            id="input-car"
            className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02]"
            value={state.carId}
            onChange={handleChange}
          >
            <option value="" disabled>
              --Pick a Car brand --
            </option>
            {carOptions}
          </select>
          <label htmlFor="start_date">
            Start:
            <input
              type="date"
              id="input-date"
              name="rentDate"
              className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-full"
              value={state.rentDate}
              onChange={handleChange}
              placeholder="date time"
            />
          </label>
          <label htmlFor="start_date">
            End:
            <input
              type="date"
              id="input-date"
              name="returnDate"
              className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-full"
              value={state.returnDate}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="col-span-2 border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-1/2 mx-auto">RESERVE NOW</button>
        </form>
      </div>
    </section>
  );
}

export default AddReservations;
