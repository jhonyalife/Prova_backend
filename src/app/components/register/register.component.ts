import { HttpHeaders } from '@angular/common/http';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public usuario = '';
  public senha = '';
  public confirmar_senha = '';

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public register(): void {
    if (this.senha != this.confirmar_senha) {
      this.toastr.warning('Atenção! As senhas não coincidem')
    } else {
      this.apiService.register(this.usuario, this.senha).subscribe({
        next: (response) => {
          this.toastr.success('Sucesso!', response.message)
        },
        error: (erro) => {
          this.toastr.error('erro!', erro.error.message)
        }
      }
  
      );
    }
  }
}
