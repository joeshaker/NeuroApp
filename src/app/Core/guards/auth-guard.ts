import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  // Check if user is authenticated (has valid, non-expired token)
  if (!jwtService.isAuthenticated()) {
    console.log('User not authenticated, redirecting to login');
    router.navigate(['/auth/login']);
    return false;
  }

  // Check if route requires specific roles
  const requiredRoles = route.data?.['roles'] as string[];
  
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = jwtService.getUserRole();
    
    if (!userRole) {
      console.log('No user role found, redirecting to login');
      router.navigate(['/auth/login']);
      return false;
    }

    // Check if user has any of the required roles
    if (!jwtService.hasAnyRole(requiredRoles)) {
      console.log(`User role '${userRole}' not authorized for roles: ${requiredRoles.join(', ')}`);
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
};
