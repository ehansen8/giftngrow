import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import PK from '../../utils/primaryKeyProperty'
import { entityManager } from '../entityManager'
import { Model } from './abcModel'

/**Need Tracking code so user can sub/unsub from specifically tracking that code */

export interface ITrackingCode {
  code: string
  /** User Email */
  user?: string
  createdOn?: number
}
export class TrackingCode extends Model {
  constructor(code?: string, email?: string) {
    super()
    if (code) this.code = code
    if (email) this.user = email

    this.metadata = {
      name: 'tracking_code',
      PK: 'ITEM#{{code}}',
      SK: 'USER#{{user}}',
      partialSK: 'USER#',
      index: {
        name: 'GSI1',
        PK: 'USER#{{user}}',
        SK: 'ITEM#{{code}}',
        partialSK: 'ITEM#',
      },
    }
  }

  static forUser(email: string) {
    return new TrackingCode('', email)
  }

  static delete(code: string, email: string) {
    return entityManager.delete(new TrackingCode(code, email))
  }

  @PK
  @Attribute
  code: string

  /** User Email */
  @Attribute
  user: string

  @Attribute
  @AutoEpoch
  createdOn: number
}
