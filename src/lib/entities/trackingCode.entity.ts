import { Attribute, AutoGenerateAttribute, AUTO_GENERATE_ATTRIBUTE_STRATEGY, Entity, INDEX_TYPE} from '@typedorm/common'
import 'reflect-metadata'
import PK from '../../utils/primaryKeyProperty';
import { Model } from './abcModel';


@Entity({
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
})
  
export class TrackingCode extends Model {
  @PK
  @Attribute()
  code: string

  /** User PK */
  @Attribute()
  user: string // userEmail

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdOn: number

  
  /* constructor({code, user}:TrackingProps) {
    super()
    this.code = code
    this.user = user
  } */
}

type TrackingProps = {
  code: string;
  user: string;
}
