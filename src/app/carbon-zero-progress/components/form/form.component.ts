import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent {
  form: FormGroup = new FormGroup({
    customTest: new FormControl("", [Validators.required, Validators.email]),
    canvas: new FormControl(),
  });

  submit() {
    console.error(this.form);
  }
}
