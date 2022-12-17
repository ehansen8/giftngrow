import { Attribute, AutoGenerateAttribute, AUTO_GENERATE_ATTRIBUTE_STRATEGY, Entity } from '@typedorm/common'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'


@Entity({
  name: 'bag', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'BAG#{{id}}',
    sortKey: 'BAG#{{id}}',
  },
})
export class Bag extends Model {
  @PK
  @Attribute()
  id: string  // BagCode

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdOn: number
  
}
