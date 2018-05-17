import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_REQUEST,
  GET_MOVIES_FAILURE,
  ADD_LIKE,
  REMOVE_LIKE,
  CHANGE_RATING,
  EDIT_MOVIE,
  RECEIVE_ACTORS,
  REMOVE_MOVIE,
} from './types';

export const fetchMovies = () => {
  const url = 'http://localhost:3001/movies';

  return axios.get(url);
}

const receiveMoviesSaga = function * (action) {
  try {
    const response = yield call(fetchMovies);
    yield put({ type: GET_MOVIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_MOVIES_FAILURE, payload: error });
  }
}

export const saga = function * () {
  yield takeEvery(GET_MOVIES_REQUEST, receiveMoviesSaga);
}

/*
export const receiveMovies = (payload) => ({
  type: GET_MOVIES,
  payload,
});

export const fetchMovies = () => {
  return (dispatch, state, api) => {
    api('movies')
      .then(response => {
        dispatch(receiveMovies(response.data));
      });
  };
};*/

export const addLike = (payload) => ({
  type: ADD_LIKE,
  payload,
});

export const removeLike = (payload) => ({
  type: REMOVE_LIKE,
  payload,
});

export const changeRating = (id, value) => ({
  type: CHANGE_RATING,
  id,
  value,
});

export const editMovie = (payload) => ({
  type: EDIT_MOVIE,
  payload,
});

export const receiveActors = (payload)=> ({
  type: RECEIVE_ACTORS,
  payload,
});

export const removeMovie = (payload)=> ({
  type: REMOVE_MOVIE,
  payload,
});

export const fetchActors = () => {
  return (dispatch, state, api) => {
    api('actors')
      .then(response => {
        dispatch(receiveActors(response.data));
      });
  };
};

export const updateMovie = (body) => {
  return (dispatch, state, api) => {
    api(`movies/${body.id}`, 'patch', body, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(editMovie(response.data));
      });
  };
};

export const fetchAddLike = (id) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    const updateMovie = { ...movie, likes: movie.likes + 1 };

    api(`movies/${id}`, 'patch', updateMovie, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(addLike(id));
      });
  };
};

export const fetchRemoveLike = (id) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    const updatedMovie = movie.likes === 0
      ? movie
      : { ...movie, likes: movie.likes - 1 };

    api(`movies/${id}`, 'patch', updatedMovie, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(removeLike(id));
      });
  };
};

export const updateRating = (id, value) => {
  return (dispatch, state, api) => {
    const movie = state().movies.movies.find(movie => movie.id === id);
    const updatedMovie = { ...movie, stars: value };

    api(`movies/${id}`, 'patch', updatedMovie, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(changeRating(id, value));
      });
  };
};

export const fetchRemoveMovie = (id) => {
  return (dispatch, state, api) => {
    api(`movies/${id}`, 'delete')
      .then(response => {
        dispatch(removeMovie(id));
      });
  };
};
