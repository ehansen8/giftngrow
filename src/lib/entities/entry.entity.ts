import 'reflect-metadata'
import { AddCodeForm } from '../../../types/general'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'
import { Item } from './item.entity'

export class Entry extends Model {
  constructor() {
    super()
    //this.code = code
    this.metadata = {
      name: 'entry',
      partitionKey: 'BAG#{{code}}',
      sortKey: 'ENTRY#{{regDate}}',
      partialSortKey: 'ENTRY#',
    }
  }

  fromObject(obj: AddCodeForm) {
    Object.assign(this, obj)
  }

  getItem() {
    return new Item(this.code)
  }

  @PK
  @Attribute
  code: string // BagCode

  @Attribute
  @AutoEpoch
  regDate: number

  @Attribute
  giverFN: string

  @Attribute
  giverCity: string

  @Attribute
  giverState: string

  @Attribute
  recipFN: string

  @Attribute
  recipCity: string

  @Attribute
  recipState: string

  @Attribute
  occasion: string

  @Attribute
  gift: string

  @Attribute
  comment: string
}
