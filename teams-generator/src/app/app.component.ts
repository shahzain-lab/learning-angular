import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newTeamMmber = "";
  errorMesssge = ""
  noOfTeams = 0
  members: string[] = [];

  onInput(member: string) {
    this.newTeamMmber = member;
    console.log(this.newTeamMmber);
  }

  addMember() {
    if(!this.newTeamMmber){
      this.errorMesssge = "Field can't be empty"
      return
    }
    this.errorMesssge = ""
    this.members.push(this.newTeamMmber);
    this.newTeamMmber = ""
    console.log(this.members);
  }

  onNoOfTeamsAdd(teamNo: string) {
    this.noOfTeams = Number(teamNo)
    console.log(this.noOfTeams);
    
  }
}
