import { create } from 'domain';
import PK from '../../utils/primaryKeyProperty';
import { Model } from './abcModel';


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
  
export class TrackingCode extends Model {

  @PK
  code: string

  /** User PK */
  user: string // userEmail

  /**@AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  }) */
  createdOn: number
}

type TrackingProps = {
  code: string
  user: string
  createdOn: number
}
