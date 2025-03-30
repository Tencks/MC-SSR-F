import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUserInterface } from '../../interfaces/auth/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class  AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'user_data';
  private platformId = inject(PLATFORM_ID);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUserData());
  
  constructor(private http: HttpClient) { 
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (this.hasValidToken()){
      const userData = this.getCurrentUserData();
      if (userData){
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(userData);
      } else {
        this.logout();
      }
    }
  }


  register(userData: LoginUserInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.setTokens(response.token, response.refreshToken);
        this.setUserData(response.user); //tambien dudas acá ya que no estamos logiando
        this.isAuthenticatedSubject.next(true); //dudas respecto a esto!!!
        this.currentUserSubject.next(response.user); // dudoso su uso en el register!!!!
      })
    );
  }

  login(credentials: LoginUserInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response:any) =>{
        this.setTokens(response.token , response.refreshToken);
        this.setUserData(response.user);
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response.user);
        })
    );
  }

  //metodo para almacenar el user data
  private setUserData(user: any): void {
    this.setStorageItem(this.userKey, JSON.stringify(user));
  }

  //metodo para obtener el user data
  getCurrentUserData(): any {
    const userData = this.getStorageItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
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
    this.removeStorageItem(this.userKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return this.getStorageItem(this.tokenKey);
  }




}

