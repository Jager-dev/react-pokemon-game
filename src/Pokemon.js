import React, {useEffect, useState} from 'react';
import axios from "axios";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const filterpokemon = pokemon.filter(el => el.name.toLowerCase().includes(search))

  useEffect(() => {
    axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(({data}) => {
        setPokemon(data.pokemon)
      })
  })

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  return (
    <div>
      <input type="text" onChange={handleSearch}/>
      {
        filterpokemon.slice(currentPage * 15, (currentPage * 15) + 15).map(el =>
         <div>
           <img src={el.img} alt=""/>
           <div key={el.id}>{el.name}</div>
         </div>
        )
      }
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {[1,2,3,4,5,6,7,8,9,10].map((el, idx) =>
            <li className="page-item" onClick={() => setCurrentPage(idx)}>
              {el}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pokemon;

