import React, { useState, useEffect } from 'react';
import './CardGrid.css';
import Cards from './Cards';
import ColorOne from '../images/ColorOne.png';
import ColorTwo from '../images/ColorTwo.png';
import ColorThree from '../images/ColorThree.png';
import ColorFour from '../images/ColorFour.png';
import ColorFive from '../images/ColorFive.png';
import ColorSix from '../images/ColorSix.png';
import ColorSeven from '../images/ColorSeven.png';
import ColorEight from '../images/ColorEight.png';

const cardData = [
  { imgSrc: ColorOne, matched: false },
  { imgSrc: ColorTwo, matched: false  },
  { imgSrc: ColorThree, matched: false  },
  { imgSrc: ColorFour, matched: false  },
  { imgSrc: ColorFive, matched: false  },
  { imgSrc: ColorSix, matched: false  },
  { imgSrc: ColorSeven, matched: false  },
  { imgSrc: ColorEight, matched: false  }
];

const CardGrid = ({setPairsLives, setLives, cardGridRef, setPairsTimed, setActiveTimer, activeTimer, setTimer}) => {

    useEffect(() => {
        cardGridRef.current = randomizeCards
      }, [])

  const [cards, setCards] = useState([]);
  const [firstClick, setFirstClick] = useState(null);
  const [secondClick, setSecondClick] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //randomize cards
  const randomizeCards = () => {
    const randomizedCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setFirstClick(null);
    setSecondClick(null);
    setCards(randomizedCards);
    if(document.querySelector(".easy-btn").classList.contains("active")){
        if(setLives) {
          setLives(15)
        }
    } else if (document.querySelector(".medium-btn").classList.contains("active")) {
      if(setLives) {
        setLives(10)
      }
    } else if (document.querySelector(".hard-btn").classList.contains("active")) {
      if(setLives) {
        setLives(6)
      }
    }
  }

  //handling card selection
  const handleCardSelection = (card) => {
    firstClick ? setSecondClick(card) : setFirstClick(card);
  }

  //Checking selected cards
  useEffect(() => {
    if (firstClick && secondClick) {
      setDisabled(true)
      if(firstClick.imgSrc === secondClick.imgSrc){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.imgSrc === firstClick.imgSrc) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        if(setPairsLives) {
          setPairsLives(prevPairs => prevPairs + 1)
        };
        if(setPairsTimed){
          setPairsTimed(prevPairs => prevPairs + 1);
        }
        setFirstClick(null)
        setSecondClick(null)
        setDisabled(false)
      } else {
        setTimeout(() => reset(), 1000)
      }
    }
  }, [firstClick, secondClick])

  //Updates Lives & Resets Clicks
  const reset = () => {
    setFirstClick(null)
    setSecondClick(null)
    if(setLives){
      setLives(prevLives => prevLives - 1)
    }
    setDisabled(false)
  }

  //Starts new game on page load
  useEffect(() => {
    randomizeCards()
  }, [])

  return (
      <div className='grid'>
        {cards.map(card => (
          <div className='card-container' key={card.id}>
            <Cards
            key={card.id} 
            card={card}
            handleCardSelection={handleCardSelection} 
            flipped={card === firstClick || card === secondClick || card.matched}
            disabled={disabled}
            setActiveTimer={setActiveTimer}
            activeTimer={activeTimer}
            />
          </div>
        ))}
      </div>
  );
}

export default CardGrid