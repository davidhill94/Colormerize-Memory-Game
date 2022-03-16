import React from 'react';
import './Cards.css';
import CardCover from '../images/CardCover.png';

export default function Cards({ card, handleCardSelection, flipped, disabled, setActiveTimer, activeTimer  }) {

    const handleClick = () => {
        if(!disabled) {
            handleCardSelection(card);
        }
        if(activeTimer === false){
            setActiveTimer(true);
        }
    }
    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front'
                    alt="Front"
                    src={card.imgSrc} />
                <img
                    className='back'
                    alt="Back"
                    src={CardCover}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}
