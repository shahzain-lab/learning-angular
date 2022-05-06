import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/ngrx/types/products.types';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products: Product[];

  constructor(
    private auth: AuthService,
    private store: Store<{products: Product[]}>
    ) {
      this.store.pipe(select('products')).subscribe(results => {
        this.products = results
        console.log(results);
        
      })
     }



  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
  }
}
