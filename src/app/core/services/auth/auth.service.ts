import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUserInterface } from '../../interfaces/auth/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  private platformId = inject(PLATFORM_ID)
  
  constructor(private http: HttpClient) { }


  register(userData: LoginUserInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.setTokens(response.token, response.refreshToken);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  login(credentials: LoginUserInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response:any) =>{
        this.setTokens(response.token , response.refreshToken);
        this.isAuthenticatedSubject.next(true);
        })
    );
  }

  refreshToken(): Observable<any>{
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return this.http.post(`${this.apiUrl}/refresh-token`, {
      refreshToken}).pipe(
        tap((response:any) => {
          this.setStorageItem(this.tokenKey, response.token);
        })
      );
  }

  private setTokens(token:string, refreshToken:string): void{
    this.setStorageItem(this.tokenKey, token);
    this.setStorageItem(this.refreshTokenKey, refreshToken);
  }

  private hasValidToken(): boolean {
    const token = this.getStorageItem(this.tokenKey);
    return !!token;
  }

  private setStorageItem(key: string, value:string):void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.setItem(key, value);
    }
    //si estamos en el server, no guardamos el localStorage
  }

  private getStorageItem(key:string): string | null {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem(key);
    }
    return null; // en server return null
  }

  private removeStorageItem(key:string) : void {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem(key);
    }
  }

  logout(): void {
    this.removeStorageItem(this.tokenKey);
    this.removeStorageItem(this.refreshTokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return this.getStorageItem(this.tokenKey);
  }




}

