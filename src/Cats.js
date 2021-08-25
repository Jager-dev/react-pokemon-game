import React, {useEffect, useState} from 'react';
import axios from "axios";

const Cats = () => {
  const [breeds, setBreeds] = useState([])
  const [oneCat, setOneCat] = useState({})
  const infoCats = (e) => {
    setOneCat(breeds.find(item => item.id === e.target.value))
  }

  useEffect(() => {
    axios('https://api.thecatapi.com/v1/breeds')
      .then(({data}) => setBreeds(data))
  },[oneCat])

  return (
    <div>
      <select onChange={infoCats}>
        {
          breeds.map(el => {
              return (<option value={el.id} key={el.id}>{el.name}</option>)
            }
          )
        }
      </select>
      { oneCat.id && <div>
        <img src={oneCat.image.url} alt={oneCat.name} width={500}/>
        <h2>{oneCat.name}</h2>
        <h5>{oneCat.description}</h5>
      </div>
      }
    </div>
  )
}

export default Cats