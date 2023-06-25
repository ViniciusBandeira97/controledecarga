export function objectToForEach(
  // eslint-disable-next-line
  obj: Object,
  calback: (key: string, value: string) => void
) {
  const arrKeys = Object.keys(obj);
  const arrValues = Object.values(obj);

  arrKeys.forEach((key, index) => {
    const value = arrValues[index];

    calback(key, value);
  });
}
