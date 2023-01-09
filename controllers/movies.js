import { constants } from 'http2';
import { Movie } from '../models/movie.js';
import {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  errMessages,
} from '../errors/index.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(constants.HTTP_STATUS_OK).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(errMessages.movie.badRequest));
    } else {
      next(err);
    }
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new NotFoundError(errMessages.movie.notFound);
    } else if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(errMessages.movie.forbidden);
    } else {
      movie.remove();
      res.status(constants.HTTP_STATUS_OK).send(movie);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(errMessages.movie.badRequest));
    } else {
      next(err);
    }
  }
};
