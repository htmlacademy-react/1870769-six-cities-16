function groupBy<T, K extends string | number | symbol>(
  list: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return list.reduce((result, currentItem) => {
    const key = getKey(currentItem);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(currentItem);
    return result;
  }, {} as Record<K, T[]>);
}

const getTitleForRatingStar = (
  starNumber: number
): 'terribly' | 'badly' | 'not bad' | 'good' | 'perfect' => {
  switch (starNumber) {
    case 1:
      return 'terribly';
    case 2:
      return 'badly';
    case 3:
      return 'not bad';
    case 4:
      return 'good';
    case 5:
      return 'perfect';
    default:
      throw new Error(`Unexpected star number: ${starNumber}`);
  }
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export { groupBy, getTitleForRatingStar, formatDate };
