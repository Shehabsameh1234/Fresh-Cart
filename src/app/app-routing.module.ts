import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { LogInComponent } from './log-in/log-in.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { routeguardGuard } from './routeguard.guard';

const routes: Routes = [
  {path:"home",canActivate:[routeguardGuard],component:HomeComponent},
  {path:"cart",canActivate:[routeguardGuard],component:CartComponent},
  {path:"products",canActivate:[routeguardGuard],component:ProductsComponent},
  {path:"categories",canActivate:[routeguardGuard],component:CategoriesComponent},
  {path:"brands",canActivate:[routeguardGuard],component:BrandsComponent},
  {path:"logIn",component:LogInComponent},
  {path:"register",component:RegisterComponent},
  {path:"forgetPassword",component:ForgetPasswordComponent},
  {path:"**",canActivate:[routeguardGuard],component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
