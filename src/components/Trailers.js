import React from 'react';
import axios from 'axios';
import MovieInfo from './MovieInfo'
import Videos from './Videos';
import NotFound from './NotFound';
import Loader from './Loader';
import ShareButtons from './ShareButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

class Trailers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isLoading: true,
      video: null
    }

    this.getMovie = this.getMovie.bind(this);
    this.handleIframes = this.handleIframes.bind(this);
  }

  componentDidMount = async () => {
    await this.getMovie();
  }

  getMovie = async () => {

    let id = this.props.match.params.imdbId;

    this.setState({
      isLoading: true
    });

    await axios.get(`${process.env.REACT_APP_BASE_API_URL}api/search/`, {
      params: {
        i: id
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data.error) {
          this.setState({
            error: response.data.error,
            movie: null
          })
        } else {
          this.setState({
            movie: response.data,
            error: null,
            video: response.data.videos[0],
          })
        }
      })
      .catch(console.error)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleIframes = (e) => {
    console.log("sdfsd");
    this.setState({
      video: JSON.parse(e.target.dataset.video)
    })
  }

  render() {

    if (this.state.isLoading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <NotFound />;
    }

    return <section>

      <Link to="/" className="go-home text-white btn-primary">
        <FontAwesomeIcon icon={Icons.faArrowLeft} size="1x" className="" />
        &nbsp;
        Home
      </Link>

      <ShareButtons />

      <div className='row'>
        <div className='col-md-9 m-auto'>
          
          <MovieInfo movie={this.state.movie} />

          <Videos
            movie={this.state.movie}
            video={this.state.video}
            handleIframes={this.handleIframes}
          />

        </div>
      </div>
    </section>
  }
}

export default Trailers;