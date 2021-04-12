import axios from 'axios';

export function isAuthenticated() {
  let token;
  if (window.localStorage) {
    if (
      window.localStorage.getItem('jwt') &&
            window.localStorage.getItem('jwt-expire') > Date.now()
    ) {
      token = window.localStorage.getItem('jwt');
    } else {
      token = '';
    }
  } else {
    token = '';
  }
  return token;
}

export function currentEmail() {
  const token = window.localStorage.getItem('jwt');
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload).email;
}

export async function login(userInfo) {
  const {
    email,
    password
  } = userInfo;

  return axios.post('/api/login', {
    email,
    password
  }).then((res) => {
    if (res.data.token) {
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('jwt-expire', Date.now() + 2 * 60 * 60 * 1000);
    }
    return res;
  });
}

export async function register(userInfo) {
  const {
    username,
    email,
    password,
    name,
    major
  } = userInfo;

  return axios.post('/api/register', {
    username,
    email,
    password,
    name,
    major
  }).then(res => {
    if (res.data.token) {
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('jwt-expire', Date.now() + 2 * 60 * 60 * 1000);
    }
    return res;
  });
}

export async function checkUniqueUsername(username) {
  return axios.post('/api/checkUniqueUsername', {
    username
  }).then(res => {
    return res;
  });
}

export async function checkUniqueEmail(email) {
  return axios.post('/api/checkUniqueEmail', {
    email
  }).then(res => {
    return res;
  });
}
