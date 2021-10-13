import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Loader from './Loader';
import ContactForm from './ContactForm';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from 'rc-pagination';
import paginationLocale from 'rc-pagination/lib/locale/en_US';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchTitle: "",
      error: null,
      too_many_results: false,
      releaseYear: null,
      isLoading: false,
      totalMovies: 0,
      currentPage: 1,
      email: null,
      requested_movie_name: null,
      message: null,
      request_movie_errors: null,
      request_movie_status: null,
    }
    this.getMovies = this.getMovies.bind(this);
    this.handleRequestMovie = this.handleRequestMovie.bind(this);
    this.handleFormValues = this.handleFormValues.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  getMovies = async () => {

    if (this.state.searchTitle.length === 0) return;

    this.setState({
      isLoading: true
    });

    await axios.get(`${process.env.REACT_APP_BASE_API_URL}api/search`, {
      params: {
        s: this.state.searchTitle,
        y: this.state.releaseYear?.getFullYear(),
        page: this.state.currentPage
      }
    })
      .then(response => {

        if (response.data.error) {

          // Too many results error
          if (response.data.hasOwnProperty("too_many_results")) {
            this.setState({
              error: response.data.error,
              movies: [],
              totalMovies: 0,
              too_many_results: response.data.too_many_results
            })
          } else {
            // Something different occurred
            this.setState({
              error: response.data.error,
              movies: [],
              totalMovies: 0,
              too_many_results: false
            })
          }

        } else {

          this.setState({
            movies: response.data.movies,
            error: null,
            totalMovies: response.data.total_movies,
            too_many_results: false
          })

        }
      })
      .catch(console.log)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleRequestMovie = async () => {

    this.setState({
      isLoading: true
    });

    await axios.get("http://localhost:3000/api/contact", {
      params: {
        from: this.state.email,
        movie: this.state.requested_movie_name,
        message: this.state.message
      }
    })
      .then(response => {

        if (response.data.errors) {

          this.setState({
            request_movie_errors: response.data.errors,
          })

        } else {

          this.setState({
            error: null,
            request_movie_errors: null,
            request_movie_status: response.data.hasOwnProperty("messageId")
          })

        }
      })
      .catch(console.log)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleFormValues = async (key, value) => {
    let tempState = this.state;
    tempState[key] = value;
    this.setState(tempState);
  }

  handlePagination = async (page) => {
    await this.setState({
      currentPage: page
    })
    this.getMovies()
  }

  render() {

    if (this.state.isLoading) {
      return <Loader />
    }

    let movies = [];

    if (this.state.error != null) {
      movies = <ContactForm
        error={this.state.error}
        showForm={!this.state.too_many_results}
        request_movie_errors={this.state.request_movie_errors}
        handleFormValues={this.handleFormValues}
        handleRequestMovie={this.handleRequestMovie}
      />
    } else {
      movies = [];
    }

    if (this.state.movies.length) {
      movies = this.state.movies.map((movie, i) => {
        return <MovieCard
          key={i}
          id={movie.id}
          poster={movie.poster}
          title={movie.title}
          year={movie.year}
        />
      });
    }

    return <div className='row'>
      <div className='col-md-8 m-auto'>
        <div className='row pt-4 pb-4 search-bar'>
          <div className='col-md-7'>
            <input
              type='text'
              placeholder='Movie title'
              className='w-100 form-control'
              onChange={e => this.setState({ searchTitle: e.target.value })}
              onKeyUp={e => {
                if (e.key === "Enter") this.getMovies();
              }}
            />
          </div>
          <div className='col-md-3'>
            <ReactDatePicker
              selected={this.state.releaseYear}
              onChange={date => this.setState({ releaseYear: date })}
              showYearPicker
              dateFormat="yyyy"
              className="w-100 form-control"
              placeholderText="Release Year"
            />
          </div>
          <div className='col-md-2'>
            <button
              className='w-100 btn text-white btn-primary font-weight-bold'
              onClick={this.getMovies}
              disabled={this.state.isLoading}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='w-75 m-auto pt-5'>
        <div className='row'>
          {movies}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 20,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
          }}
        >
          <Pagination
            prevIcon={"Prev"}
            nextIcon={"Next"}
            jumpPrevIcon={"..."}
            jumpNextIcon={"..."}
            locale={paginationLocale}
            total={this.state.totalMovies}
            current={this.state.currentPage}
            onChange={this.handlePagination}
            className={"m-auto"}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </div>
  }
}
export default Home;