export function filterData(data, categoryId, id) {
  return data.filter(
    (relatedProduct) =>
      relatedProduct.category._id == categoryId && relatedProduct._id !== id
  );
}
