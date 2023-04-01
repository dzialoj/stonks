import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import SignInPageComponent from './pages/sign-in/sign-in'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInPageComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
