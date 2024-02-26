
import './App.css';
import AllGames from './AllGames';
import Icon from './assets/icon_undertale.png';

function App() {
  return (
    <div>
      <header className='heading'>GAME ST<img className='heading-icon' src={Icon} alt='Logo' />RE</header>
      <AllGames></AllGames>
    </div>
  );
}

export default App;
