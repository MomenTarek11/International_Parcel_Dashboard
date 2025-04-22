import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getAllBlogs(){
    return this.http.get(`${environment.endpoint}/backend/blogs`);
  }
  getBlogById(id: number){
    return this.http.get(`${environment.endpoint}/backend/blogs/${id}`);
  }
  createBlog(data: any){
    return this.http.post(`${environment.endpoint}/backend/blogs`, data);
  }
  updateBlog(id: number, data: any){
    return this.http.put(`${environment.endpoint}/backend/blogs/${id}`, data);
  }
  deleteBlog(id: number){
    return this.http.delete(`${environment.endpoint}/backend/blogs/${id}`);
  }
}
