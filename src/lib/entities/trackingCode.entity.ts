import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'

/**@Entity({
  name: 'trackingCode', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'BAG#{{code}}',
    sortKey: 'USER#{{user}}',
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'USER#{{user}}',
            sortKey: 'BAG#{{code}}'
      }
    }
}) */
/**Need Tracking code so user can sub/unsub from specifically tracking that code */
export class TrackingCode extends Model {
  constructor(code?: string, email?: string) {
    super()
    if (code) this.code = code
    if (email) this.user = email

    this.metadata = {
      name: 'tracking_code',
      PK: 'ITEM#{{code}}',
      SK: 'USER#{{user}}',
      partialSK: 'USER#',
      index: {
        name: 'GSI1',
        PK: 'USER#{{user}}',
        SK: 'ITEM#{{code}}',
        partialSK: 'ITEM#',
      },
    }
  }

  static forUser(email: string) {
    return new TrackingCode('', email)
  }

  @PK
  @Attribute
  code: string

  /** User Email */
  @Attribute
  user: string

  @Attribute
  @AutoEpoch
  createdOn: number
}
