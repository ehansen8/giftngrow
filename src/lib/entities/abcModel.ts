export interface Model {
  pk: string
  attributes: string[]
  auto: { key: string; fn: () => any }[]
  metadata: {
    name: string
    partitionKey: string
    sortKey: string
    partialSortKey: string
  }
}

export abstract class Model {
  getPK() {
    const match = this.metadata.partitionKey.match(/{{(.*?)}}/)
    if (!match) {
      return
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.partitionKey.replace(`{{${attr}}}`, this[attr])
  }

  getSK() {
    const match = this.metadata.sortKey.match(/{{(.*?)}}/)
    if (!match) {
      return
    }
    const attr = match[1]
    //@ts-ignore
    return this.metadata.sortKey.replace(`{{${attr}}}`, this[attr])
  }

  getDBObject() {
    if ('auto' in this) {
      this.auto.forEach(({ key, fn }) => {
        ;(this as any)[key] = fn()
      })
    }

    const dbObject: any = {
      PK: this.getPK(),
      SK: this.getSK(),
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
