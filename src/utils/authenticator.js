class Auth {
  static isLoggedIn() {
    return !!localStorage.jwt;
  }
  static getToken() {
    return localStorage.jwt;
  }
  static login(jwt) {
    localStorage.setItem('jwt', jwt);
  }

  static logOut() {
    localStorage.removeItem('jwt');
  }
}

export default Auth;