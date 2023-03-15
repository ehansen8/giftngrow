import { Exception } from 'sass'

export interface Model {
  pk: string
  attributes: string[]
  auto: { key: string; fn: () => any }[]
  metadata: {
    name: string
    PK: string
    SK: string
    partialSK: string
    index?: {
      name: string
      PK: string
      SK: string
      partialSK: string
    }
  }
}

export abstract class Model {
  getPK() {
    const match = this.metadata.PK.match(/{{(.*?)}}/)
    if (!match) {
      return this.metadata.PK
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.PK.replace(`{{${attr}}}`, this[attr])
  }

  getIndexPK() {
    if (!this.metadata.index) {
      return
    }
    const match = this.metadata.index.PK.match(/{{(.*?)}}/)
    if (!match) {
      return this.metadata.index.PK
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.index.PK.replace(`{{${attr}}}`, this[attr])
  }

  getSK() {
    const match = this.metadata.SK.match(/{{(.*?)}}/)
    if (!match) {
      return this.metadata.SK
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.SK.replace(`{{${attr}}}`, this[attr])
  }

  getIndexSK() {
    if (!this.metadata.index) {
      return
    }
    const match = this.metadata.index.SK.match(/{{(.*?)}}/)
    if (!match) {
      return this.metadata.index.SK
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.index.SK.replace(`{{${attr}}}`, this[attr])
  }

  getDBObject() {
    if ('auto' in this) {
      this.auto.forEach(({ key, fn }) => {
        if (!(this as any)[key]) {
          ;(this as any)[key] = fn()
        }
      })
    }

    const dbObject: any = {
      PK: this.getPK(),
      SK: this.getSK(),
      GSI1PK: this.getIndexPK(),
      GSI1SK: this.getIndexSK(),
      __en: this.metadata.name,
    }
    this.attributes.forEach((key) => {
      if (key in this) {
        dbObject[key] = (this as any)[key]
      }
    })

    return dbObject
  }
}
