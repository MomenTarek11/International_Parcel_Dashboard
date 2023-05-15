import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('this.data')
    console.log(this.data)
    console.log(this.data)
  }



}
