import {Attribute, AutoGenerateAttribute, AUTO_GENERATE_ATTRIBUTE_STRATEGY, Entity,} from '@typedorm/common';
import 'reflect-metadata'
import PK from '../../utils/primaryKeyProperty';
import { Model } from './abcModel';


@Entity({
  name: 'user', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'USER#{{email}}',
    sortKey: 'USER#{{email}}',
  },
 
})
  
export class User extends Model {
  @PK
  @Attribute()
  email: string

  @Attribute()
  firstName: string

  @Attribute()
  city: string

  @Attribute()
  state: string

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdOn: number
  
  constructor({email, firstName, city, state}:UserProps) {
    super()
    this.email = email
    this.firstName = firstName
    this.city = city
    this.state = state
  }
}

type UserProps = {
  email: string;
  firstName: string;
  city: string;
  state: string;
}