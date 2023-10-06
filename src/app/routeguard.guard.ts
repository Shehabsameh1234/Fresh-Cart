import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeguardGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if (localStorage.getItem("userToken") == null) {
    _Router.navigate(['logIn'])
    return false
  } else {
    return true
  }
}







