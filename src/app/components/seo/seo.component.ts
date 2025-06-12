import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  robotsContent: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRobotsTxt();
  }

  loadRobotsTxt(): void {
    this.http.get('/robots.txt', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.robotsContent = data;
      },
      error: () => {
        this.errorMessage = 'فشل في تحميل ملف robots.txt.';
      },
    });
  }

 saveRobotsTxt(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Basic validation
    if (!this.robotsContent.trim()) {
      this.errorMessage = 'محتوى robots.txt لا يمكن أن يكون فارغًا.';
      return;
    }
    console.log(this.robotsContent);
    // Send the updated content to the backend
    // this.http
    //   .post('/api/robots/save', { content: this.robotsContent })
    //   .subscribe({
    //     next: () => {
    //       this.successMessage = 'تم حفظ الملف بنجاح.';
    //     },
    //     error: () => {
    //       this.errorMessage = 'حدث خطأ أثناء حفظ الملف.';
    //     },
    //   });
  } 

}
