import { Router } from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';
import { celebrateBodyMovie, celebrateParamsMovieId } from '../validators/movies.js';

export const movieRouter = Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', celebrateBodyMovie, createMovie);
movieRouter.delete('/:_id', celebrateParamsMovieId, deleteMovie);
