import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import Logout from './Components/logout'
import Home from './Components/Home'
import Login from './Components/Login/login'
import SignUp from './Components/SignUp/SignUp';
// import ReadUser from './Components/ReadUser';
// import UpdateUser from './UpdateUser'

function App() {

  return (
    <div>
      {/* <Login/> */}
      {/* <SignUp/> */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/" element={<Logout/>} />
        <Route path="/userdashboard" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/readuser/:id" element={<ReadUser />} /> */}
        {/* <Route path="/updateuser/:id" element={<UpdateUser />} /> */}
        
      </Routes>
      {/* <ReadUser/>  */}
      {/* <UpdateUser/> */}
    </div>
  );
}

export default App;