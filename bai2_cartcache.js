const sampleProducts = [
  { id: 101, info: { name: "Áo thun basic", price: 150000 } },
  { id: 102, info: { name: "Quần jeans slimfit", price: 300000 } },
  { id: 103, info: { name: "Giày sneaker trắng", price: 650000 } },
  { id: 104, info: { name: "Tất cổ cao", price: 35000 } },
];

const voucherMap = new Map([
  ["SALE10", 10],
  ["SALE20", 20],
  ["VIP50", 50],
  ["FREESHIP", 0],
]);

//cart là map gồm key: id, value: {name, price, quantity}
let cart = new Map();

function addToCart(productId, productInfo) {
  const item = cart.get(productId);

  // cart.set(id, info)
  cart.set(productId, item ? { ...item, quantity: item.quantity + 1 } : { ...productInfo, quantity: 1 });
}

function getTotalPrice() {
  let sum = 0;
  cart.forEach((item) => {
    sum = sum + item.price * item.quantity;
  });
  return sum;
}

function applyVoucher(voucherMap) {
  const total = getTotalPrice();

  if (total === 0) {
    return 0;
  }

  const code = prompt("Nhập mã giảm giá:");

  if (voucherMap.has(code)) {
    const discountPercent = voucherMap.get(code);
    return total * (1 - discountPercent / 100);
  }

  return total;
}
