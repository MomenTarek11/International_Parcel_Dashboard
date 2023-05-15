import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected = true;  
  ngOnInit(){
  }
  // noInternetConnection: boolean;  
  constructor(private _snackBar: MatSnackBar,private connectionService: ConnectionService,private router: Router) {  
    this.connectionService.monitor().subscribe(isConnected => {  
      this.isConnected = isConnected;  
      if (!this.isConnected) 
        this.openSnackBar('لا يوجد اتصال بالإنترنت','موافق')
        else
        this.openSnackBar('تم استعادة الاتصال بالانترنت','موافق')
    })  
  }  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}