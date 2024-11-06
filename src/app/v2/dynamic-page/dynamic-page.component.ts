import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
export type Section = { name: string; sliceStart: number; sliceEnd: number; applySlice: boolean };

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.scss',
})
export class DynamicPageComponent {
  @Input() cvData: any = {};
  @Input() sections: Section[] = [];
  @Input() pageIndex = 1;
  @Input() isOneSide = false;

  constructor(private cdr: ChangeDetectorRef) {}

  show(section: string) {
    return this.sections.find((elm) => elm.name == section);
  }

  sliceShow(section: string) {
    let target = this.sections.find((elm) => elm.name == section);
    if (target && target.applySlice) return this.cvData[target.name]?.slice(target.sliceStart, target.sliceEnd);
    else if (target && !target.applySlice) return this.cvData[target.name];
    else return [];
  }

  text(textObject: any) {
    if (textObject && textObject?.text) return textObject?.text;
    else return textObject[0]?.text;
  }
}
