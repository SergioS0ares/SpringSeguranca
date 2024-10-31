import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAutenticado: boolean = this.getAuthStatus();
  isAdmin: boolean = this.getAdminStatus();
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.get(`${this.baseUrl}/user`, { headers }).pipe(
      map(() => {
        // Sucesso na autenticação
        this.setAuthState(true, username === 'admin');
        return true;
      }),
      catchError((error) => {
        // Em caso de erro, retorna falso
        console.error('Login failed:', error);
        this.setAuthState(false, false);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.setAuthState(false, false);
    this.router.navigate(['/']);
  }

  private setAuthState(authStatus: boolean, adminStatus: boolean): void {
    this.isAutenticado = authStatus;
    this.isAdmin = adminStatus;
    localStorage.setItem('authStatus', JSON.stringify(authStatus));
    localStorage.setItem('adminStatus', JSON.stringify(adminStatus));
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  private getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('adminStatus') || 'false');
  }
}
