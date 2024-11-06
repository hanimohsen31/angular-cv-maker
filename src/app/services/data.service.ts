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

  updateCVDataV2(data: any) {
    let url = environment.baseUrl + `/cv.json`;
    return this.HttpClient.put(url, data);
  }

  getCVDataV2() {
    let url = environment.baseUrl + `/cv.json`;
    return this.HttpClient.get(url);
  }

  getJsonData() {
    let url = `assets/cv.json`;
    return this.HttpClient.get(url);
  }

  getJsonData2() {
    let url = `assets/cv2.json`;
    return this.HttpClient.get(url);
  }
}
