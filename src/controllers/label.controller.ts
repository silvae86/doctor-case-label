// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {post, get, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';

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

  // Map to `GET /label/next`
  @get('/label/next', {
    responses: {
      '200': LABEL_RESPONSE,
    },
    requestBody: {
      content: LABEL_REQUEST_BODY,
    },
  })
  nextCase(): object {
    return {
      result: true,
      headers: Object.assign({}, this.req.headers),
    };
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
  label(): object {
    return {
      result: true,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
