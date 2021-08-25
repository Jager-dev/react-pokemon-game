import React, {useState,useEffect} from 'react';
import axios from "axios";

const PokGame = () => {
  const [pokemons, setPokemons] = useState([])
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState({})
  const [score, setScore] = useState(0)
  const [freeAttempts, setFreeAttempts] = useState(false)

  const generateNum = () => {
    return Math.round(Math.random() * 150)
  }

  useEffect(() => {
    axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(({data}) => {
        setPokemons(data.pokemon)
      })
  }, [])

  const Start = () => {
    if (!freeAttempts){
      setFreeAttempts(10)
      setScore(0)
    }
    const random = generateNum()
    const vars = [random, generateNum(), generateNum(), generateNum()]
    setOptions(vars.map(num => {
      return pokemons.find(el => el.id === num)
    }))
    setAnswer(pokemons.find(el => el.id === random))
  }

  const GuessBtn = (id) => {
    if (answer.id === id) {
      setScore(score + 1)
    }
    if (freeAttempts) {
      setFreeAttempts(freeAttempts - 1)
    }
    Start()
  }

  return (
    <div>
      <button onClick={Start}>{freeAttempts === false? 'Start' : 'Replay'}</button>
      {
        !!freeAttempts &&
        <div>
          <div>
            <img src={answer.img} alt=""/>
          </div>
          {
            options.sort(() => Math.random() - 0.5).map((el, idx) =>
              <button onClick={() => GuessBtn(el.id)} key={idx}>{el.name}</button>
            )
          }
        </div>
      }
      <div>
        Score: {score}
      </div>
    </div>
  );
}

export default PokGame;