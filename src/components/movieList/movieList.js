import React, { useEffect, useState } from 'react'
import './movieList.css'
import { useParams } from 'react-router-dom'
import Card from '../card/Card';
import { Pagination } from 'react-materialize';
import Search from '../search/Search';


export default function MovieList() {

    const {type} =useParams();


    const [movieList, setMovieList] = useState([]);


    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`)
        .then(response => response.json())
        .then((data) => {
            setMovieList(data.results);
        })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    


  return (
    <div className='movie__list'>
        <h2 className='list__title'>{(type ? type : "now_playing").toUpperCase()}</h2>
        {/* <Search movieList ={movieList} /> */}
        <div className='list__cards'>
            {movieList.map(movieL => (
                <div key={movieL.id}>
                <Card movie={movieL} />
               {/* <Search movie={movieL}/> */}
               </div>
            ))}
        </div>
       
    </div>
  )
}
