import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';
import { v2 as cloudinary } from 'cloudinary';

import { db } from '../../utils/prisma';
import { replaceValue } from '../../utils/replace-value';
import { searchInfosInRange } from '../../utils/search-in-range';

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

    const uploadedFile = await cloudinary.uploader
      .upload('./src/uploads/' + filename, { folder: 'voltinsight' })
      .then((result) => result.url)
      .catch((err) => {
        throw new Error(err.message);
      });

    db.invoice
      .create({
        data: {
          clientDocumentUrl: uploadedFile,
          clientNumber: clientNumber[0].str,
          referenceMonth: referenceMonth[0].str,
          electricEnergyPrice: replaceValue(values[0].str),
          sceeeEnergyPriceWithoutIcms: replaceValue(values[1].str),
          compensatedEnergyPrice: replaceValue(values[2].str),
          municipalPublicLightingPrice: replaceValue(values[3].str),
          electricEnergyQuantity: replaceValue(quantities[0].str),
          sceeeEnergyQuantityWithoutIcms: replaceValue(quantities[1].str),
          compensatedEnergyQuantity: replaceValue(quantities[2].str)
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    fs.unlinkSync('./src/uploads/' + filename);
  });

  return 'Invoice created successfully';
};

export const getInvoices = async (clientNumber?: string) => {
  const result = await db.invoice.findMany({
    orderBy: { referenceMonth: 'asc' },
    ...(clientNumber && { where: { clientNumber } })
  });

  //TODO: SORT BY DATE
  return result;
};
