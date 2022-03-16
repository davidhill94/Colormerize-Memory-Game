import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from '../../../images/logo.png';

const Home = () => {
    return (
        <div className='home-container'>
            <img src={logo} alt="logo"></img>
            <div className='button-container'>
                <p>Choose your game</p>
                <div className='buttons'>
                    <Link to='/lives'>
                        <button>Lives</button>
                    </Link>
                    <Link to='/timer'>
                        <button>Timed</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home