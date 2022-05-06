import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

    signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })
  ngOnInit(): void {
  }

  onSubmit() {
    if(this.signupForm.status === 'VALID'){
      this.auth.signup(this.signupForm.value).subscribe((results) => {
        console.log(results);
        this.router.navigate(["/admin"])
    })
  }
}
}
