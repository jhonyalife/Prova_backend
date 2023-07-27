import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';

  constructor(private apiService: ApiService, private router: Router,  private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.apiService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.toastr.success('Sucesso', 'Logado com sucesso!');
        this.router.navigate(['/products']);
      },
      (error: any) => {
        this.toastr.error('Erro', 'Usuário não encontrado!');
      }
    );
  }

}
