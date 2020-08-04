import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
} from '@loopback/rest';
import {MedicalCase} from '../models';
import {MedicalCaseRepository} from '../repositories';

export class MedicalCasesController {
  constructor(
    @repository(MedicalCaseRepository)
    public medicalCaseRepository : MedicalCaseRepository,
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
                schema: getModelSchemaRef(MedicalCase, {includeRelations: true}),
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
    return this.medicalCaseRepository.findOne({where: {doctorWhoLabeledId: undefined}});
  }
}
