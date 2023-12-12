export const InputField = {
  Text: 0,
  Number: 1,
  Date: 2,
  Reference: (query: string) => query,
  Dropdown: (options: string[]) => options.map(option => ({ id: option, name: option })),
}
