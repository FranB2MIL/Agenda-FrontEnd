import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  loggeado: boolean = false;

  aleatorio = Math.random()

  loggear(){
    this.loggeado = true;
  }

  desloggear(){
    this.loggeado = false;
  }
}