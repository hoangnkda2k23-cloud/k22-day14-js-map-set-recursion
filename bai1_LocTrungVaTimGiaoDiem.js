const userA_searches = ["áo thun", "quần jeans", "áo khoác", "áo thun", "giày cừu"];
const userB_searches = ["quần jeans", "mũ bảo hiểm", "giày cừu", "balo"];

function getUniqueTags(arr) {
  return [...new Set(arr)];
}
// console.log(getUniqueTags(userA_searches));
function getCommonTags(arr1, arr2) {
  const arr = getUniqueTags(arr1);
  const setB = new Set(arr2);
  return arr.filter((tag) => setB.has(tag));
}
// console.log(getCommonTags(userA_searches, userB_searches));
