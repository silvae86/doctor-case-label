import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Doctor} from './doctor.model';
import {Condition} from './condition.model';

@model()
export class MedicalCase extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  ehr: string;

  @property({
    type: 'number',
  })
  milliSecsToLabel?: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Doctor)
  doctorWhoLabeledId?: string | undefined;

  @belongsTo(() => Condition)
  conditionId?: string | undefined;

  constructor(data?: Partial<MedicalCase>) {
    super(data);
  }
}

export interface MedicalCaseRelations {
  // describe navigational properties here
}

export type MedicalCaseWithRelations = MedicalCase & MedicalCaseRelations;
