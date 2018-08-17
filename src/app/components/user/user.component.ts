import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private myForm: FormGroup;
  private submitted = false;
  private action = 'add';
  private users: User[];

  countries = ['USA', 'Germany', 'Italy', 'France'];

  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild('fileInput2') fileInput2: ElementRef;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      _id: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatar: null,
      address: this.formBuilder.group({
        street: '',
        city: '',
        province: '',
        postcode: '',
        country: '',
      }),
    });

    this.onLoad();

  }

  get f() { return this.myForm.controls; }

  get addg() { return this.myForm.controls.address['controls']; }


  onLoad() {

    return this.userService.getUserLists().subscribe((response) => {

      this.users = response;

    });

  }

  onEdit(id: string) {

    this.userService.editUsers(id).subscribe((users) => {

      this.action = 'edit';
      this.myForm.patchValue(users);

    });


  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }

    const formValue = this.myForm.value;
    console.log(formValue);


    // if (this.action === 'add') {
    //   this.userService.addUsers(formValue).subscribe((response) => {
    //     this.onLoad();
    //   });
    // } else {

    //   console.log(formValue);
    //   this.userService.updateUsers(formValue).subscribe((response) => {

    //     this.onLoad();

    //   });

    // }
    this.action = 'add';

  }

  onDelete(id: string) {

    this.userService.deleteUsers(id).subscribe((response) => {

      this.onLoad();

    });

  }

  onReset() {

    this.myForm.reset();

  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.myForm.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  onFileChange2(event) {

    const file = event.target.files[0]; // <--- File Object for future use.
    this.myForm.get('avatar').setValue(file ? file.name : '');
  }

  clearFile() {
    this.myForm.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }



}

interface User {
  _id: string;
  firstName: string;
  lastName: number;
  email: string;
  password: string;
  __v: number;
}
