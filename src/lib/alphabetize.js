export function alphabetize(array) {
  return [...array].sort((a, b) => a.localeCompare(b))
}