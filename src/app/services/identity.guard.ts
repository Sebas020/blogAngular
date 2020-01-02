import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
//Guard para hacer validación de que el usuario esté registrado para poder ingresar a las diferentes partes de la aplicación que necesitan un logueo dentro de ellas, se le implementa a cada una de las rutas que lo necesiten
@Injectable()
export class IdentityGuard implements CanActivate{

	constructor(
		private _router: Router,
		private _userService: UserService
	){}

	canActivate(){
		let identity = this._userService.getIdenity();

		if(identity){
			return true;
		}else{
			this._router.navigate(['error']);
			return false;
		}
	}
}