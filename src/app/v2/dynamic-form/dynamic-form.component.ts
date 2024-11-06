import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formControllers = ['skill', 'name', 'rating'];
  @Input() prop: string = '';
  @Input() cvData: any = {};
  form!: FormGroup;
  @Output() finalValue = new EventEmitter();

  // -------------------  DIVIDER  starting -------------------------------------------------------
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      list: this.fb.array([]),
    });
    this.addSkill();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let targeData = this.cvData[this.prop];
    if (changes['cvData'] && targeData && this.form) {
      if (this.formControllers[0] !== 'text') {
        // clear FormArray
        const listFormArray = this.form.get('list') as FormArray;
        listFormArray.clear();
        for (let i = 0; i < targeData.length; i++) {
          // create formGroup
          const formGroup = this.fb.group({});
          this.formControllers.forEach((key: any) => {
            formGroup.addControl(key, this.fb.control(targeData[i][key] || ''));
          });
          // add to FormArray
          listFormArray.push(formGroup);
        }
      } else if (this.formControllers[0] == 'text') {
        const listFormArray = this.form.get('list') as FormArray;
        listFormArray.clear();
        const formGroup = this.fb.group({ text: targeData[0].text });
        listFormArray.push(formGroup);
      } else {
        console.log(targeData);
      }
    }
  }

  changeIndx(elm: any, i: number, order: 'up' | 'down') {
    const listFormArray = this.form.get('list') as FormArray;
    let index1 = i;
    let index2;
    if (order == 'up') index2 = i - 1;
    else index2 = i + 1;

    if (index1 >= 0 && index1 < listFormArray.length && index2 >= 0 && index2 < listFormArray.length) {
      // Retrieve form groups at the specified indices
      const temp = listFormArray.at(index1);
      const item1 = listFormArray.at(index1);
      const item2 = listFormArray.at(index2);

      // Swap them by removing and reinserting in the correct order
      listFormArray.setControl(index1, item2);
      listFormArray.setControl(index2, temp);
    }
  }
  // -------------------  DIVIDER  fill data ------------------------------------------------------
  checkAndFillData() {
    let data = this.cvData[this.prop];
    if (data) {
      data.forEach((elm: any) => {
        const skillGroup = this.createSkillFormGroup();
        (this.form.get('list') as FormArray).push(skillGroup);
      });
    }
  }

  // -------------------  DIVIDER  form -----------------------------------------------------------
  get skillsControls() {
    return (this.form.get('list') as FormArray).controls;
  }

  createSkillFormGroup(): FormGroup {
    const group = this.fb.group({});
    this.formControllers.forEach((control) => {
      group.addControl(control, this.fb.control('', Validators.required));
    });
    return group;
  }

  addSkill() {
    const list = this.form.get('list') as FormArray;
    list.push(this.createSkillFormGroup());
  }

  removeSkill(index: number) {
    const list = this.form.get('list') as FormArray;
    list.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.finalValue.emit(this.form.value.list);
      console.log(this.form.value.list);
    }
  }
}
