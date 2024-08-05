import { PDFExtract } from 'pdf.js-extract';
import { v2 as cloudinary } from 'cloudinary';

import {
  xRangeEndValue,
  yRangeEndValue,
  xRangeStartValue,
  yRangeStartValue,
  xRangeEndQuantity,
  yRangeEndQuantity,
  yRangeStartQuantity,
  xRangeStartQuantity,
  xRangeEndClientNumber,
  yRangeEndClientNumber,
  xRangeEndReferenceMonth,
  yRangeEndReferenceMonth,
  yRangeStartClientNumber,
  xRangeStartClientNumber,
  xRangeStartReferenceMonth,
  yRangeStartReferenceMonth
} from '../../contrants';

import { searchInfosInRange } from '../../utils/search-in-range';

const pdfExtract = new PDFExtract();

export const createInvoice = async (filename: string) => {
  pdfExtract.extract('./src/uploads/' + filename, {}, async (err, data) => {
    if (err) throw new Error(err.message);

    if (!data) throw new Error('No data extracted from PDF');

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

    // console.log(values, 'valores');
    // console.log(quantities, 'quantidades');
    // console.log(clientNumber, 'number');
    // console.log(referenceMonth, 'month');
  });

  const uploadedFile = await cloudinary.uploader
    .upload('./src/uploads/' + filename, { folder: 'voltinsight' })
    .then((result) => result.url)
    .catch((err) => {
      console.log(JSON.stringify(err, null, 2));
      throw new Error(err.message);
    });

  console.log(uploadedFile, 'uploaded file');

  return 'deu bom';
};
