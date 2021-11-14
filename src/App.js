import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Activities from './pages/Activities';
import Food from './pages/Food';

function App() {
  return (
    <>
      <Router>
        <>
          <Navbar />
          <Banner />
          <Switch>
            <Route path="/f2e/attractions">
              <Attractions />
            </Route>
            <Route path="/f2e/activities">
              <Activities />
            </Route>
            <Route path="/f2e/food">
              <Food />
            </Route>
            <Route path="/f2e">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </>
      </Router>
    </>
  );
}

export default App;
