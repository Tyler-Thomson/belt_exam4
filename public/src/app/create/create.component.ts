import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  currentUser: any = {id: '', appointments: []};
  newAppointment: any = {date: '', time: ''};
  errors: string[] = [];


  constructor(
    private _userService: UserService,
    private _appointmentService: AppointmentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.isLoggedIn();
  }

  createAppointment(){
    this.errors = [];
    this.newAppointment.user = this.currentUser;
    return this._appointmentService.createAppointment(this.newAppointment)
    .then(appointment => {
      if(appointment.errors){
        for(let key in appointment.errors){
          let error = appointment.errors[key];
          this.errors.push(error.message);
          console.log("Errors: ", this.errors);
        }
      } else {
        console.log(this.newAppointment);
         this.router.navigateByUrl('dashboard');
      }
    })
    .catch(err => {console.log(err)});
  }


  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser;
  }
  isLoggedIn(){
    if(this._userService.getCurrentUser()==null){
      this.router.navigateByUrl('/');
    }
  }
} 
