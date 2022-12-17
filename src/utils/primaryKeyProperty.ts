export default function PK(target: any, key: string) {
  Object.defineProperty(target, 'pk', {
    get: function() {
      return this[key];
    },
    set: function(value: any) {
      this[key] = value;
    }
  });
}
  