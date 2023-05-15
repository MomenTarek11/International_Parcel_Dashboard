import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { GlobalService } from "src/app/services/global.service";
import { AuthenticationService } from "../auth/authentication.service";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  personalInfo!: FormGroup;
  name = "";
  phone = "";
  email = "";
  edit: boolean = true;
  editpassword: boolean = true;
  thisLang: any;
  userId:any = JSON.parse(localStorage.getItem(`${environment.currentUserKey}`)).data.user.id
  resu: object = {};
  result: object = {};
  showAvatar = false;
  base64Image: any;
  showImg = true;
  imgSrc: any;
  type: any;
  showButtons = true;
  firstRow = true;
  secondtRow = false;
  hideImg: boolean = false;
  imgpath: any;
  file: File[] = [];
  @ViewChild("image") image: any;
  showConfirm: boolean = false;
  showConfirm2: boolean = false;
  showConfirm3: boolean = false;

  showPasswordError: boolean = false;
  showNewPasswordError: boolean = false;
  showConfirmPasswordError: boolean = false;
  submit: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private service: GlobalService
  ) {
    this.thisLang = localStorage.getItem("currentLang") || navigator.language;
  }

  ngOnInit(): void {
    console.log(this.userId , 'kasioj');
    
    this.edit = true;
    this.editpassword = true;
    //  confirm_password:[{value:'*********',disabled:this.editpassword},Validators.required],
    this.getInfo();
    // console.log("nnnnnnnnnnnnnnnn",this.result)
    this.personalInfo = this.formbuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.showImg = true;
    this.showAvatar = false;

    this.firstRow = true;
    this.secondtRow = false;
  }
  getInfo() {
    this.service.personalData(this.userId).subscribe((res: any) => {
      console.log(res.data);
      this.personalInfo = this.formbuilder.group({
        name: [res.data.name, Validators.required],
        email: [res.data.email, Validators.required],
        password: ["", Validators.required],
        admin_id : [this.userId]

      });
      this.imgpath = res.data.imagePath;
    });
    console.log("gfesfawdawrfe",this.imgpath)
  }

  base64(event: any) {
    this.file = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      this.base64Image = reader.result;
      console.log("saasdswqadqwedwq", this.file[0]);
    };
    this.showImg = false;
    this.showAvatar = true;
  }

  // editPersonalInfo(){
  //   this.edit=false;
  //   this.editpassword=true;
  // }
  // editPassword(){
  //   this.editpassword=false;
  //  }
  setType(num: any) {
    this.showButtons = false;
    this.type = num;
    if (this.type == 0) {
      this.firstRow = true;
      this.secondtRow = false;
      this.edit = false;
      this.hideImg = true;
    } else if (this.type == 1) {
      this.firstRow = false;
      this.secondtRow = true;
      this.editpassword = false;
      this.hideImg = false;
    } else {
      this.firstRow = true;
      this.secondtRow = false;
      this.edit = true;
    }
    console.log("Current Type", this.type);
  }
  onSubmit() {

    // let formData = new FormData ()
    // formData.append('name',this.personalInfo.controls.name.value)
    // formData.append('email',this.personalInfo.controls.name.value)
    // formData.append('password',this.personalInfo.controls.name.value)
    // formData.append('admin_id',this.personalInfo.controls.name.value)
    // setTimeout(() => {
      
    //   console.log(formData);
    // }, 1000);

    if (!this.personalInfo.controls.email.value.length) {
      Swal.fire("", "please enter your email");
      return;
    }


      this.service.updatePersonalInfo(this.personalInfo.value).subscribe(
        (res: any) => {
          console.log(res);
          
          // location.reload();
          //  console.log("infoooooo" ,res);
          Swal.fire("", res.message);
          this.showButtons = true;
  
        },
        (e: any) => {
          Swal.fire("", e.error.message);
          this.showButtons = true;
        
        }
      );
   

   
    }
  }

