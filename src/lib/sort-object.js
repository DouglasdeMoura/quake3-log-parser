export function sortObject(object) {
  return Object
    .keys(object)
    .sort(([, a], [, b]) => b - a)
    .reduce((sortedObject, key) => {
      sortedObject[key] = object[key]
      return sortedObject
    }, {})
}