import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroesapp-12cb1.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ){

    return this.http.post(`${ this.url }/Heroes.json`, heroe)
          .pipe(
            map( (resp: any) =>{
                heroe.id = resp.name;
                return heroe;
            } )
          );

  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/Heroes/${ heroe.id }.json`, heroeTemp);
  }

}
