import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AllInOneComponent } from './all-in-one/all-in-one.component';
import { HttpClientModule } from '@angular/common/http';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    AllInOneComponent,
    SectionComponent,
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
