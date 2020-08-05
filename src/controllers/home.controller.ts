// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {Request, Response} from 'express';
const HttpStatus = require('http-status-codes');
import {migrate} from '../migrate';

export class HomeController {
  constructor() {}

  static async index(req: Request, res: Response) {
    {
      res.render('index', {});
    }
  }

  static async reset(req: Request, res: Response) {
    {
      await migrate(["--rebuild"], true);
      const backURL = (req.header('Referer') ?? '/').split('?')[0];
      res
        .status(HttpStatus.OK)
        .redirect(
          `${backURL}?success=${encodeURIComponent(
            'Database rebuilt',
          )}`,
        );
    }
  }
}
