import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {


  miFormulario: FormGroup = this.fb.group({
    nombre:    ['Fabio', [ Validators.required ] ],
    apellido:   ['Aoad', [ Validators.required ] ],
    dni:   ['35286916', [ Validators.required, Validators.pattern('^[0-9]{8,30}$') ] ],
    direccion:   ['chazarreta', [ Validators.required ] ],
    celular:   ['54385306428', [ Validators.required, Validators.minLength(11) ] ],
    rol:   ['EMPLEADO_ROLE', [ Validators.required ] ],
    fechaNac:   ['', [ Validators.required ] ],
    correo:   ['test1@test.com', [ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor( private  fb: FormBuilder,
               private router: Router,
               private authService: AuthService) { }


  registro(){
   // console.log(this.miFormulario.value);
   // console.log(this.miFormulario.valid);

    const { nombre,
            apellido,
            dni,
            direccion,
            celular,
            rol,
            fechaNac,
            correo,
            password } = this.miFormulario.value;

    this.authService.registro(nombre,
                              apellido,
                              dni,
                              direccion,
                              celular,
                              rol,
                              fechaNac,
                              correo,
                              password)
      .subscribe( resp  => {
        //console.log('imprimo ok:', resp.ok);
        if( resp.ok === true ){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', resp.errors,'error');
        }
      });
  }



}
