import 'reflect-metadata'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'

/**The Constructor should contain all the attributes required to form the partitionKey and sortKey */
export class User extends Model {
  constructor(email: string) {
    super()
    this.email = email
    this.metadata = {
      name: 'user',
      PK: 'USER#{{email}}',
      SK: 'USER#{{email}}',
      partialSK: 'USER#',
    }
  }

  @PK
  @Attribute
  email: string

  @Attribute
  firstName?: string

  @Attribute
  city?: string

  @Attribute
  state?: string

  @Attribute
  @AutoEpoch
  createdOn: number
}

type UserProps = {
  email: string
  firstName: string
  city: string
  state: string
}
