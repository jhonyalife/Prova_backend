import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: any[] = [];

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  public deleteProduct(id: string): void {
    if (!localStorage.getItem('token')) {
      this.toastr.warning('Atenção! Você precisa está logado para deletar um item')
      this.router.navigate(['/login']);
    } else {
      if (confirm('Você tem certeza que deseja deletar esse produto?')) {
        this.apiService.deleteProduct(id).subscribe({
          next: (response) => {
            this.toastr.success('Sucesso!', response.message)
            this.loadProducts()
          },
          error: (erro) => {
            this.toastr.error('erro!', erro.error.message)
          }
        }
        );
      }
    }
  }
}
