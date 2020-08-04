// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {authenticate} from '@loopback/authentication';
import {BASIC_AUTH_STRATEGY_NAME} from '../auth_strategies/basic/basic';

export class AuthController {
  constructor(    @inject(SecurityBindings.USER, {optional: true})
                  private user: UserProfile) {}

  // Define your strategy name as a constant so that
  // it is consistent with the name you provide in the adapter
  @authenticate(BASIC_AUTH_STRATEGY_NAME)
  async whoAmI(): Promise<string> {
    return this.user.id;
  }
}
