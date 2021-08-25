import React, {useEffect, useState} from 'react';
import axios from "axios";

const StarWars= () => {
  const [user, setUser] = useState('')
  const [id, setId] = useState(1)

  const decNumber = () => {
    if (id === 1) {
      setId(83)
    } else {
      setId(+id - 1)
    }
  }
  const incNumber = () => {

    if (id > 82) {
      setId(1)
    } else {
      setId(+id + 1)
    }
  }
  const handleInput = (e) => {
    setId(e.target.value)
  }
  useEffect(() => {
    axios(`https://swapi.dev/api/people/${id}`)
      .then(({data}) => setUser(data.name))
  }, [id])

  return (
    <div className={'row'}>
      <div className="col-6 offset-3">
        <div className="d-flex">
          <button onClick={decNumber} className={'btn btn-danger'}> - </button>
          <input type="number" onChange={handleInput} value={id} />
          <button onClick={incNumber} className={'btn btn-success'}> + </button>
        </div>
        <div>{user}</div>
      </div>
    </div>
  );
};

export default StarWars;