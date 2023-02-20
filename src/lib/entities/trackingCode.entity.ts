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
  constructor(code: string) {
    super()
    this.code = code

    //TODO: convert to PK and SK and partialSK
    this.metadata = {
      name: 'trackingCode',
      partitionKey: 'ITEM#{{code}}',
      sortKey: 'USER#{{user}}',
      partialSortKey: 'USER#',
    }
  }

  @PK
  @Attribute
  code: string

  /** User PK */
  @Attribute
  user: string // userEmail

  @Attribute
  @AutoEpoch
  createdOn: number
}
