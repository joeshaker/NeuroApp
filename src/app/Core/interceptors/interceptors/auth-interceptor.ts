import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JwtService } from '../../services/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  // ✅ Skip auth header for login/register/otp endpoints
  const isAuthRequest = /\/api\/auth\//i.test(req.url) ||
                        req.url.includes('/login') ||
                        req.url.includes('/register') ||
                        req.url.includes('/verify-otp');

  const token = jwtService.getToken();

  // ✅ Attach Authorization header if token exists
  const clonedReq = (!isAuthRequest && token)
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('⛔ Token expired or invalid — redirecting to login');
        jwtService.clearAuth();
        router.navigate(['/auth/login']);
      }
      else if (error.status === 403) {
        console.warn('🚫 Access forbidden — redirecting to unauthorized page');
        router.navigate(['/unauthorized']);
      }


      return throwError(() => error);
    })
  );
};
