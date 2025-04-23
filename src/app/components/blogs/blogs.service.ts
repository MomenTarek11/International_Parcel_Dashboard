import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  constructor(private http: HttpClient) { }
  getAllBlogs(){
    return this.http.get(`${environment.endpoint}/blogs`);
  }
  getBlogById(id: number){
    return this.http.get(`${environment.endpoint}/blogs/${id}`);
  }
  createBlog(data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return this.http.post(`${environment.endpoint}/backend/blogs`, formData);
  }
  updateBlog(id: number, data: any){
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    console.log(formData);
    return this.http.post(`${environment.endpoint}/backend/blogs/${id}`, formData);
  }
  deleteBlog(id: number){
    return this.http.delete(`${environment.endpoint}/backend/blogs/${id}`);
  }
}
