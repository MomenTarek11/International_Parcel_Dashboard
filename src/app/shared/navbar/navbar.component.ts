import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/components/auth/authentication.service';
declare var $,jQuery:any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user
  public dark = false
  constructor(private authentication:AuthenticationService) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
  }

  ngOnInit(): void {
    $(".left-header .level-menu .header-level-menu").css('display', 'none');
    $('.left-header .level-menu .nav-link').on('click', function (e) {
        $(this).toggleClass("active");
        $(this).parent().children('.header-level-menu').toggleClass("d-block").slideToggle();
    });
    $(document).click(function (e) {
      $('.translate_wrapper, .more_lang').removeClass('active');
    });
    $('.translate_wrapper .current_lang').click(function (e) {
      e.stopPropagation();
      $(this).parent().toggleClass('active');

      setTimeout(function () {
          $('.more_lang').toggleClass('active');
      }, 5);
    });
  }
  darkMode(){
    $('body').toggleClass('dark-only')
  }
  logOut(){
    this.authentication.logout()
  }
}
