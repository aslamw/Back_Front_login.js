import  { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/register', { username, password });
      setMessage('User registered successfully');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Logged in successfully');
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <h1>Login/Register</h1>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
