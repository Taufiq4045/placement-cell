import { parseAsync } from 'json2csv';

export const generateCSV = async (data, options) => {
  try {
    const csv = await parseAsync(data, options);
    return csv;
  } catch (err) {
    throw new Error('Error generating CSV');
  }
};
