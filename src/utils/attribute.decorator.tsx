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
