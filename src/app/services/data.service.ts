import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private HttpClient: HttpClient) {}

  ngOnInit() {}

  inputs: any = new BehaviorSubject<any>({});
  inputs$: any = this.inputs.asObservable();

  updateAddress(change: any) {
    this.inputs.next({ ...this.inputs.value, ...change });
  }

  getData(id: any) {
    let url = environment.baseUrl + `/users/${id}.json`;
    return this.HttpClient.get(url);
  }

  updateData(id: any, data: any) {
    let url = environment.baseUrl + `/users/${id}.json`;
    return this.HttpClient.put(url, data);
  }
}
