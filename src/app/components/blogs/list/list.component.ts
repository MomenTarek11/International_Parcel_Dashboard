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
  blogs: IBlog[]=[];
  showPlaceholder: boolean = true;
  constructor(
    private service:BlogsService,
    private dialog:MatDialog,
  ) {}
  ngOnInit(): void {
    this.blogs = [
      {
        id: 1,
        image: "assets/images/blogs/1.jpg",
        title_ar: "عنوان المدونة 1",
        title_en: "Blog Title 1",
        title_cn: "博客标题 1",
        content_ar: "محتوى المدونة 1",
        content_en: "Blog Content 1",
        content_cn: "博客内容 1",
        created_at: "2023-01-01",
        isShowen:true
      },
      {
        id: 2,
        image: "assets/images/blogs/2.jpg",
        title_ar: "عنوان المدونة 2",
        title_en: "Blog Title 2",
        title_cn: "博客标题 2",
        content_ar: "محتوى المدونة 2",
        content_en: "Blog Content 2",
        content_cn: "博客内容 2",
        created_at: "2023-02-01",
        isShowen:false
      },
    ];
    this.showPlaceholder = false;
  }

  getAllBlogs(){
    this.service.getAllBlogs().subscribe(
      (res: any) => {
        this.blogs = res.data;
        this.showPlaceholder = false;
      }
    )
  }
  showBlog(Blog:IBlog){
    this.dialog.open(DetailsComponent, {
      data: Blog,
    })
  }
  editBLog(Blog:IBlog){
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
      id: Blog.id,
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
