
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element={<Home />}>  </Route>
      <Route path= '/chat' element={<Chat socket = {socket}/>}>  </Route> 
    </Routes>
    </BrowserRouter>
  )
}

export default App 



