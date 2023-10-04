import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReservation } from '../redux/reservations/reservationSlice';
import { fetchCars } from '../redux/cars/carsSlice';

function AddReservations() {
  const { id } = useParams();

  const { cars } = useSelector((store) => store.cars);
  const { isLoading } = useSelector((store) => store.reservations);

  const getCarId = () => {
    const car = cars.find((car) => car.id === Number(id));
    return car ? car.id : '';
  };

  const [state, setState] = useState({
    car_id: getCarId(),
    destination: '',
    rental_date: '',
    date_return: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.name === 'car_id' ? parseInt(e.target.value, 10) : e.target.value,
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

    dispatch(createReservation(state));
    if (isLoading === false) {
      setState({
        car_id: '',
        destination: '',
        rental_date: '',
        date_return: '',
      });
    }
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
            type="text"
            name="destination"
            id="input-car"
            placeholder="City"
            value={state.destination}
            onChange={handleChange}
            className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02]"
          />
          <select
            name="car_id"
            id="input-car"
            className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02]"
            value={state.car_id}
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
              name="rental_date"
              className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-full"
              value={state.rental_date}
              onChange={handleChange}
              placeholder="date time"
            />
          </label>
          <label htmlFor="start_date">
            End:
            <input
              type="date"
              id="input-date"
              name="date_return"
              className="border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-full"
              value={state.date_return}
              onChange={handleChange}
            />
          </label>
          {isLoading
            ? (<button type="button" className="col-span-2 border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-1/2 mx-auto">RESERVING...</button>)
            : (<button type="submit" className="col-span-2 border rounded-3xl bg-[#95BF02] hover:bg-white hover:text-[#95BF02] w-1/2 mx-auto">RESERVE NOW</button>)}

        </form>
      </div>
    </section>
  );
}

export default AddReservations;
