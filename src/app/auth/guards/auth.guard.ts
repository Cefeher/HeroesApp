import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.userVerify()
      .pipe(
        tap((verify) => {
          if (!verify) {
            this.router.navigate(['./auth/login'])
          }
        })
      )

    // if (this.authService.auth.id) {
    //   return true
    // }
    // console.log('Bloqueado(canActivated)');
    // return false;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.userVerify()
      .pipe(
        tap((verify) => {
          if (!verify) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
    // if (this.authService.auth.id) {
    //   return true
    // }
    // console.log('Bloqueado(canLoad)');


    // return false;
  }
}
