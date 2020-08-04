// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {Request, Response} from 'express';
import {Doctor} from '../models';
const HttpStatus = require('http-status-codes');

export class AuthController {
  constructor() {}

  async login(req: Request, res: Response) {
    const backURL = (req.header('Referer') ?? '/').split('?')[0];

    const loggedDoctor = await Doctor.verify(
      req.get('username'),
      req.get('password'),
    );

    if (loggedDoctor != null) {
      if (req.session != null) req.session.loggedUser = loggedDoctor;
      res
        .status(HttpStatus.OK)
        .redirect(
          `${backURL}?success=${encodeURIComponent(
            'Welcome, ' + loggedDoctor.firstName + loggedDoctor.surname,
          )}`,
        );
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .redirect(`${backURL}?error=${encodeURIComponent('Invalid username or password provided')}`);
    }
  }

  async logout(req: Request, res: Response) {
    res.redirect('/');
  }
}
