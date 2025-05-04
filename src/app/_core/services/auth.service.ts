import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';


export interface User {
  userId: number;
  typeUserId: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return this.http.post(`${this.apiUrl}login/access-token`,  formData ).pipe(
      tap((response: any) => {
        console.log(response);
        if (response.access_token) {
          this.logout()
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/signup`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
   
  }
  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    try {
      // JWT token is made of 3 parts: header.payload.signature
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        console.error('Invalid JWT token format');
        return null;
      }

      // Get the payload (middle part) and decode it
      const payload = parts[1];
      const decodedPayload = this.base64UrlDecode(payload);
      
      // Parse the JSON string into an object
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
    /**
   * Decode base64Url string to normal string
   * @param base64Url Base64Url encoded string
   * @returns Decoded string
   */
    private base64UrlDecode(base64Url: string): string {
      // Convert base64url to regular base64 by replacing characters
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Pad with '=' if needed
      const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      
      // Decode base64 to string
      return decodeURIComponent(atob(paddedBase64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''));
    }
    getTokenClaims(): any {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      const decodedToken = this.decodeToken(token);
      return decodedToken ? <User>{
        userId: decodedToken.sub,
        typeUserId: decodedToken.user_id,
        role: decodedToken.role
      } : null;
    }
    isTokenExpired(token: string): boolean {
      const decodedToken = this.decodeToken(token);
      
      if (!decodedToken || !decodedToken.exp) {
        return true; // Consider invalid tokens as expired
      }
      
      // exp is in seconds, Date.now() is in milliseconds
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      
      return expirationDate.valueOf() <= Date.now();
    }
} 
