import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Market from './pages/Market'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/Layout'


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      
      <div className="pages">
        <Routes>
        <Route element={<Layout />}>
          <Route 
            path="/Home" 
            element={<Home />} 
          />
          <Route 
            path="/" 
            element={<Market />} 
          />
          <Route 
            path="/Login" 
            element={<Login />} 
          />
          <Route 
            path="/Login2" 
            element={<AdminLogin />} 
          />
          <Route 
            path="/Admin" 
            element={<AdminDashboard />} 
          />
          </Route>
        </Routes>
      </div>

    </BrowserRouter>
  </div>
  );
}

export default App;
