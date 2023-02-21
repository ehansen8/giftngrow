import 'reflect-metadata'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import { Model } from './abcModel'
import { Item } from './item.entity'

export class IndexCounter extends Model {
  constructor(index?: number, code?: string) {
    super()
    this.index = index
    this.code = code
    this.metadata = {
      name: 'index_counter',
      PK: 'INDEX#',
      SK: 'INDEX#',
      partialSK: 'INDEX#',
    }
  }

  @Attribute
  index: number | undefined

  @Attribute
  code: string | undefined

  @Attribute
  @AutoEpoch
  updated: number

  static fromItem(item: Item) {
    return new IndexCounter(item.index, item.id)
  }
}
