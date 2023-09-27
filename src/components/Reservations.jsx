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
    <div>Reservations</div>
  )
}

export default Reservations