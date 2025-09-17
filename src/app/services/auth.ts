import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  token: null|string = null;

  async login(loginData: LoginData){
    const res = await fetch('https://agenda-api.somee.com/api/authentication/authenticate',
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
      }
    )
    if(res.ok){
      const resText = await res.text()
      this.token = resText;
    }
    return res.ok;
  }
  
}