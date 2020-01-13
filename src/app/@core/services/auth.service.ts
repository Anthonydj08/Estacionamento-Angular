import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from './../model/login';
import * as firebase from 'firebase/app';

import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor(private afa: AngularFireAuth) {

    afa.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(login: Login) {
    return this.afa.auth.signInWithEmailAndPassword(login.email, login.senha);
  }

  register(login: Login) {
    return this.afa.auth.createUserWithEmailAndPassword(login.email, login.senha);
  }

  senha(login: Login) {
    return this.afa.auth.sendPasswordResetEmail(login.email);
  }
  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

  signInWithFacebook() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afa.auth.signInWithPopup(provider);
    } else {
      return this.afa.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afa.auth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.providerId;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }

}
