const myCars = [];
const cars = [{
  id: 1,
  name: 'Car 1',
  image: 'car1.png',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 25,
  city: 'Paris',
  models: 'Toyota',
},
{
  id: 2,
  name: 'Car 2',
  image: 'car2.png',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 12,
  city: 'Paris',
  models: 'Toyota',
},
{
  id: 3,
  name: 'Car 3',
  image: 'car3.png',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 20,
  city: 'Paris',
  models: 'Toyota',
},
{
  id: 4,
  name: 'Car 4',
  image: 'car2.png',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 35,
  city: 'Paris',
  models: 'Toyota',
},
{
  id: 5,
  name: 'Car 5',
  image: 'car2.png',
  details: 'Lorem ipsum ',
  price: 29,
  city: 'Paris',
  models: 'Toyota',
},
{
  id: 6,
  name: 'Car 6',
  image: 'car3.png',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 5,
  city: 'Paris',
  models: 'Toyota',
}];

cars.forEach((car) => {
  myCars.push({
    id: car.id,
    name: car.name,
    image: car.image,
    details: car.details,
    price: car.price,
    city: car.city,
    models: car.models,
  });
});

export default myCars;
