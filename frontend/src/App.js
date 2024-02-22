import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Login from './Components/Login/login'
import SignUp from './Components/SignUp/SignUp';
import { SunMoon } from 'lucide-react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';

function App() {
  // create a darkTheme function to handle dark theme using createTheme
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className='mt-2 mr-2 flex justify-end'>
        <button className='bg-gray-500 rounded-full text-white px-2 py-2' onClick={toggleDarkMode}><SunMoon /></button>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/userdashboard" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;