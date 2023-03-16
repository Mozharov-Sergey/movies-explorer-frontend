const ApiOptions = {
  filmbaseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  userUrl: 'https://api.mozharov.nomoredomains.work/api',
};

class MoviesApi {
  constructor(ApiOptions) {
    this._filmbaseUrl = ApiOptions.filmbaseUrl;
    this._userUrl = ApiOptions.userUrl;
    this._headers = ApiOptions.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  getAllFilms() {
    return fetch(this._filmbaseUrl, { method: 'GET' }).then((res) => this._checkResponse(res));
  }

  getSavedFilms() {
    const token = localStorage.getItem('token');
    return fetch(`${this._userUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  addToSavedMovies(item) {
    const token = localStorage.getItem('token');
    return fetch(`${this._userUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: item.id,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        director: item.director,
        country: item.country,
        year: item.year,
        duration: item.duration,
        description: item.description,
        image: `https://api.nomoreparties.co/${item.image.url}`,
        trailerLink: item.trailerLink,
        thumbnail: `${this._filmbaseUrl}${item.image.url}`,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  removeFromSavedMovies(item) {
    const token = localStorage.getItem('token');
    return fetch(`${this._userUrl}/movies/${item._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => this._checkResponse(res));
  }

  remove(item) {
    const token = localStorage.getItem('token');
    return fetch(`${this._userUrl}/movies/${item}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(ApiOptions);
export default moviesApi;
