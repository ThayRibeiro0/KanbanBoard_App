import { jwtDecode } from 'jwt-decode';


// Define JwtPayload interface according to the structure of your JWT
interface JwtPayload {
  username: string;
  exp: number;
}

class AuthService {
  getProfile() {
    // Return the decoded token
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken;
    }
    return null;
  }

  loggedIn() {
    // Return a boolean indicating if the user is logged in
    const token = this.getToken();
    return !!token; // A simple check if the token exists
  }

  isTokenExpired(token: string) {
    // Check if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp) {
      const currentTime = new Date().getTime() / 1000;
      return decodedToken.exp < currentTime;
    }
    return false;
  }

  getToken(): string | null {
    // Return the token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string): void {
    // Set the token to localStorage and redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    // Remove the token from localStorage and redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
