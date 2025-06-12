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
      if (data.hasOwnProperty(key)&&
        data[key] !== null &&
        data[key] !== undefined &&
        data[key] !== '') {
        formData.append(key, data[key]);
      }
    }
    return this.http.post(`${environment.endpoint}/backend/blogs`, formData);
  }
  updateBlog(id: number, data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        data[key] !== null &&
        data[key] !== undefined &&
        data[key] !== ''
      ) {
        formData.append(key, data[key]);
      }
    }
  
    // console.log([...formData.entries()], 'Filtered FormData');
    return this.http.post(`${environment.endpoint}/backend/blogs/${id}`, formData);
  }
  
  deleteBlog(id: number){
    return this.http.delete(`${environment.endpoint}/backend/blogs/${id}`);
  }
  // tooglePuplishBLog(id: number){
  //   return this.http.patch(`${environment.endpoint}/backend/blogs/${id}`,'');
  // }
  uploadFiles(files: any) {
    const formData = new FormData();
    for(let i=0;i<1;i++){
      formData.append(`files[${i}]`, files);
    }
    return this.http.post(`${environment.endpoint}/files`, formData);
  }
}
