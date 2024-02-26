import React, { useState } from 'react';
import './GameCard.css';
import PC from './assets/windows.png';
import MAC from './assets/apple.png';
import Playstation from './assets/playstation.png';
import Xbox from './assets/xbox.png';
import Nintendo from './assets/nintendo-switch.png';
import Linux from './assets/linux.png';
import Exceptional from './assets/exceptional.png';
import Recommended from './assets/Ok.png';
import Skip from './assets/skip.png';
import Meh from "./assets/meh.png";
import Add from './assets/add.png';
import Tick from './assets/tick.png';

const GameLogos = {
  "PC": PC,
  "PlayStation": Playstation,
  "Xbox": Xbox,
  "Nintendo": Nintendo,
  "Apple Macintosh": MAC,
  "Linux": Linux
};

const RatingLogos = {
    "exceptional": Exceptional,
    "recommended": Recommended,
    "meh": Meh,
    "skip": Skip
};

export default function GameCard({ gameData }) {

    const [hasPlayed, setHasPlayed] = useState(false);
    const [hovered, setHovered] = useState(false);

    const getLogosByPlatforms = () => {
        if (!gameData) {
            return [];
        }

        const logosList = [];
        gameData.parent_platforms.forEach(platform => {
            const logo = GameLogos[platform.platform.name];
            if (logo) {
                logosList.push(logo);
            }
        });
        return logosList;
    };

    const getRatingLogo = () => {
        if (!gameData) {
            return [];
        }

        const maxRating = gameData.ratings.reduce((max, rating) => rating.count > max.count ? rating : max);
        const titleOfMaxRating = maxRating.title;
        return RatingLogos[titleOfMaxRating];
    };

    const changeHasPlayedStatus = () => {
        setHasPlayed(!hasPlayed);
    }

    const logosList = getLogosByPlatforms();

    return (
        <div className='game-card' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <img src={gameData.background_image} alt={gameData.name} className="game-image" />

            <div className='game-info'>
                <div className="logos-and-score">
                    <div className="platform-logos">
                        {logosList.map((logo, index) => (
                            <img src={logo} alt="Gaming Platforms" key={index} className="game-card-icon" />
                        ))}
                    </div>
                    {gameData.metacritic && <div className={`score ${gameData.metacritic <= 30 ? 'red' : gameData.metacritic <= 70 ? 'yellow' : 'green'}`}>
                        {gameData.metacritic}
                    </div>}

                </div>

                <h2 className='game-name'>{gameData.name}<img className='rating' src={getRatingLogo()} alt="Rating Logo" /> </h2>

                <button className='game-button' style={{backgroundColor :  hasPlayed ? '#6dc849' : ''}} onClick={changeHasPlayedStatus}>
                    <img className='game-card-icon' src={hasPlayed ? Tick : Add} alt={hasPlayed ? 'Tick' : 'Add'} />
                    {gameData.ratings_count}
                </button>
                            
                {hovered && (
                <div className='game-data-hidden-info'>
                    <p style={{color: '#595959'}}>Release Date:</p>
                    <p>{gameData.released}</p>
                </div>)}

                {hovered && ( <hr className="hr-line" style={{margin: '0px'}}/> )}
                
                {hovered && (
                <div className='game-data-hidden-info'>
                    <p style={{color: '#595959'}}>Genres:</p>
                    <div className="genre-container">
                        {gameData.genres.map((genre, index) => (
                            <span key={index} className="genre-item">
                                {genre.name}
                                {index < gameData.genres.length - 1 && ','}
                            </span>
                        ))}
                    </div>
                </div>)}
            </div>
        </div>
    );
}
