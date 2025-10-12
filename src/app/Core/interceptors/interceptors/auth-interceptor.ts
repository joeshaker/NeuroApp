import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JwtService } from '../../services/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  // Skip auth header for auth-related requests
  const isAuthRequest = req.url.includes('/auth/') || 
                       req.url.includes('/login') || 
                       req.url.includes('/register');

  if (!isAuthRequest && jwtService.isAuthenticated()) {
    const token = jwtService.getToken();
    
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return next(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle 401 Unauthorized responses
          if (error.status === 401) {
            console.log('Token expired or invalid, redirecting to login');
            jwtService.clearAuth();
            router.navigate(['/auth/login']);
          }
          
          // Handle 403 Forbidden responses
          if (error.status === 403) {
            console.log('Access forbidden, redirecting to unauthorized page');
            router.navigate(['/unauthorized']);
          }
          
          return throwError(() => error);
        })
      );
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle errors for non-authenticated requests
      if (error.status === 401 && !isAuthRequest) {
        console.log('Authentication required, redirecting to login');
        jwtService.clearAuth();
        router.navigate(['/auth/login']);
      }
      
      return throwError(() => error);
    })
  );
};
