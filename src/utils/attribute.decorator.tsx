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

export function AutoEpoch(target: any, key: string) {
  if (!target.hasOwnProperty('auto')) {
    Object.defineProperty(target, 'auto', {
      value: [],
      enumerable: true,
    })
  }

  target.auto.push({ key: key, fn: getEpoch })
}
