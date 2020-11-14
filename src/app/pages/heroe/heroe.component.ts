import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private herosService: HeroesService ) { }

  ngOnInit(): void {
  }

 guardar( form: NgForm ){

    if( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    const Swal = require('sweetalert2')

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.herosService.actualizarHeroe( this.heroe );

    } else {
      peticion = this.herosService.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp =>{

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        type: 'success'
      });
      
    });

  }

}
