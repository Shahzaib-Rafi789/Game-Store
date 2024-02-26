import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GameCard from './GameCard';
import './AllGames.css';

export default function AllGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState('https://api.rawg.io/api/games?key=97e1630bef2548838b9a39c5c1faffa3');
  const [initialFetchDone, setInitialFetchDone] = useState(false); // Track if initial fetch has been done

  useEffect(() => {
    const loadGames = () => {
      setLoading(true);
      fetch(nextPageUrl)
        .then(response => response.json())
        .then(data => {
          setGames(prevGames => [...prevGames, ...data.results]);
          setLoading(false);
          setNextPageUrl(data.next);
          setInitialFetchDone(true); // Update initial fetch status
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    const handleScroll = () => {
        const documentHeight = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        const modifier = 200; // Adjust this value as needed
    
        if (currentScroll + modifier > documentHeight && !loading && nextPageUrl && initialFetchDone) {
            console.log("End reached");
            loadGames();
        }
      };

    if (!initialFetchDone) {
      // Load games for the initial fetch
      loadGames();
    } else {
      // Attach scroll event listener only after the initial fetch
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, nextPageUrl, initialFetchDone]);

  return (
    <div className='game-cards'>

     <Helmet>
        <title>Game Store | Your One-Stop Shop for Video Games</title>
        <meta name="description" content="Welcome to Game Store! Discover a wide selection of video games, consoles, and accessories at competitive prices." />
      </Helmet>

      {games.map((game, index) => (
        <GameCard gameData={game} key={index}/>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}
