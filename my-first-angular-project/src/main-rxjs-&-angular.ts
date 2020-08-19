import {NgModule, Component}    from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
}                               from '@angular/forms';
import {filter, map}                 from 'rxjs/operators';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="myForm"
          (ngSubmit)="onSubmit()">

      <!-- Output comment -->
      <div class="card card-block">
        <pre class="card-text">{{ myForm.value["commentInForm"] }}</pre>
      </div>
      <p class="small">{{ myForm.value["lastUpdateTS"] }}</p>
      <!-- Comment text area -->
      <div class="form-group">
        <label for="comment">Comment</label>
        <textarea class="form-control"
                  formControlName="commentInForm"
                  rows="5"
                  placeholder="Enter comment"></textarea>
        <small class="form-text text-muted">
          <span>{{ 100 - myForm.value["commentInForm"].length }}</span> characters left
        </small>
      </div>
      <!-- Name input -->
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text"
               class="form-control"
               formControlName="nameInForm"
               placeholder="Enter name">
      </div>
      <!-- Email input -->
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email"
               class="form-control"
               formControlName="emailInForm"
               placeholder="Enter email">
        <small class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <button type="submit"
              class="btn btn-primary"
              [disabled]="!myForm.valid">Submit
      </button>
    </form>
  `
})
class FormAppComponent {
  myForm: FormGroup;
  comment: FormControl = new FormControl('', Validators.required);
  myName: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*')
  ]);

  /* Observable Solution */
  // constructor(fb: FormBuilder) {
  //   this.form = fb.group({
  //     comment: this.comment,
  //     name: this.name,
  //     email: this.email
  //   });
  //   this.form.valueChanges
  //     .pipe(
  //       filter(data => this.form.valid),
  //       map(data => {
  //         data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, "");
  //         return data;
  //       }),
  //       map(data => {
  //         data.lastUpdateTS = new Date();
  //         return data;
  //       })
  //     )
  //     .subscribe(data => console.log(JSON.stringify(data)));
  // }
  /* None Observable Solution */
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      commentInForm: this.comment,
      nameInForm: this.myName,
      emailInForm: this.email
    });
    // @ts-ignore
    this.myForm.valueChanges.pipe(filter((data: any): boolean => {
      return this.myForm.valid;
    })).pipe(map((data: any): any => {
      data.commentInForm = data.commentInForm.replace(/<(?:.|\n)*?>/gm, '');
      return data;
    })).subscribe((data: any): void => {
      // if (this.myForm.valid) {
      data.lastUpdateTS = new Date();
      console.log(JSON.stringify(data));
      // }
    });
  }

  onSubmit(): void {
    console.log('Form submitted!');
  }
}

@Component({
  selector: 'app-main',
  template: `
    <app-form></app-form>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, FormAppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
