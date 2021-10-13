import React from 'react';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {

  render() {
    return <div className="border-0 movies-card card col-md-3 mt-2">
      <div className="card-content">
        <div className="card-poster">
          <div className="card-overlay">
            <Link
              to={{
                pathname: "/trailers/" + this.props.id,
                movie: this.props
              }}
              className="btn btn-sm btn-primary text-white text-center"
            >
              Show trailers
                        </Link>
          </div>
          <img
            className="card-img-top"
            src={this.props.poster === "N/A" ? "/unnamed.jpg" : this.props.poster}
            alt="movie poster"
          />
        </div>
        <div className="card-body p-0 pt-2">
          <h5 className="card-title">
            {this.props.title}
            <br />
            <span style={{ fontSize: "12px" }}>{this.props.year}</span>
          </h5>
        </div>
      </div>
    </div>
  }
}
export default MovieCard;