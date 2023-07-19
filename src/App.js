import './App.css'
import './index.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/Home';
import MovieList from './components/movieList/movieList';
import Detail from './pages/movieDetail/detail';
import Search from './components/search/Search';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import FavouriteList from './components/favourite/favouriteList';






function App() {
  return (
    <div className='App'>

      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie/:id' element={<Detail />}></Route>
        <Route path='/movies/:type' element={<MovieList />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/like' element={<FavouriteList />}></Route>

      </Routes>



    </div>
  )
}



export default App;
