import fs from 'fs';
import { PDFExtract } from 'pdf.js-extract';

import { db } from '../../utils/prisma';
import { monthIndex } from '../../utils/consts';

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

    if (
      !quantities.length ||
      !values.length ||
      !clientNumber.length ||
      !referenceMonth.length
    )
      throw new Error('Invalid PDF file');

    db.invoice
      .create({
        data: {
          clientDocumentUrl: 'todo-url',
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
        console.error('Error creating invoice:', err);
        throw new Error(err.message);
      });

    fs.unlinkSync('./src/uploads/' + filename);
  });

  return 'Invoice created successfully';
};

export const getInvoices = async (clientNumber?: string) => {
  const result = await db.invoice.findMany({
    ...(clientNumber && { where: { clientNumber } })
  });

  const sortedResult = result.sort((a, b) => {
    const [monthA, yearA] = a.referenceMonth.split('/');
    const [monthB, yearB] = b.referenceMonth.split('/');

    const monthIndexA = monthIndex[monthA];
    const monthIndexB = monthIndex[monthB];

    if (yearA === yearB) return monthIndexA - monthIndexB;

    return parseInt(yearA) - parseInt(yearB);
  });

  return sortedResult;
};

export const deleteInvoice = async (id: string) => {
  const invoice = await db.invoice.findUnique({ where: { id } });

  if (!invoice) throw new Error('Invoice not found');

  await db.invoice.delete({ where: { id } });

  return 'Invoice deleted successfully';
};

export const bulkDeleteInvoices = async (ids: string[]) => {
  const invoices = await db.invoice.findMany({ where: { id: { in: ids } } });

  if (!invoices.length) throw new Error('Invoices not found');

  await db.invoice.deleteMany({ where: { id: { in: ids } } });

  return 'Invoices deleted successfully';
};
