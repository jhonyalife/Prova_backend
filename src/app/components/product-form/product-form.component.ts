import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public product: any = {};
  public isEditMode = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(productId);
    }
  }

  private loadProduct(id: string): void {
    this.apiService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response[0];
      },
      error: (error) => {
        console.error('Error:', error);
      }
    }
    );
  }

  public saveProduct(): void {
    if (this.isEditMode) {
      this.apiService.updateProduct(this.product.id, this.product).subscribe({
        next: (response) => {
          this.toastr.success('Sucesso!', response.message)
          this.router.navigate(['/products']);
        },  
        error: (error) => {
          console.error('Error:', error);
        }
      }
      );
    } else {
      this.apiService.createProduct(this.product).subscribe({
        next: (response) => {
          this.toastr.success('Sucesso!', response.message)
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.toastr.error('Sucesso!', error.message)
          console.error('Error:', error);
        }
      }
      );
    }
  }
}
