import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit {
  @Input()
  dataObject;

  @Output()
  uloz = new EventEmitter();

  form: FormGroup;
  private objectProps;

  constructor() {}

  public ngOnInit() {
    // premapuj objekt aby sa dal iterovať
    this.objectProps = Object.keys(this.dataObject).map(prop => {
      return Object.assign({}, { key: prop }, this.dataObject[prop]);
    });

    // nastav formular
    const formGroup = {};
    for (const prop of Object.keys(this.dataObject)) {
      formGroup[prop] = new FormControl(
        this.dataObject[prop].value || '',
        this.mapValidators(this.dataObject[prop].validation)
      );
    }

    this.form = new FormGroup(formGroup);
  }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  onSubmit(form) {
    this.uloz.emit(form);
  }
}
