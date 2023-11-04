import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
  <Routes>
    <Route element={<Home />}exact path="/" />
    {/* {<Route element={<About />}exact path="/about" />} */}
  </Routes>
  );
}

export default App;
