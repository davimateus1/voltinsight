const toNumber = (value: unknown): number => {
  return typeof value === "number" ? value : 0;
};

export const aggregateDataByMonth = <T extends { referenceMonth: string }>(
  data: T[],
  keysToAggregate: Array<keyof T>
): T[] => {
  return data.reduce((acc: T[], item) => {
    const existingItem = acc.find(
      (i) => i.referenceMonth === item.referenceMonth
    );

    if (existingItem) {
      keysToAggregate.forEach((key) => {
        if (item[key] !== undefined) {
          existingItem[key] = (toNumber(existingItem[key] as number) +
            toNumber(item[key] as number)) as unknown as T[keyof T];
        }
      });
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, []);
};
