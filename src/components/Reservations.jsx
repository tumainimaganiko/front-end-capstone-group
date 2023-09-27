import React, { useState } from 'react'

const Reservations = () => {

    const [state, setState] = useState({
        username: '',
        carBrand: '',
        city: '',
        date: '',
      });
      
  return (
    <div>Reservations</div>
  )
}

export default Reservations