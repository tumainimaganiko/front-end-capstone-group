import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createReservation } from '../redux/reservations/reservationSlice';
import { getUser } from '../util/auth';
import { fetchCars } from '../redux/cars/carsSlice';

function AddReservations() {
  const [state, setState] = useState({
    user: getUser.id,
    carId: '',
    city: '',
    rentDate: '',
    returnDate: '',
  });

  const { cars } = useSelector((store) => store.cars);

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

  const cities = [
    'London',
    'New York City',
    'Dar es Salaam',
    'Kigali',
    'Lagos',
  ];

  const cityOptions = cities.map((city) => (
    <option value={city} key={uuidv4()}>
      {city}
    </option>
  ));

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
        carBrand: '',
        city: '',
        rentDate: '',
        returnDate: '',
      }),
    );
  };

  return (
    <section className="bg-[#95BF02] h-full m-0 md:fixed">
      <div className="p-5 text-justify md:mx-auto md:w-1/2 md:my-[10%]">
        <h2 className="text-center">RESERVE A CAR TEST-RIDE</h2>
        <p className="my-2">
          There are 34 different versions of the Vespa. Today five series are in
          production: the classic manual transmission PX and the modern CVT
          transmission S: LX. GT, and GTS: We have showrooms all over the globe
          which some include test-riding facilities. if you wish to find out if
          a test-ride is available in your area, please use the selector below.
          London Book Now
        </p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="input-name">
            <input
              type="text"
              id="input-name"
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </label>

          <label htmlFor="input-car">
            <select
              name="city"
              id="input-car"
              value={state.city}
              onChange={handleChange}
            >
              <option value="" disabled>
                --Pick a city --
              </option>
              {cityOptions}
            </select>
          </label>
          <label htmlFor="input-car">
            <select
              name="carId"
              id="input-car"
              value={state.carBrand}
              onChange={handleChange}
            >
              <option value="" disabled>
                --Pick a Car brand --
              </option>
              {carOptions}
            </select>
          </label>
          <label htmlFor="input-date">
            <input
              type="date"
              id="input-date"
              name="rentDate"
              value={state.rentDate}
              onChange={handleChange}
              placeholder="date"
            />
          </label>
          <label htmlFor="input-date">
            <input
              type="date"
              id="input-date"
              name="returnDate"
              value={state.returnDate}
              onChange={handleChange}
            />
          </label>
          <button type="submit">RESERVE NOW</button>
        </form>
      </div>
    </section>
  );
}

export default AddReservations;
