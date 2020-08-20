/**
 * @typedef {Object} execAsyncReturn
 * @property {error} err
 * @property {Object} data
 */
/**
 * execAsync function to execute async functions
 * @param  {function} fn - any async function
 * @returns {execAsyncReturn}
 */
exports.execAsync = async (fn) =>
  new Promise((resolve) => {
    fn()
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        resolve({ err });
      });
  });

exports.randomNumber = (length) => {
  const text = "";
  const possible = "123456789";
  for (const i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  console.log(text);
  return Number(text);
};

/**
 * @typedef SortBy
 * @enum
 * @value {createdOn} - ascending order
 * @value {-createdOn} - descending order
 */
/**
 * @function parsePagination - parse query params and returns pagination object
 * @param {Object} query -
 * @returns {{pageNo:Number, pageSize: Number, sortBy: SortBy}} pagination
 */
exports.parsePagination = (query) => ({
  pageNo: Number.parseInt(query.pageNo, 10) || 1,
  pageSize: Number.parseInt(query.pageSize, 10) || 20,
  // Default page size, TODO: Read from config file
  sortBy: query.sortBy || "-_id",
});
