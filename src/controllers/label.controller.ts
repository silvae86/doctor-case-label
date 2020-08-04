// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {post, get, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import {Response} from 'express';

/**
 * OpenAPI response for label()
 */
const LABEL_RESPONSE: ResponseObject = {
  description: 'Labeler Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'Labeler Response',
        properties: {
          result: {type: 'boolean'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * OpenAPI request for label()
 */
const LABEL_REQUEST_BODY: ResponseObject = {
  description: 'Labeler Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'Labeler Request Body',
        properties: {
          conditionId: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class LabelController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  static async index(req: Request, res: Response) {

    res.render('label/index');
  }

  // Map to `POST /label`
  @post('/label/{caseId}', {
    responses: {
      '200': LABEL_RESPONSE,
    },
    requestBody: {
      content: LABEL_REQUEST_BODY,
    },
  })
  assignLabel(): object {
    return {
      result: true,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
