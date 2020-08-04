// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {Request, Response} from 'express';

export class HomeController {
  constructor() {}

  index(req: Request, res: Response) {
    {
      res.render('index', {});
    }
  }
}
