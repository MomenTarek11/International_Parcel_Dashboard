import { Component, OnInit } from "@angular/core";
import { IBlog } from "src/app/interfaces/blog";
import { BlogsService } from "../blogs.service";
import { MatDialog } from "@angular/material/dialog";
import { DetailsComponent } from "../../allorders/details/details.component";
import { EditComponent } from "../edit/edit.component";
import { PopUpComponent } from "src/app/shared/pop-up/pop-up.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  blogs: any;
  showPlaceholder: boolean = true;
  constructor(
    private service:BlogsService,
    private dialog:MatDialog,
  ) {}
  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(){
    this.service.getAllBlogs().subscribe(
      (res: any) => {
        this.blogs = res.data;
        this.showPlaceholder = false;
        console.log(this.blogs);
        
      }
    )
  }
  showBlog(Blog:IBlog){
    this.dialog.open(DetailsComponent, {
      data: Blog,
    })
  }
  editBlog(Blog:IBlog){
    this.dialog.open(EditComponent, {
      data: Blog,
    }) 
  }
  deleteBlog(Blog:IBlog){
    const data={
      title: "هل انت واثق انك تريد حذف هذا المدونة ؟",
      button: "حذف",
      type: "delete_blog",
      category: "المدونة",
      id: Blog.data.id,
    }
   this.dialog.open(PopUpComponent, {
     data: data,
   })
   .afterClosed().subscribe((result) => {
     if (result) {
      //  this.service.deleteBlog(Blog.id).subscribe(
      //    (res: any) => {
      //      this.getAllBlogs();
      //    }
      //  )
      console.log(result);
      
      
     }
   })
  }
 
}
