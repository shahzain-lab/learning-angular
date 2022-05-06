import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/ngrx/types/products.types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private store: Store<{products: Product[]}>
    ) {
      this.store.pipe(select('products')).subscribe(results => {
        this.products = results
        console.log(results);
        
      })
     }

  ngOnInit(): void {
  }

}

  