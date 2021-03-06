import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

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

  borrarHeroe( id: string ){

    return this.http.delete(`${ this.url }/Heroes/${ id }.json`);

  }

  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/Heroes/${ id }.json`);

  }


  getHeroes(){
    return this.http.get(`${ this.url }/Heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( heroesObj: object ){

    const heroes: HeroeModel[] = [];

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );

    });

    if ( heroesObj === null ) { return []; }

    return heroes;
  }

}
