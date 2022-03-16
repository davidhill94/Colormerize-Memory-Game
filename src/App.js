import './App.css';
import Home from './components/pages/Home/home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Timed from './components/pages/Timer/Timed';
import Lives from './components/pages/Lives/Lives';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="timer" element={<Timed />} />
          <Route path="lives" element={<Lives />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
