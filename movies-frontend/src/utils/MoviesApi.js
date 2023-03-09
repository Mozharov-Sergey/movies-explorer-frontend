const ApiOptions = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

class MoviesApi {
  constructor(ApiOptions) {
    this._baseUrl = ApiOptions.baseUrl;
    this._headers = ApiOptions.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  getAllFilms() {
    return fetch(this._baseUrl, { method: 'GET' }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(ApiOptions);
export default moviesApi;
