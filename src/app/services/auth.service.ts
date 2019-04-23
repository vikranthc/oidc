import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.manager.getUser().then(user =>{
      this.user = user;
    })
  }

  isLoggerIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication() {
    localStorage.setItem('redirect1', JSON.stringify(window.location.pathname));
    return this.manager.signinRedirect();
  }

  completeAuthentication() {
    return this.manager.signinRedirectCallback().then(
      user => { this.user = user; }
    )
  }

  private user: User = null;
  private manager = new UserManager(getClientSettings());
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://dev.identity.pfsqa.com',
    redirect_uri: 'http://localhost:62499',
    post_logout_redirect_uri: 'http://localhost:62499',
    response_type: 'id_token token',
    client_id: 'DealerPortal',
    scope: 'pfs_api.employee.full_access openid profile email',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html',
    automaticSilentRenew: true
  }
}
