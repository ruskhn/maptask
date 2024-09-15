export const formatAddress = (address: string): string => {
  const elements = address.split(", ").reverse();
  if (elements.length > 1 && /\d/.test(elements[0])) {
    const firstElement = elements.shift();
    if (firstElement !== undefined) {
      elements.splice(1, 0, firstElement);
    }
  }
  return elements.join(", ");
};
