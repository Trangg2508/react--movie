import React, { useEffect, useState } from 'react'
import './detail.css'
import { Link, useParams } from 'react-router-dom'
import { Alert, Box, Button, Grid, Snackbar } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper";
import Reviews from '../../components/reviews/Reviews';
import { addToList, removeFromList } from '../../components/favourite/handleFavourite';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Detail() {

  const getDataReview = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  };
  useEffect(() => {
    getDataReview();

    window.scrollTo(5, 0)
  }, []);

  const [user, setUser] = useState("");

  const { id } = useParams();
  const [currentDetailMovie, setCurrentDetailMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const listFavourite = useSelector((state) => state.favourite.likeItem);


  // get MOVIE by ID
  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [id]);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(response => response.json())
      .then((data) => {
        setCurrentDetailMovie(data);
      })
  };


  // get CASTS of the movie 
  useEffect(() => {
    fetch(`http://api.themoviedb.org/3/movie/${id}/casts?api_key=e9e9d8da18ae29fc430845952232787c`)
      .then(response => response.json())
      .then((data) => {
        setCasts(data.cast);
        // console.log(data.cast);
      })
  }, [id]);

  // get TRAILER of movie
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`)
      .then(response => response.json())
      .then((data) => {
        setTrailer(data.results);
        // console.log(data.cast);
      })
  }, [id])

  // get REVIEW of movie
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e9e9d8da18ae29fc430845952232787c`)
      .then(response => response.json())
      .then((data) => {
        setReviews(data.results);
        // console.log(data.cast);
      })
  }, [id])



  //get SIMILAR kind of movie of each movie by id
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`)
      .then(response => response.json())
      .then((data) => {
        setSimilars(data.results);
        // console.log(data.cast);
      })
  }, [id]);


  const handleLike = (movie) => {
    dispatch(addToList(movie));
    console.log('Movie added to list successfully:', movie);

  }
  const handleRemove = movie => {
    dispatch(removeFromList(movie.id));
    console.log('Removed from like list successfully:', movie);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCombinedClick = (data) => {
    handleLike(data);
    handleClick();
  };

  return (
    <div className='detailMovie' >
      <div className='detailMovie__intro'>

        <img className="detailMovie__backdrop" src={`https://image.tmdb.org/t/p/original/${currentDetailMovie ? currentDetailMovie.backdrop_path : ""}`} />

        <div className='detailMovie__detail'>
          <div className='detailMovie__detailLeft'>
            {/* <div className='detailMovie_posterBox'> */}
            <img className='detailMovie_poster' src={`https://image.tmdb.org/t/p/original/${currentDetailMovie ? currentDetailMovie.poster_path : ""}`} />
            {/* </div> */}
          </div>
          <div className='detailMovie__detailRight'>
            <div className='detailMovie_detailRightTop'>
              <div className='detailMovie__name'>{currentDetailMovie ? currentDetailMovie.name : ""}</div>
              <div className='detailMovie__tagline'>{currentDetailMovie ? currentDetailMovie.tagline : ""}</div>
              <div className='detailMovie__rating'>
                {currentDetailMovie ? currentDetailMovie.vote_average : ""} <i class="fas fa-star" />
                <span className='detailMovie.voteCount'>{currentDetailMovie ? currentDetailMovie.vote_count : ""}</span>
              </div>
              <div className='detailMovie__runtime'>{currentDetailMovie ? currentDetailMovie.runtime : ""}</div>
              <div className='detailMovie__releaseDate'>{currentDetailMovie ? currentDetailMovie.release_date : ""}</div>
              <div className='detailMovie__genres'>
                {currentDetailMovie && currentDetailMovie.genres
                  ?
                  currentDetailMovie.genres.map(genre => (
                    <span className="detailMovie__genre" id={genre.id}>{genre.name}</span>
                  ))
                  :
                  ""
                }
              </div>


            </div>
            <div className='detailMovie__detailRightBottom'>
              <div className='summaryText'>Summary</div>
              <div>{currentDetailMovie ? currentDetailMovie.overview : ""}</div>
            </div>

            {listFavourite.find(liked => liked.id === currentDetailMovie.id) ? (

              <Button
                variant="outlined"
                color="error"
                style={{
                  borderColor: 'red',
                  color: 'white',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    borderColor: 'red',
                    color: 'white',
                  },
                }}
                onClick={() => handleRemove(currentDetailMovie)}
              >
                Remove from watchlist <FavoriteIcon className="heart-icon filled" />
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  borderColor: 'red',
                  color: 'white',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    borderColor: 'red',
                    color: 'white',
                  },
                }}
                onClick={() => handleCombinedClick(currentDetailMovie)}
              >
                Add to watchlist <FavoriteBorderIcon className="heart-icon outlined" />
              </Button>
            )}

          </div>

        </div>


        <div className='detailMovie__cast' style={{ marginTop: '-13em' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }} >TOP CASTS</h2>

          <Swiper
            slidesPerView={8}
            spaceBetween={5}
            freeMode={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            {casts ? casts.map((cast, index) => (

              <SwiperSlide key={index}>
                {cast.profile_path ? (

                  <div> <img className='detailMovie_castImg' src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} /></div>
                ) : (
                  <div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></div>
                )}
                <div style={{ fontSize: '1em', fontWeight: 'bold', textAlign: 'center', marginTop: '1em' }} className='detailMovie_castName'>{cast.name}</div>


              </SwiperSlide>


            )) : ""}
          </Swiper>
        </div>


        <div className='detailMovie__trailer'>
          {trailer && trailer.length > 0 && (
            <>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>TRAILERS</h2>
              {trailer.slice(0, 3).map((trailerMovie, index) => (
                <div className="modal-content" key={index}>
                  <p>
                    <iframe
                      width="100%"
                      height="700px"
                      src={`https://www.youtube.com/embed/${trailerMovie.key}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </p>
                </div>
              ))}
            </>
          )}
        </div>


        <div className='detailMovie__reviewWrapper'>
          {reviews && reviews.length > 0 && (
            <>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>REVIEWS</h2>
              {reviews.slice(0, 3).map(review => (

                <div className='detailMovie__review' key={review.id}>
                  {review.author_details.avatar_path ? (
                    <img
                      className='detailMovie_reviewImg'
                      src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                    />
                  ) : (
                    <div className='detailMovie_reviewImg__2' style={{ backgroundColor: 'black' }}></div>
                  )}
                  <div className='detailMovie__reviewName'>{review.author}</div>
                  <div className='detailMovie__reviewContent'>
                    {review.content.slice(0, 300)}
                    {/* <span><Link to={review.url}>See more</Link></span> */}
                  </div>

                </div>
              ))}
            </>
          )}
        </div>
        <div>
        </div>
        {user && (
          <div className='detailMovie__review' key={user.id}>
            <img className='detailMovie_reviewImg' src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' />
            {/* <span>{user.username}</span> */}
            <div className='detailMovie__reviewName'>{user.username}</div>
            <div className='detailMovie__reviewContent'>


              <div >{user.reviews}</div>

            </div>
          </div>
        )

        }
        <Reviews />



        <div className='detailMovie__similar'>
          {similars && similars.length > 0 ?
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }} >SIMILARS</h2>
            : ""}
          <Swiper
            slidesPerView={5}
            spaceBetween={5}
            freeMode={true}
            autoplay={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {similars ? similars.map(similar => (
              <SwiperSlide>
                {/* <img className='detailMovie_similarPoster' src={`https://image.tmdb.org/t/p/original/${similar ? similar.poster_path : ""}`}/> */}
                <Link to={`/movie/${similar.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  <div className='cardsSimilar'>
                    <img src={`https://image.tmdb.org/t/p/original/${similar ? similar.poster_path : ""}`} />
                    <div className='cardSimilar__overlay'>
                      <div className='cardSimilar__title'>{similar ? similar.original_title : ""}</div>
                      <div className='cardSimilar__runtime'>
                        {similar ? similar.release_date : ""}
                        <span className='cardSimilar__rating'>
                          {similar ? similar.vote_average : ""}
                          <i className='fas fa-star' />{""}
                        </span>
                      </div>
                      <div className='cardSimilar__description'>{similar ? similar.overview.slice(0, 100) + "..." : ""}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
              : ""}

          </Swiper>

        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Add to watch list successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}
