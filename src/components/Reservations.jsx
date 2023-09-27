import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Reservations = () => {

    const [state, setState] = useState({
        username: '',
        carBrand: '',
        city: '',
        date: '',
      });

      const handleChange = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      };

      const carBrands = ['Mercedes', 'BMW', 'Maserati', 'Infinity', 'Audi'];

  const carBrandOptions = carBrands.map((carBrand) => (
    <option value={carBrand} key={uuidv4()}>
      {carBrand}
    </option>
  ));

  return (
    <section>
      <h2>RESERVE A CAR TEST-RIDE</h2>
      <p>
        There are 34 different versions of the Vespa. Today five series are in
        production: the classic manual transmission PX and the modern CVT
        transmission S: LX. GT, and GTS: We have showrooms all over the globe
        which some include test-riding facilities. if you wish to find out if a
        test-ride is available in your area, please use the selector below.
        London Book Now
      </p>

      <form>
        <label htmlFor="input-name">
          Username:
          <input
            type="text"
            id="input-name"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="input-city">
          city:
          <input
            type="text"
            id="input-city"
            name="city"
            value={state.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="input-date">
          Date and Time:
          <input
            type="date"
            id="input-date"
            name="date"
            value={state.date}
            onChange={handleChange}
          />
        </label>
        <button type="submit">RESERVE NOW</button>
      </form>
    </section>
  )
}

export default Reservations