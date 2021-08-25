import React, {useEffect, useState} from 'react';

const GuessNum = () => {
  const [number, setNumber] = useState(Math.round(Math.random() * 10))
  const [guessNumber, setGuessNumber] = useState("")
  const [attempt, setAttempt] = useState(3)
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)

  const changeInput = (e) => {
    setGuessNumber(e.target.value)
  }

  const check = () => {
      if (attempt){
        setAttempt(attempt -1)
      }
  }

  useEffect(() => {
    if (number === +guessNumber) {
      setMessage('Вы угадали!')
      setScore(score + 1)
    }
    if (attempt === 0) {
      setMessage('Вы не угадали!')
    }
  },[attempt])

  const newGame = () => {
    setAttempt(3)
    setGuessNumber("")
    setMessage("")
    setNumber(Math.round(Math.random()* 10))
  }

  return (
<div className="row my-5">
  <div className={"col-6 offset-3"}>
    <h1>Угадай число с 3-х попыток</h1>
    <div className={"d-flex"}>
      <input type="number" value={guessNumber} id={"number"} onChange={changeInput} className={"form-control"} placeholder={""}/>
      <button onClick={check} disabled={!guessNumber} className={"btn btn-success ms-2"}>Chek</button>
      <button onClick={newGame} className={"btn btn-warning ms-2"}>Restart</button>
    </div>
      {
        message.length === 0 &&
          <h3>У вас осталось {attempt} {attempt === 1 ? 'попытка' : 'попытки'}</h3>
      }
        <h2>{message}</h2>
        <h3>Ваш счет: {score}</h3>
  </div>
</div>
  );
};

export default GuessNum;
