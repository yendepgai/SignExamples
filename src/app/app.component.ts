import { Component ,OnInit} from '@angular/core';
declare const FB: any;
declare const gapi: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public auth2: any;  
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  title = 'app';
  constructor() {
    FB.init({
        appId: '1496900007029784',
        cookie: false,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.5
    });
    setTimeout(() => {
      gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      }); 
      this.attachSignin(document.getElementById('googleBtn'));
    });
    },1000); 
    

    console.log("a1");
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  LoginFb(){
    console.log("a22");
    FB.login((response: any) => {
      if (response.status === 'connected') {
          this.me(response.authResponse.userID, response.authResponse.accessToken);
          // Logged into your app and Facebook.
      } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
      } else {
    
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
      }
    
    }, {scope: 'user_friends,email'});
  }
  LogoutFb(){
    FB.logout(function(response) {
      // user is now logged out
    });    
  }
  me(userId, accessToken) {
    FB.api(
      "/" + userId + '?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
      (result) => { 
          console.log("result===", result);
          if (result && !result.error) {
          }
      })
  }
  LoginGg(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  LogoutGg(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}
