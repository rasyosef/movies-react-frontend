import Navbar from './Navbar';
import Home from './Home';
import MovieDetail from './MovieDetail';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}/>
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/add' element={ <PrivateRoute><AddMovie /></PrivateRoute> } />
            <Route path='/movies/:id' element={ <PrivateRoute><MovieDetail /></PrivateRoute> } />
            <Route path='/movies/:id/edit' element={ <PrivateRoute><EditMovie /></PrivateRoute>} />
            <Route path='/movies/:id/delete' element={ <PrivateRoute><DeleteMovie /></PrivateRoute> } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
