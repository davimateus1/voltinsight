import { PDFExtractText } from "pdf.js-extract";

const isInRange = (value: number, rangeStart: number, rangeEnd: number) => {
  return value >= rangeStart && value <= rangeEnd;
};

export const searchInfosInRange = (
  data: PDFExtractText[],
  xRangeStart: number,
  xRangeEnd: number,
  yRangeStart: number,
  yRangeEnd: number
) => {
  return data
    .filter(
      (item) =>
        isInRange(item.x, xRangeStart, xRangeEnd) &&
        isInRange(item.y, yRangeStart, yRangeEnd)
    )
    .filter((item) => item.str.trim() !== "");
};
