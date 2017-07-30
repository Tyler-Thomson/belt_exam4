import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser:any = {_id: 0, appointments: []};
  user = {};
  appointments:any = [];


  constructor(
    private _userService: UserService,
    private _appointmentService: AppointmentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.isLoggedIn();
    this.getAppointments();
  }

  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser;
  }
  isLoggedIn(){
    if(this._userService.getCurrentUser()==null){
      this.router.navigateByUrl('/');
    }
  }
  getAppointments(){
    return this._appointmentService.getAppointments()
    .then(appointments => this.appointments = appointments)
    .catch(err => console.log(err));
  }
  delete(id:string, idx){
    return this._appointmentService.delete(id)
    .then( appointment => {
      this.currentUser.appointments.splice(idx, 1)
    })
    .catch(err => console.log(err));
  }
  logout(){
    this._userService.logout();
    this.router.navigateByUrl('/');
  }
}
