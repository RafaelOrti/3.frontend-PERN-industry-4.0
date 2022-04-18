import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './Containers/Login/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
