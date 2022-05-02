import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { UserGame } from 'src/Model/Games';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

userForm = new FormGroup({
   Name: new FormControl(''),
   GameName: new FormControl(''),
   GameURI: new FormControl(''),
 });
 userGamesList:UserGame[] = [];
 userGame:UserGame = {
 userName: '',
 userGameName: '',
 userGameURI: ''
}

 constructor() {}
 
 onSubmit() {
   this.userGamesList.push({
     userName: this.userForm.value.Name,
     userGameName: this.userForm.value.GameName,
     userGameURI: this.userForm.value.GameURI
   })
   
   console.log(this.userGamesList);
   console.log(this.userForm.value);
 }

  ngOnInit() {
  }
}


 