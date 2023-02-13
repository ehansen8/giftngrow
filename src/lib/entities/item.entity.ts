import 'reflect-metadata'
import Attribute from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'

/**@Entity({
  name: 'bag', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'BAG#{{id}}',
    sortKey: 'BAG#{{id}}',
  },
}) */
//TODO: Index This with
export class Item extends Model {
  constructor(id: string) {
    super()
    this.id = id
    this.metadata = {
      name: 'item',
      partitionKey: 'BAG#{{id}}',
      sortKey: 'BAG#{{id}}',
      partialSortKey: 'BAG#',
    }
  }

  @PK
  @Attribute
  id: string // BagCode

  @Attribute
  createdOn: number
}
