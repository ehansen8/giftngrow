import 'reflect-metadata'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { PageItem } from '../codeGenerator'
import { Model } from './abcModel'

export class Item extends Model {
  constructor(id: string, index?: number) {
    super()
    this.id = id
    this.index = index
    this.metadata = {
      name: 'item',
      partitionKey: 'ITEM#{{id}}',
      sortKey: 'CREATED#{{createdAt}}',
      partialSortKey: 'CREATED#',
      // index: {
      //   name: 'GSI1',
      //   PK: 'INDEX#',
      //   SK: 'INDEX#{{index}}',
      //   partialSK: 'INDEX#',
      // },
    }
  }

  @PK
  @Attribute
  id: string // Item Code

  /**
   * The codes sequence position from the generator
   */
  @Attribute
  index?: number

  @Attribute
  @AutoEpoch
  createdAt: number

  /**
   *
   * @param page A list of codes strings
   * @param lastIdx The sequence index of the last code created
   * @returns The same list converted to a list of Items
   */
  static fromPage(page: PageItem[]) {
    return page.map(({ code, index }) => new Item(code, index))
  }
}
