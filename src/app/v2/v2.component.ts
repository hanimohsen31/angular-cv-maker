import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllInOneComponent } from '../v1/all-in-one/all-in-one.component';
import { SectionComponent } from '../v1/section/section.component';
import { DataService } from '../services/data.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';

@Component({
  selector: 'app-v2',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    AllInOneComponent,
    SectionComponent,
    DynamicFormComponent,
    DynamicPageComponent,
  ],
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.scss',
})
export class V2Component {
  cvData: any = {};
  isPrinting = false;
  page1Data = [
    // left
    { name: 'PersonalProfile', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'WorkExperience', sliceStart: 0, sliceEnd: 5, applySlice: true },
    // right
    { name: 'Contacts', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'TechnicalSkills', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'LanguageSkills', sliceStart: 0, sliceEnd: 0, applySlice: false },
  ];

  page2Data = [
    // left
    { name: 'Projects', sliceStart: 0, sliceEnd: 0, applySlice: false },
    // rigth
    { name: 'WorkExperience', sliceStart: 5, sliceEnd: 100, applySlice: true },
    { name: 'TechnicalSkillsExplained', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'InterpersonalSkillsExplained', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'InterpersonalSkills', sliceStart: 0, sliceEnd: 0, applySlice: false },
  ];

  page3Data = [
    { name: 'Education', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'Courses', sliceStart: 0, sliceEnd: 0, applySlice: false },
    { name: 'PersonalInfo', sliceStart: 0, sliceEnd: 0, applySlice: false },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getJsonData();
  }

  getDataEmitted(event: any, prop: string) {
    this.cvData[prop] = event;
  }

  getJsonData() {
    this.dataService.getCVDataV2().subscribe({
      next: (res) => (this.cvData = res),
    });
  }

  console() {
    let submit = document.querySelectorAll('button[type="submit"]');
    if (submit.length) submit.forEach((elm: any) => elm.click());
    console.log('CV Data:', this.cvData);
  }

  update() {
    this.dataService.updateCVDataV2(this.cvData).subscribe((res: any) => console.log('updated'));
  }

  print() {
    let paper = document.querySelectorAll('.Paper');
    if (paper.length > 0) {
      paper.forEach((elm: any) => (elm.style.boxShadow = 'none'));
    }

    setTimeout(() => {
      let elements: any = document.querySelectorAll('.pc');
      if (elements.length > 0) {
        elements.forEach(function (currentElement: any) {
          currentElement.style.width = '1240px';
          currentElement.style.height = '1754px';
        });
      }
      print();
    }, 100);
  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event: Event) {
    console.log('Print dialog opened');
    this.isPrinting = true;
  }

  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event: Event) {
    console.log('Print dialog closed');
    this.isPrinting = false;
  }
}
