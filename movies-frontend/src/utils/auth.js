const authOptions = {
  baseUrl: 'https://api.mozharov.nomoredomains.work/api',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

class Auth {
  constructor(authOptions) {
    this._baseUrl = authOptions.baseUrl;
    this._headers = authOptions.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  signup(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
        name: name,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getUserData() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  updateUserData(email, name) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then((res) => this._checkResponse(res));
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const authApi = new Auth(authOptions);
export default authApi;
