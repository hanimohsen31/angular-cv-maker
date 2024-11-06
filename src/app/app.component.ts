import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AllInOneComponent } from './v1/all-in-one/all-in-one.component';
import { HttpClientModule } from '@angular/common/http';
import { SectionComponent } from './v1/section/section.component';
import { V2Component } from './v2/v2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    AllInOneComponent,
    SectionComponent,
    V2Component
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cv-angular';

  option1 = {
    sectionHeader: '',
    icon: 'location',
    DataList: [],
    DataText: '',
    DataObject: {},
    DataPullets: [],
    isMainSection: true,
    isSideSection: false,
    isTitle: false,
    mainSectionWidth: false,
    sideSectionWidth: false,
  };
}
