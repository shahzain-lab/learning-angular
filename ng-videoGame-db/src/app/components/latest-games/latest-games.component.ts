import { Component, OnInit } from '@angular/core';
import { FreeGamesService } from 'src/app/services/free-games.service';

@Component({
  selector: 'app-latest-games',
  templateUrl: './latest-games.component.html',
  styleUrls: ['./latest-games.component.scss']
})
export class LatestGamesComponent implements OnInit {

  constructor(private userGames: FreeGamesService) {
    this.userGames.users().subscribe((data:any) => {
      console.log(data);
      
    })
   }

  ngOnInit(): void {
  }

}
