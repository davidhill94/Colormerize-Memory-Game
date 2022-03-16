import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import CardGrid from '../../CardGrid';
import '../../Layout.css';
import logo from '../../../images/logo.png';

const Lives = () => {
  const [lives, setLives] = useState(15);
  const [pairsLives, setPairsLives] = useState(0);

  const cardGridRef = useRef();
  

  //Checking Win or Loss
  useEffect(() => {
    if(lives === 0){
      setTimeout(() => {
        document.querySelector(".game-end-text").innerHTML = "You Lost!!"
        document.querySelector(".alert-container").classList.add("active")
    }, 1000)
  } else if(pairsLives === 8) {
    setTimeout(() => {
      document.querySelector(".game-end-text").innerHTML = "You Won!!"
      document.querySelector(".alert-container").classList.add("active")
  }, 1000)
  }
  }, [lives, pairsLives])

  //Handles New game after alert
  const newGame = () => {
    cardGridRef.current();
    document.querySelector(".game-end-text").innerHTML = "";
    document.querySelector(".alert-container").classList.remove("active");
    setPairsLives(0);
  }

  //Setting Difficulty
  const setEasy = () => {
    cardGridRef.current();
    setLives(15);
    setPairsLives(0);
    document.querySelector(".easy-btn").classList.add("active");
    document.querySelector(".medium-btn").classList.remove("active");
    document.querySelector(".hard-btn").classList.remove("active");
  }
  const setMedium = () => {
    cardGridRef.current();
    setLives(10);
    setPairsLives(0);
    document.querySelector(".easy-btn").classList.remove("active");
    document.querySelector(".medium-btn").classList.add("active");
    document.querySelector(".hard-btn").classList.remove("active");
  }
  const setHard = () => {
    cardGridRef.current();
    setLives(6);
    setPairsLives(0);
    document.querySelector(".easy-btn").classList.remove("active");
    document.querySelector(".medium-btn").classList.remove("active");
    document.querySelector(".hard-btn").classList.add("active");
  }

  return (
    <div className='outer-container'>
      <div className='details'>
      <h1>Lives: {lives}</h1>
      <h2>Pairs: {pairsLives}/8</h2>
      <Link to='/'>
        <button className='back-btn'>Back</button>
      </Link>
      <button className='restart-btn' onClick={() => cardGridRef.current()}>Restart</button>
      <div className='difficulty-container'>
        <button className="easy-btn active" onClick={setEasy}>Easy</button>
        <button className="medium-btn" onClick={setMedium}>Medium</button>
        <button className="hard-btn" onClick={setHard}>Hard</button>
      </div>
      </div>
      <div className='grid-wrapper'>
      <CardGrid
      cardGridRef={cardGridRef}
      setLives={setLives}
      setPairsLives={setPairsLives}
      />
      <div className="alert-container">
        <img src={logo} alt="logo"></img>
        <p className='game-end-text'></p>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
    </div>
  );
}

export default Lives