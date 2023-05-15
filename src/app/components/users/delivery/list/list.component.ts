import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { UserDetailsComponent } from '../../user-details/user-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  
  type=1;
  userActive=1;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  public users = [
    {
      
    }
  ]
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUsers(1)
  }
  getUsers(status_id){
    this.spinner.show()
    this.service.allUsers(status_id).pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log(response)
      this.users = response.data
    this.spinner.hide()
    })
  }

  getOrders(type){
    this.getUsers(type)
    this.type=type

  }




  activeFamily(user_id){
    this.service.changeUserStatus(user_id,1).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم إلغاء الحظر بنجاح   ',
        'success'
      )
      this.getOrders(this.type)
    })
  }
        
  refuseFamily(user_id){
    // this.service.deleteUser(user_id).subscribe(res=>{
    //   Swal.fire(
    //     'نجاح',
    //     'تم  الحذف بنجاح   ',
    //     'success'
    //   )
    //   this.getOrders(this.type)
    // })
  }
  blockFamily(user_id){

    this.service.changeUserStatus(user_id,0).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم الحظر بنجاح   ',
        'success'
      )
      this.getOrders(this.type)
    })
  }


  userDetails(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '500px',
      width: '600px',
    });
  }

}

