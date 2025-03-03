import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
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
  }


  viewUser(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '550px',
      width: '500px',
    });
  }

  
}
