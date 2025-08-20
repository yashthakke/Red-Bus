import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Navbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';

import { RedBus } from './Components/RedBus';
import { Game } from './Components/Game';
import { Uploadimg } from './assets/Uploadimg';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeList } from './Components/EmployeeList';
import { Signup } from './Components/Register/Signup';
import { Login } from './Components/Register/Login';
import { Company } from './Components/Company';
import { CompLogin } from './CompLogin';
import { CompnayHome } from './CompnayHome';
import { AdminLogin } from './AdminLogin';
import { AdminDashboar } from './assets/AdminDashboar';
import { Companyregistration } from './Components/Request/Companyregistration';
import { UploadLogo } from './Company/UploadLogo';
import { Addbus } from './Company/Addbus';
import { ViewBus } from './Company/ViewBus';
import { CompanyLogo } from './Company/CompanyLogo';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navbar />

        <Routes>





          <Route path='signup' element={<Signup />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='img' element={<Uploadimg />} />
          <Route path='comp' element={<Company />}></Route>
          <Route path='complgn' element={<CompLogin />}></Route>
          <Route path='cmphome' element={<CompnayHome />}></Route>
          <Route path='admin' element={<AdminLogin />}></Route>
          <Route path='adminHome' element={<AdminDashboar />}></Route>
          <Route path='comppending' element={<Companyregistration />}></Route>
          <Route path='uploadLogo' element={<UploadLogo />}></Route>
          <Route path='addbus' element={<Addbus />}></Route>
          <Route path='viewbus' element={<ViewBus />}></Route>
          <Route path='viewlogo' element={<CompanyLogo />}></Route>






          <Route path='Redbus' element={<RedBus />} />




        </Routes>
      </div>
    </>
  );
}

export default App;


// <Route path='emps' element={<EmployeeForm/>}></Route>
//           <Route path='lists' element = {<EmployeeList/>}></Route>x