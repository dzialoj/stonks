import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import DashboardPageComponent from './pages/dashboard/dashboard';
import Home from './pages/home/home';
import SignInPageComponent from './pages/sign-in/sign-in';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInPageComponent />} />
          <Route path='/home' element={<Home />}>
            <Route path='' element={<DashboardPageComponent />} />
            <Route path='search' element={<div>search</div>} />
          </Route>
          <Route path='*' element={<Navigate to='home' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
