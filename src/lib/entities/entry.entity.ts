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
  bagId: string  // BagCode

  /**AutoGen EPOCH */
 /** @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  }) */
  regDate: number

  giverFN: string
  giverCity: string
  giverState: string
  recipFN: string
  recipCity: string
  recipState: string
  occasion: string
  gift: string
  comment: string
}
