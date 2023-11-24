import Navbar from './Navbar';
import Home from './Home';
import MovieDetail from './MovieDetail';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
