import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons"

class MovieInfo extends React.Component {

  render() {
    return <section>
      <div className='row pt-4 pb-4 search-bar'>
        <div className='col-md-12'>
          <p className="text-center text-light m-0 font-weight-bold movie-preview-title">
            {this.props.movie.title}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12 movie-info">
              <img
                className="movie-info-poster"
                src={this.props.movie.poster === "N/A" ? "/unnamed.jpg" : this.props.movie.poster}
                alt="movie poster"
              />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <p className="movie-info text-center text-white font-weight-bold">
                <FontAwesomeIcon icon={Icons.faStarHalfAlt} size="2x" className="pb-2 d-block m-auto" />
                {this.props.movie.rating}
              </p>
            </div>
            <div className="col-md-4">
              <p className="movie-info text-center text-white font-weight-bold">
                <FontAwesomeIcon icon={Icons.faClock} size="2x" className="pb-2 d-block m-auto" />
                {this.props.movie.runtime}
              </p>
            </div>
            <div className="col-md-4">
              <p className="movie-info text-center text-white font-weight-bold">
                <FontAwesomeIcon icon={Icons.faCalendarAlt} size="2x" className="pb-2 d-block m-auto" />
                {this.props.movie.released}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="movie-info p-4 mt-0 text-left text-white font-weight-bold" style={{ fontSize: "15px" }}>
                {this.props.movie.plot}
                <span className="d-block mt-2" style={{ fontSize: "15px" }}>Genre: {this.props.movie.genre}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default MovieInfo;