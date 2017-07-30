import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class AppointmentService {

  constructor(private _http: Http) { }

  getAppointments(){
    return this._http.get('/appointments').map(data => data.json()).toPromise()
  }
  createAppointment(newAppointment){
    return this._http.post('/appointments', newAppointment).map(data => data.json()).toPromise()
  }
  showAppointment(id:string){
    return this._http.get(`/appointments/${id}`).map(data => data.json()).toPromise()
  }
  delete(id){
    return this._http.delete(`/appointments/${id}`).map(data => data.json()).toPromise()
  }
}
