import { Component } from '@angular/core';
import { LatestGames } from 'src/Model/Games';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  latestDiscover: LatestGames[] = [
    {
      game_url: 'https://cdn.images.express.co.uk/img/dynamic/143/590x/GTA-6-1359906.jpg?r=1605428921055',
      game_title: 'GTA'
    },
    {
      game_url: 'https://cdn1.dotesports.com/wp-content/uploads/2020/04/02142718/GarenaWorld.png',
      game_title: 'callOfDuty'
    },
    {
      game_url: 'https://i.ytimg.com/vi/UOh0VvNKXX0/maxresdefault.jpg',
      game_title: 'IGI'
    },
    {
      game_url: 'https://cdn.talkesport.com/wp-content/uploads/free-fire-2.jpg',
      game_title: 'FreeFire'
    },
    {
      game_url: 'https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-432974386.jpg',
      game_title: 'Fortnite'
    },
    {
      game_url: 'https://uptopico.com/upload/blog/cover/60e4a7c8ed348.jpg',
      game_title: 'Divinity'
    },
    {
      game_url: 'https://cdn1.epicgames.com/min/offer/2560x1440-2560x1440-5e710b93049cbd2125cf0261dcfbf943.jpg',
      game_title: 'Hades'
    },
    {
      game_url: 'https://cdn.wccftech.com/wp-content/uploads/2016/06/dishonored2_emily.jpg',
      game_title: 'dishonored 2'
    },
  ]
}
