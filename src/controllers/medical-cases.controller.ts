import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  Request,
  HttpErrors, RestBindings,
} from '@loopback/rest';
import {Condition, MedicalCase} from '../models';
import {ConditionRepository, MedicalCaseRepository} from '../repositories';
import {inject} from '@loopback/context';
import {Response} from 'express';
import {MongoDbDataSource} from '../datasources';

export class MedicalCasesController {
  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @repository(MedicalCaseRepository)
    public medicalCaseRepository: MedicalCaseRepository,
  ) {}

  @post('/medical-cases', {
    responses: {
      '200': {
        description: 'MedicalCase model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicalCase)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicalCase, {
            title: 'NewMedicalCase',
            exclude: ['id'],
          }),
        },
      },
    })
    medicalCase: Omit<MedicalCase, 'id'>,
  ): Promise<MedicalCase> {
    return this.medicalCaseRepository.create(medicalCase);
  }

  @get('/medical-cases/count', {
    responses: {
      '200': {
        description: 'MedicalCase model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MedicalCase) where?: Where<MedicalCase>,
  ): Promise<Count> {
    return this.medicalCaseRepository.count(where);
  }

  @get('/medical-cases', {
    responses: {
      '200': {
        description: 'Array of MedicalCase model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MedicalCase, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MedicalCase) filter?: Filter<MedicalCase>,
  ): Promise<MedicalCase[]> {
    return this.medicalCaseRepository.find(filter);
  }

  @get('/medical-cases/next-unlabeled', {
    responses: {
      '200': {
        description: 'Next MedicalCase model instances',
        content: {
          'application/json': {
            content: {
              'application/json': {
                schema: getModelSchemaRef(MedicalCase, {
                  includeRelations: true,
                }),
              },
            },
          },
        },
      },
    },
  })
  async findNextUnlabeled(
    @param.filter(MedicalCase) filter?: Filter<MedicalCase>,
  ): Promise<MedicalCase | null> {
    const unlabeledMedicalCase: MedicalCase | null = await this.medicalCaseRepository.findOne(
      {
        where: {
          conditionId: { eq: undefined }
        }
    });

    if(unlabeledMedicalCase != null)
    {
      // start recording the time a recording was last requested (unix timestamp)
      const session = this.request.session;
      if(session != null)
        session.lastLabelingRequestedAt = Date.now();
    }

    return unlabeledMedicalCase;
  }

  static async index(req: Request, res: Response) {
    res.render('medical-cases/label');
  }

  // Map to `POST /label`
  @post('/medical-cases/{caseId}/label/{conditionId}', {
    summary: 'Labels a medical case with a certain condition',
    responses: {
      '200': {
        description: 'Modified MedicalCase model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MedicalCase, {includeRelations: true}),
          },
        },
      },
      '404': {
        description: 'MedicalCase not found',
        content: {
          'application/json': {
            schema: {
              type: 'string',
              title: 'MedicalCase not found response',
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
      },
    },
  })
  async assignLabel(
    @param.path.string('caseId') caseId: string,
    @param.path.string('conditionId') conditionId: string,
    @param.filter(MedicalCase, {exclude: 'where'})
    filter?: FilterExcludingWhere<Condition>,
  ): Promise<MedicalCase | object> {
    // will never be undefined because we only allow authenticated requests at this point.
    const session = this.request.session;

    const medicalCaseRepository: MedicalCaseRepository = new MedicalCaseRepository(
      new MongoDbDataSource(),
    );
    const medicalCase: MedicalCase = await medicalCaseRepository.findById(
      caseId,
    );

    const conditionRepository: ConditionRepository = new ConditionRepository(
      new MongoDbDataSource(),
    );
    const condition: Condition = await conditionRepository.findById(
      conditionId,
    );

    if (medicalCase == null) {
      throw new HttpErrors.NotFound('Invalid Medical Case id');
    } else if (condition == null) {
      throw new HttpErrors.NotFound('Invalid condition id');
    } else {
      medicalCase.conditionId = condition.id;
      medicalCase.doctorWhoLabeledId = session?.loggedUser.id;
      medicalCase.milliSecsToLabel = Date.now() - session?.lastLabelingRequestedAt;
      await medicalCaseRepository.update(medicalCase);
      return medicalCase;
    }
  }
}
