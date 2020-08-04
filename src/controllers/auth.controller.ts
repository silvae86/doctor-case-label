// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {Request, Response} from 'express';
import {Doctor} from '../models';
const HttpStatus = require('http-status-codes');

export class AuthController {
  constructor() {}

  static async login(req: Request, res: Response) {
    const backURL = (req.header('Referer') ?? '/').split('?')[0];

    if (req.body.username && req.body.password) {
      const loggedDoctor = await Doctor.verify(
        req.body.username,
        req.body.password,
      );

      if (loggedDoctor != null) {
        if (req.session != null) req.session.loggedUser = loggedDoctor;
        res
          .status(HttpStatus.OK)
          .redirect(
            `${backURL}?success=${encodeURIComponent(
              `Welcome, ${loggedDoctor.firstName} ${loggedDoctor.surname}.`,
            )}`,
          );
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .redirect(
            `${backURL}?error=${encodeURIComponent(
              'Invalid username or password provided',
            )}`,
          );
      }
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .redirect(
          `${backURL}?error=${encodeURIComponent(
            'Missing password or username',
          )}`,
        );
    }
  }

  static async logout(req: Request, res: Response) {
    if (req.session) delete req.session;
    res.redirect('/');
  }
}
