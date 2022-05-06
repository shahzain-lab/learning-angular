import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createProduct } from 'src/app/ngrx/actions/products.action';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
product = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
    image: new FormControl('', [
      Validators.required,
    ])
  })
  constructor(private store: Store, private router: Router) { }
  
  ngOnInit(): void {
  }

  onSubmit() {
    if(this.product.status === 'VALID'){
      this.store.dispatch(createProduct({payload:this.product.value}))
      this.router.navigate(['/admin/home'])
  }
  }

}
