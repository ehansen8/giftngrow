import 'reflect-metadata'
export default function Attribute(target: any, key: string) {
  if (!target.hasOwnProperty('attributes')) {
    Object.defineProperty(target, 'attributes', {
      value: [],
      enumerable: true,
    })
  }

  target.attributes.push(key)
}

function getEpoch() {
  return Math.floor(Date.now() / 1000)
}

/**
 * Automatically stores the unix epoch in Milliseconds
 * Generated when getDBObject() is called
 * @param target  Object Class
 * @param key Attribute Name
 */
export function AutoEpoch(target: any, key: string) {
  if (!target.hasOwnProperty('auto')) {
    Object.defineProperty(target, 'auto', {
      value: [],
      enumerable: true,
    })
  }

  target.auto.push({ key: key, fn: getEpoch })
}
