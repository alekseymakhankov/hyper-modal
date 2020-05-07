export type ClassNamesObjectProps = { [key: string]: boolean };

export type ClassNamesProps = string | undefined;

export const convertObjectToString = (classes: { [key: string]: boolean }): string => {
  if (!classes) {
    return ''
  }
  return Object
    .keys(classes)
    .filter((key: string) => !!classes[key])
    .reduce(
      (classString, item) => (classString
        ? `${classString}${item ? ` ${item}` : ''}`
        : `${item}`),
      '',
    )
}

export const classnames = (
  ...classes: (ClassNamesObjectProps | ClassNamesProps)[]
) => {
  if (classes[0] && typeof classes[0] === 'string') {
    return classes.join(' ')
  }
  return convertObjectToString(classes[0] as ClassNamesObjectProps)
}
