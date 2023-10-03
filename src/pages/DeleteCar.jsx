import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar, fetchCars } from '../redux/cars/carsSlice';

function DeleteCar({ car }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCar(car.id));
  };

  return (
    <div>
      <p>{car.name}</p>
      <p>{car.details}</p>
      <button type="button" onClick={handleDelete}>Delete</button>
    </div>
  );
}

function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const isLoading = useSelector((state) => state.cars.isLoading);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {cars.map((car) => (
        <DeleteCar key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;

DeleteCar.propTypes = {
  car: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    details: propTypes.string,
  }).isRequired,
};
