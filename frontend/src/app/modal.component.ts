import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  form = this.fb.group({
    campo1: ['', Validators.required],
    campo2: ['', Validators.required],
    campo3: ['', Validators.required],
    campo4: ['', Validators.required],
    campo5: ['', Validators.required],
    campo6: ['', Validators.required],
    campo7: ['', Validators.required],
    campo8: ['', Validators.required],
    campo9: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log(this.form.value);
  }
}
