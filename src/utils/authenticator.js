class Auth {
  static isLoggedIn() {
    return !!sessionStorage.selectedAddress;
  }
  static getToken() {
    return sessionStorage.selectedAddress;
  }
  static login(jwt) {
    sessionStorage.setItem('selectedAddress', jwt);
  }

  static logOut() {
    sessionStorage.removeItem('selectedAddress');
  }
}

export default Auth;