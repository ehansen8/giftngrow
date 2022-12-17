import { Attribute, AutoGenerateAttribute, AUTO_GENERATE_ATTRIBUTE_STRATEGY, Entity, INDEX_TYPE} from '@typedorm/common'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'

@Entity({
  name: 'entry', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'BAG#{{bagId}}',
    sortKey: 'ENTRY#{{regDate}}',
    },
})

export class Entry extends Model{
  @PK
  @Attribute()
  bagId: string  // BagCode

  /**AutoGen EPOCH */
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  regDate: number

  @Attribute()
  giverFN: string
  @Attribute()
  giverCity: string
  @Attribute()
  giverState: string
  @Attribute()
  recipFN: string
  @Attribute()
  recipCity: string
  @Attribute()
  recipState: string
  @Attribute()
  occasion: string
  @Attribute()
  gift: string
  @Attribute()
  comment: string
}
