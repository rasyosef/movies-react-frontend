import Navbar from './Navbar';
import Home from './Home';
import MovieDetail from './MovieDetail';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import Login from './Login';
import Signup from './Signup';
import NotFound from './NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/signup' exact>
              <Signup />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/add' exact>
              <AddMovie />
            </Route>
            <Route path='/movies/:id' exact>
              <MovieDetail />
            </Route>
            <Route path='/movies/:id/edit' exact>
              <EditMovie />
            </Route>
            <Route path='/movies/:id/delete' exact>
              <DeleteMovie />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
