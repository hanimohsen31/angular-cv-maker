import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-all-in-one',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-in-one.component.html',
  styleUrl: './all-in-one.component.scss',
})
export class AllInOneComponent {
  dataObj: any = {};
  userId: any = null;
  alert = false;
  workExperienceSlice = 5
  constructor(private DataService: DataService) {}

  ngOnInit() {
    if (!this.userId) {
      this.userId = 'hani';
    }
    this.getData();
    this.getDataById();
  }

  ngAfterContentChecked() {
    this.setCss();
  }

  getData() {
    this.DataService.inputs.asObservable().subscribe((res: any) => {
      let array = Object.entries(res);
      array.map((elm: any) => {
        let newObj: any;
        if (typeof elm[1] !== 'string') {
          let jsonString = JSON.stringify(elm[1], null, 2);
          newObj = { [elm[0]]: jsonString };
        } else {
          newObj = { [elm[0]]: elm[1] };
        }
        this.dataObj = { ...this.dataObj, ...newObj };
      });

    });
  }

  getDataById() {
    if (this.userId) {
      this.DataService.getData(this.userId).subscribe({
        next: (res: any) => {
          this.DataService.inputs.next(res);
        },
      });
    } else {
      this.alert = true;
    }
  }

  parser(string: string) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return null;
    }
  }

  stringify(string: string) {
    return JSON.stringify(string, null, 2);
  }

  print() {
    let elements: any = document.querySelectorAll('.pc');
    if (elements.length > 0) {
      elements.forEach(function (currentElement: any) {
        currentElement.style.width = '1240px';
        currentElement.style.height = '1754px';
      });
    }
    print();
  }

  pdf() {}

  update() {
    let data: any = {};
    let array = Object.entries(this.dataObj);
    array.map((elm: any) => {
      let newObj: any;
      try {
        let jsonParsed = JSON.parse(elm[1]);
        newObj = { [elm[0]]: jsonParsed };
        data = { ...data, ...newObj };
      } catch {
        newObj = { [elm[0]]: elm[1] };
        data = { ...data, ...newObj };
      }
    });
    if (this.userId) {
      this.DataService.updateData(this.userId, data).subscribe((res: any) =>
        console.log('updated')
      );
    } else {
      this.alert = true;
    }
  }

  setCss() {
    let doc: any = document.querySelector<HTMLElement>('.Paper');
    let width: any = doc?.getBoundingClientRect().width;
    let height: any = doc?.getBoundingClientRect().height;
    let elements: any = document.querySelectorAll('.pageContainer');
    if (elements.length > 0) {
      elements.forEach(function (currentElement: any) {
        currentElement.style.width = `${width}px`;
        currentElement.style.height = `${height}px`;
      });
    }
  }
}
