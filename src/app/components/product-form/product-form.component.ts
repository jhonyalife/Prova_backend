import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(productId);
    } 
  }

  private loadProduct(id: string): void {
    this.apiService.getProduct(id).subscribe(
      (response: any) => {
        this.product = response[0];
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  public saveProduct(): void {
    if (this.isEditMode) {
      this.apiService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
      );
    } else {
      this.apiService.createProduct(this.product).subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
