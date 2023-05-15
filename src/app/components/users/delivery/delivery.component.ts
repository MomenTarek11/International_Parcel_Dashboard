import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  first_status=0;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  public users = [
    {
      
    }
  ]
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    // this.getUsers()
  }
  // allUsers(type,status){
  //   this.first_status=status
  //   this.spinner.show()
  //   this.service.allUsers(type,status).pipe(map(res=>res['data'])).subscribe((response:any)=>{
  //     console.log(response)
  //     this.users = response
  //   this.spinner.hide()
  //   })
  // }
  // getUsers(){
  //   this.spinner.show()
  //   this.service.allUsers(3,0).pipe(map(res=>res['data'])).subscribe((response:any)=>{
  //     console.log(response)
  //     this.users = response
  //   this.spinner.hide()
  //   })
  // }

  viewUser(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '550px',
      width: '500px',
    });
  }

  // accept(user_id){
  //   this.service.acceptRefuseUser(user_id,1).subscribe(res=>{
  //     Swal.fire(
  //       'نجاح',
  //       'تم القبول بنجاح',
  //       'success'
  //     )
  //     this.getUsers()
  //   })
  // }
  // refuse(user_id){
  //   this.service.acceptRefuseUser(user_id,2).subscribe(res=>{
  //     Swal.fire(
  //       'نجاح',
  //       'تم الرفض بنجاح',
  //       'success'
  //     )
  //     this.getUsers()
  //   })
  // }
}
