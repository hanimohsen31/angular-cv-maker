import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() sectionHeader = '';
  @Input() icon: 'location' | 'circle' | null = 'location';
  @Input() DataList :any[]= [];
  @Input() DataText = '';
  @Input() DataObject:any = {};
  @Input() DataPullets = [];
  @Input() isMainSection = true;
  @Input() isSideSection = false;
  @Input() isTitle = false;
  @Input() mainSectionWidth = 8;
  @Input() sideSectionWidth = 4;

  constructor() {}

  ngOnInit() {}
}
