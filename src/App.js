import './App.css'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import SearchInput from './components/SearchInput'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={PopularMovies} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/search" component={SearchInput} />
    </Switch>
  </>
)
export default App
