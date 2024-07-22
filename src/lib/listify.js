export function listify(array) {
  return array.map((item, index) => {
    if (index === array.length - 1) return `and ${item}`
    return item
  }).join(', ')
}
