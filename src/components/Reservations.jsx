import React, { useState } from 'react'

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
    </section>
  )
}

export default Reservations