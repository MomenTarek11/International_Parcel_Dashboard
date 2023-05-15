import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  admins;
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService,private globalService:GlobalService) { }

  ngOnInit(): void {
    this.allAdmins()
  }

  allAdmins(){
    this.spinner.show()
    this.globalService.allAdmins().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      this.admins=res
      console.log(res)
    })
  }

  editAdmin(admin){
    let dialogRef = this.dialog.open(EditComponent, {
      data:admin,
      height: '600px',
      width: '600px',
    });
  }

  deleteAdmin(admin_id){
    this.spinner.show()
    this.globalService.deleteAdmin(admin_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف الادمن بنجاح',
              'success'
            )
            this.allAdmins()
          })
  }
}
