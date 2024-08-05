import { PDFExtract } from "pdf.js-extract";
import { searchInfosInRange } from "../../utils/are-y-close";

import {
  xRangeEndValue,
  yRangeEndValue,
  yRangeStartValue,
  xRangeStartValue,
  xRangeEndQuantity,
  yRangeEndQuantity,
  yRangeStartQuantity,
  xRangeStartQuantity,
  xRangeEndClientNumber,
  yRangeEndClientNumber,
  yRangeStartClientNumber,
  yRangeEndReferenceMonth,
  xRangeEndReferenceMonth,
  xRangeStartClientNumber,
  yRangeStartReferenceMonth,
  xRangeStartReferenceMonth,
} from "../../contrants";

const pdfExtract = new PDFExtract();

export const createInvoice = async (filename: string) => {
  pdfExtract.extract("./src/uploads/" + filename, {}, async (err, data) => {
    if (err) throw new Error(err.message);

    if (!data) throw new Error("No data extracted from PDF");

    const pageContent = data.pages.flatMap((page) => page.content);

    const quantities = searchInfosInRange(
      pageContent,
      xRangeStartQuantity,
      xRangeEndQuantity,
      yRangeStartQuantity,
      yRangeEndQuantity
    );

    const values = searchInfosInRange(
      pageContent,
      xRangeStartValue,
      xRangeEndValue,
      yRangeStartValue,
      yRangeEndValue
    );

    const clientNumber = searchInfosInRange(
      pageContent,
      xRangeStartClientNumber,
      xRangeEndClientNumber,
      yRangeStartClientNumber,
      yRangeEndClientNumber
    );

    const referenceMonth = searchInfosInRange(
      pageContent,
      xRangeStartReferenceMonth,
      xRangeEndReferenceMonth,
      yRangeStartReferenceMonth,
      yRangeEndReferenceMonth
    );

    console.log(values, "valores");
    console.log(quantities, "quantidades");
    console.log(clientNumber, "number");
    console.log(referenceMonth, "month");
  });

  return "deu bom";
};
