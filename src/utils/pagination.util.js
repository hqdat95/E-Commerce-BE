export default async (model, paranoid, page = 1, where = {}, pageSize = 10) => {
  if (page < 1) {
    page = 1;
  }

  const totalDataCount = await model.count({ paranoid, where });

  const totalPages = Math.ceil(totalDataCount / pageSize);

  if (page > totalPages) {
    page = totalPages;
  }

  const offset = (page - 1) * pageSize;

  if (totalDataCount === 0) {
    return { totalPages: 1, data: [] };
  }

  return { totalPages, offset, limit: pageSize };
};
