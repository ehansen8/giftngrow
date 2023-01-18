import PK from '../../utils/primaryKeyProperty';
import { Model } from './abcModel';

export class User extends Model {
  #metadata = {
    name: 'user',
    partitionKey: 'USER#{{email}}',
    sortKey: 'USER#{{email}}',
  }

  @PK
  email: string
  firstName: string
  city: string
  state: string

  /**@AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  }) */
  createdOn: number

  
}

type UserProps = {
  email: string;
  firstName: string;
  city: string;
  state: string;
}