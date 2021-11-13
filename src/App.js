import './App.css';
import Navbar from './components/Navbar';
import banner from './images/banner.png';

function App() {
  return (
    <>
      <Navbar />
      <div className="banner">
        <img src={banner} />
        <img src={banner} />
        <img src={banner} />
        <img src={banner} />
      </div>
    </>
  );
}

export default App;
