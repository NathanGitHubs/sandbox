import {NgModule, Component, /*Pipe,*/ OnInit} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  // FormBuilder
}                                          from '@angular/forms';
import {BrowserModule}                     from '@angular/platform-browser';
import {platformBrowserDynamic}            from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-model-form',
  template: `<!--suppress ALL -->
  <div class="container">
    <form novalidate
          [formGroup]="myForm"
          (ngSubmit)="onSubmit()">

      <fieldset formGroupName="name">
        <div class="form-group">
          <label>First Name</label>
          <input type="text"
                 class="form-control"
                 formControlName="firstName">
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text"
                 class="form-control"
                 formControlName="lastName">
        </div>
      </fieldset>


      <div class="form-group" [ngClass]="{
    'has-danger': email.invalid && email.dirty,
    'has-success': email.valid && email.dirty
  }">
        <label>Email</label>
        <input type="email"
               class="form-control"
               formControlName="email">

        <pre>Dirty? {{ myForm.controls.email.dirty }}</pre>
        <pre>Pristine? {{ myForm.controls.email.pristine }}</pre>
        <pre>Touched? {{ myForm.controls.email.touched }}</pre>
        <pre>Valid? {{ myForm.controls.email.valid }}</pre>
        <pre>Invalid? {{ myForm.controls.email.invalid }}</pre>
      </div>

      <div class="form-group" [ngClass]="{
    'has-danger': password.invalid && (password.dirty || password.touched),
    'has-success': password.valid && (password.dirty || password.touched)
  }">
        <label>Password</label>
        <input type="password"
               class="form-control"
               formControlName="password">

        <div class="form-control-feedback"
             *ngIf="password.errors && (password.dirty || password.touched)">
          <p *ngIf="password.errors.required">Password is required</p>
          <p *ngIf="password.errors.minlength">Password must be {{password.errors.minlength.requiredLength}} characters
            long, we need another {{password.errors.minlength.requiredLength - password.errors.minlength.actualLength}}
            characters </p>
        </div>

        <pre>{{ password.errors | json }}</pre>
      </div>

      <div class="form-group">
        <label>Language</label>
        <select class="form-control"
                formControlName="language">
          <option value="">Please select a language</option>
          <option *ngFor="let lang of langs"
                  [value]="lang">{{lang}}
          </option>
        </select>
      </div>

      <pre>{{myForm.value | json}}</pre>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  `
})
class ModelFormComponent implements OnInit {
  langs: string[] = ['English', 'French', 'German'];
  myForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;
  password!: FormControl;
  language!: FormControl;

  createFormControls(): void {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('', Validators.required);
  }

  createForm(): void {
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password,
      language: this.language
    });
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted!');
      console.log(this.myForm.value);
      this.myForm.reset();
    }
  }
}

@Component({
  selector: 'app-main',
  template: `
    <app-model-form></app-model-form>`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, ModelFormComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic()
  .bootstrapModule(AppModule).then();
