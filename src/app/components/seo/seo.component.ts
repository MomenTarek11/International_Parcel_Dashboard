import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
  robots!:FormGroup;


  constructor(private service:GlobalService,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.robots = this.fb.group({
      robotsContent: ['']
    });
    this.loadRobotsTxt();
  }

  loadRobotsTxt(): void {
    this.spinner.show();
    this.service.getRobotsTxt().pipe(finalize(()=>this.spinner.hide())).subscribe({
      next: (res: any) => {
        console.log(res);
        this.robots.patchValue({  
          robotsContent: res?.data?.robots
        });
      },
      error: (error: any) => {
      }
    });
  }

 saveRobotsTxt(): void {
   this.spinner.show();
   this.service.updateRobotsTxt(this.robots.value).pipe(finalize(()=>this.spinner.hide())).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.status) {
          this.toaster.success("تم حفظ الملف بنجاح");
        } else {
          this.toaster.error("حدث خطأ أثناء حفظ الملف");
        }
      },
      error: (error: any) => {
       this.toaster.error("حدث خطأ أثناء حفظ الملف");
      }
    });
  } 

}
