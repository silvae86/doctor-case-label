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
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Condition} from '../models';
import {ConditionRepository} from '../repositories';

export class ConditionsController {
  constructor(
    @repository(ConditionRepository)
    public conditionRepository: ConditionRepository,
  ) {}

  @post('/conditions', {
    responses: {
      '200': {
        description: 'Condition model instance',
        content: {'application/json': {schema: getModelSchemaRef(Condition)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condition, {
            title: 'NewCondition',
            exclude: ['id'],
          }),
        },
      },
    })
    condition: Omit<Condition, 'id'>,
  ): Promise<Condition> {
    return this.conditionRepository.create(condition);
  }

  @get('/conditions/count', {
    responses: {
      '200': {
        description: 'Condition model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Condition) where?: Where<Condition>,
  ): Promise<Count> {
    return this.conditionRepository.count(where);
  }

  @get('/conditions', {
    responses: {
      '200': {
        description: 'Array of Condition model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Condition, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Condition) filter?: Filter<Condition>,
  ): Promise<Condition[]> {
    return this.conditionRepository.find(filter);
  }

  @patch('/conditions', {
    responses: {
      '200': {
        description: 'Condition PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condition, {partial: true}),
        },
      },
    })
    condition: Condition,
    @param.where(Condition) where?: Where<Condition>,
  ): Promise<Count> {
    return this.conditionRepository.updateAll(condition, where);
  }

  @get('/conditions/{id}', {
    responses: {
      '200': {
        description: 'Condition model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Condition, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Condition, {exclude: 'where'})
    filter?: FilterExcludingWhere<Condition>,
  ): Promise<Condition> {
    return this.conditionRepository.findById(id, filter);
  }

  @patch('/conditions/{id}', {
    responses: {
      '204': {
        description: 'Condition PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condition, {partial: true}),
        },
      },
    })
    condition: Condition,
  ): Promise<void> {
    await this.conditionRepository.updateById(id, condition);
  }

  @put('/conditions/{id}', {
    responses: {
      '204': {
        description: 'Condition PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() condition: Condition,
  ): Promise<void> {
    await this.conditionRepository.replaceById(id, condition);
  }

  @del('/conditions/{id}', {
    responses: {
      '204': {
        description: 'Condition DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.conditionRepository.deleteById(id);
  }
}
