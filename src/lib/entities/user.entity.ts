import 'reflect-metadata'
import Attribute from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'

/**The Constructor should contain all the attributes required to form the partitionKey and sortKey */
export class User extends Model {
  constructor(email: string) {
    super()
    this.email = email
    this.metadata = {
      name: 'user',
      partitionKey: 'USER#{{email}}',
      sortKey: 'USER#{{email}}',
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

  /**@AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  }) */
  createdOn: number
}

type UserProps = {
  email: string
  firstName: string
  city: string
  state: string
}
