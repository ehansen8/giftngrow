import 'reflect-metadata'
import * as general from '../../../types/general'
import type { Coords } from '../../../types/general'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { Model } from './abcModel'
import { Item } from './item.entity'

export interface IEntry {
  code: string
  regDate: number
  giverFN: string
  giverCity: string
  giverState: string
  giverCoords?: Coords
  recipFN: string
  recipCity: string
  recipState: string
  recipCoords?: Coords
  occasion: string
  gift: string
  comment: string
}
export class Entry extends Model {
  constructor() {
    super()
    //this.code = code
    this.metadata = {
      name: 'entry',
      PK: 'ITEM#{{code}}',
      SK: 'ENTRY#{{regDate}}',
      partialSK: 'ENTRY#',
      index: {
        name: 'GSI1',
        PK: 'ENTRY#',
        SK: 'ENTRY#{{regDate}}',
        partialSK: 'ENTRY#',
      },
    }
  }

  static fromObject(obj: general.AddCodeForm) {
    return Object.assign(new Entry(), obj) as Entry
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
  giverCoords: Coords

  @Attribute
  recipFN: string

  @Attribute
  recipCity: string

  @Attribute
  recipState: string

  @Attribute
  recipCoords: Coords

  @Attribute
  occasion: string

  @Attribute
  gift: string

  @Attribute
  comment: string

  static Headers = [
    { index: 'code', display: 'Code' },
    { index: 'regDate', display: 'Reg. Date' },
    { index: 'giverFN', display: 'Giver Name' },
    { index: 'giverCity', display: 'Giver City' },
    { index: 'giverState', display: 'Giver State' },
    { index: 'giverCoords', display: 'Giver Coords' },
    { index: 'recipFN', display: 'Recip Name' },
    { index: 'recipCity', display: 'Recip City' },
    { index: 'recipState', display: 'Recip State' },
    { index: 'recipCoords', display: 'Recip Coords' },
    { index: 'occasion', display: 'Occasion' },
    { index: 'gift', display: 'Gift' },
    { index: 'comment', display: 'Comment' },
  ]
}
