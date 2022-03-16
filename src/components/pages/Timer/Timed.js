import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CardGrid from '../../CardGrid';
import '../../Layout.css';
import logo from '../../../images/logo.png';

const Timed = () => {
  const cardGridRef = useRef();

  const [timer, setTimer] = useState(60);
  const [activeTimer, setActiveTimer] = useState(false);
  const [pairsTimed, setPairsTimed] = useState(0);

  const restartTimer = () => {
     if (document.querySelector(".easy-btn").classList.contains("active")) {
       setTimer(60);
     } else if (document.querySelector(".medium-btn").classList.contains("active")) {
      setTimer(45);
    } else if (document.querySelector(".hard-btn").classList.contains("active")) {
      setTimer(30);
    }
    setPairsTimed(0);
    setActiveTimer(false);
    console.log(activeTimer);
  }

  // Sets timer to start on first click
  useEffect(() => {
    var interval = null;
    if(activeTimer === true){
     interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  }
               // clearing interval
    return () => clearInterval(interval);
  });

  //Checking Win or Loss
  useEffect(() => {
    if(timer === 0){
      setActiveTimer(false);
      setTimeout(() => {
        document.querySelector(".game-end-text").innerHTML = "You Lost!!"
        document.querySelector(".alert-container").classList.add("active")
    }, 1000)
  } else if(pairsTimed === 8) {
    setActiveTimer(false);
    setTimeout(() => {
      document.querySelector(".game-end-text").innerHTML = "You Won!!"
      document.querySelector(".alert-container").classList.add("active")
  }, 1000)
  }
  }, [timer, pairsTimed])

  //Handles New game after alert
  const newGame = () => {
    setActiveTimer(false);
    if (document.querySelector(".easy-btn").classList.contains("active")) {
      setTimer(60);
    } else if (document.querySelector(".medium-btn").classList.contains("active")) {
     setTimer(45);
   } else if (document.querySelector(".hard-btn").classList.contains("active")) {
     setTimer(30);
   }

    cardGridRef.current();
    document.querySelector(".game-end-text").innerHTML = "";
    document.querySelector(".alert-container").classList.remove("active");
    setPairsTimed(0);
  }


   //Setting Difficulty
   const setEasy = () => {
    setActiveTimer(false);
    setTimer(60);
    setPairsTimed(0);
    cardGridRef.current()
    document.querySelector(".easy-btn").classList.add("active");
    document.querySelector(".medium-btn").classList.remove("active");
    document.querySelector(".hard-btn").classList.remove("active");
  }
  const setMedium = () => {
    setActiveTimer(false);
    setTimer(45);
    setPairsTimed(0);
    cardGridRef.current()
    document.querySelector(".easy-btn").classList.remove("active");
    document.querySelector(".medium-btn").classList.add("active");
    document.querySelector(".hard-btn").classList.remove("active");
  }
  const setHard = () => {
    setActiveTimer(false);
    setTimer(30);
    setPairsTimed(0);
    cardGridRef.current()
    document.querySelector(".easy-btn").classList.remove("active");
    document.querySelector(".medium-btn").classList.remove("active");
    document.querySelector(".hard-btn").classList.add("active");
  }

  return (
    <div className='outer-container'>
      <div className='details'>
      <h1>Time: {timer}s</h1>
        <h2>Pairs: {pairsTimed}/8</h2>
        <Link to='/'>
          <button className='back-btn'>Back</button>
        </Link>
        <button className="restart-btn" onClick={() => {cardGridRef.current(); restartTimer()}}>Restart</button>
        <div className='difficulty-container'>
        <button className="easy-btn active" onClick={setEasy}>Easy</button>
        <button className="medium-btn" onClick={setMedium}>Medium</button>
        <button className="hard-btn" onClick={setHard}>Hard</button>
      </div>
      </div>
      <div className='grid-wrapper'>
        <CardGrid
      cardGridRef={cardGridRef}
      setPairsTimed={setPairsTimed}
      setActiveTimer={setActiveTimer}
      activeTimer={activeTimer}
      setTimer={setTimer}
      />
      <div className="alert-container">
        <img src={logo} alt="logo"></img>
        <p className='game-end-text'></p>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
    </div>
  )
}

export default Timed