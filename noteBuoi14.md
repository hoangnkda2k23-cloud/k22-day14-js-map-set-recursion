# Day 14: Map, Set, JSON, Error, Scope, Context, Closure, Recursion trong JavaScript

## 1. Map

`Map` là một tập hợp các cặp key - value (khóa - giá trị) tương tự như Object. Tuy nhiên, điểm khác biệt lớn nhất là key của `Map` có thể là bất kỳ kiểu dữ liệu nào (Object, Function, Number, Boolean,...), trong khi key của Object thông thường chỉ có thể là String hoặc Symbol.

```js
const myMap = new Map();

// Thêm dữ liệu với các kiểu key khác nhau
myMap.set("name", "Nguyễn Văn A");
myMap.set(123, "Mã ID");
myMap.set(true, "Trạng thái kích hoạt");

console.log(myMap.get("name")); // Nguyễn Văn A
console.log(myMap.get(123)); // Mã ID
```

### Các Method và Property hay dùng

| Method / Property | Công dụng                                             |
| ----------------- | ----------------------------------------------------- |
| `set(key, value)` | Thêm hoặc cập nhật cặp key-value                      |
| `get(key)`        | Lấy giá trị tương ứng với key                         |
| `has(key)`        | Kiểm tra key có tồn tại không (trả về `true`/`false`) |
| `delete(key)`     | Xóa cặp key-value                                     |
| `clear()`         | Xóa toàn bộ phần tử trong Map                         |
| `size`            | Lấy số lượng phần tử trong Map                        |

### Duyệt qua Map

```js
const userRoles = new Map([
  ["admin", "Quản trị viên"],
  ["editor", "Biên tập viên"],
  ["viewer", "Người xem"],
]);

// Duyệt qua cả key và value
for (const [key, value] of userRoles) {
  console.log(`${key}: ${value}`);
}

// Hoặc sử dụng forEach
userRoles.forEach((value, key) => {
  console.log(`${key} -> ${value}`);
});
```

Lưu ý:

- `Map` giữ nguyên thứ tự thêm vào khi duyệt qua các phần tử.
- Dùng `myMap.size` để lấy độ dài thay vì `Object.keys(obj).length`.

---

## 2. Set

`Set` là một tập hợp các giá trị duy nhất (không chứa các phần tử trùng lặp).

```js
const numbers = new Set([1, 2, 2, 3, 4, 4, 5]);

console.log(numbers); // Set(5) { 1, 2, 3, 4, 5 }
```

### Các Method và Property hay dùng

| Method / Property | Công dụng                                          |
| ----------------- | -------------------------------------------------- |
| `add(value)`      | Thêm một giá trị mới                               |
| `has(value)`      | Kiểm tra giá trị có tồn tại không (`true`/`false`) |
| `delete(value)`   | Xóa một giá trị                                    |
| `clear()`         | Xóa toàn bộ giá trị trong Set                      |
| `size`            | Lấy số lượng phần tử trong Set                     |

```js
const tags = new Set();

tags.add("javascript");
tags.add("nodejs");
tags.add("javascript"); // Bị bỏ qua vì đã tồn tại

console.log(tags.has("nodejs")); // true
console.log(tags.size); // 2
```

### Tác dụng phổ biến: Lọc phần tử trùng lặp trong Array

```js
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
```

---

## 3. JSON

`JSON` (JavaScript Object Notation) là một định dạng dữ liệu dựa trên văn bản, dùng để trao đổi dữ liệu giữa client và server.

### 2 Method quan trọng nhất

#### 1. `JSON.stringify()` - Chuyển Object/Array thành chuỗi JSON

```js
const user = {
  name: "Nguyễn Văn A",
  age: 20,
  skills: ["JS", "React"],
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
// Output: '{"name":"Nguyễn Văn A","age":20,"skills":["JS","React"]}'
```

#### 2. `JSON.parse()` - Chuyển chuỗi JSON thành Object/Array

```js
const jsonString = '{"name":"Nguyễn Văn A","age":20}';

const userObject = JSON.parse(jsonString);
console.log(userObject.name); // Nguyễn Văn A
```

Lưu ý khi dùng JSON:

- Khóa (Key) trong chuỗi JSON chuẩn bắt buộc phải bọc trong dấu ngoặc kép `""`.
- JSON không hỗ trợ lưu trữ hàm (`function`), `undefined` hay biểu thức logic.

---

## 4. Error (Bắt và xử lý lỗi)

Xử lý lỗi giúp chương trình không bị đứt quãng (crash) khi gặp sự cố đột ngột trong quá trình chạy (ví dụ: mất kết nối mạng, dữ liệu nhập không hợp lệ,...).

### Cú pháp `try...catch...finally`

```js
try {
  // Đoạn code có thể phát sinh lỗi
  const result = 10 / x; // Lỗi x chưa khai báo
  console.log(result);
} catch (error) {
  // Chạy khi có lỗi xảy ra ở khối try
  console.log("Đã có lỗi xảy ra:", error.message);
} finally {
  // Luôn chạy dù có lỗi hay không (dùng để đóng kết nối, dọn dẹp tài nguyên...)
  console.log("Hoàn thành tiến trình");
}
```

### Tự tạo lỗi với `throw`

Bạn có thể chủ động bắn ra lỗi bằng từ khóa `throw` kết hợp với đối tượng `Error`.

```js
function checkAge(age) {
  if (age < 18) {
    throw new Error("Bạn chưa đủ 18 tuổi!");
  }
  return "Truy cập thành công";
}

try {
  console.log(checkAge(15));
} catch (err) {
  console.error("Lỗi:", err.message); // Lỗi: Bạn chưa đủ 18 tuổi!
}
```

Các thuộc tính thường dùng của đối tượng `Error`:

- `error.name`: Tên loại lỗi.
- `error.message`: Thông điệp mô tả lỗi.
- `error.stack`: Dấu vết ngăn xếp (stack trace) hỗ trợ debug.

---

## 5. Scope (Phạm vi truy cập)

`Scope` xác định những nơi có thể truy cập một biến, hàm, class,... Khi viết chức năng, nên khai báo biến trong phạm vi cần dùng để tránh ảnh hưởng đến các phần khác của chương trình.

### Các phạm vi thường gặp

| Phạm vi        | Công dụng / Đặc điểm                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Global scope   | Biến ở phạm vi toàn cục, có thể được truy cập từ các phạm vi bên trong                                     |
| Function scope | Tham số và biến khai báo trong hàm chỉ được truy cập bên trong hàm đó                                      |
| Block scope    | Biến khai báo bằng `let`, `const` trong khối `{}` chỉ được truy cập trong khối đó và các phạm vi bên trong |

### Ứng dụng: Tính giá đơn hàng, tách riêng dữ liệu của từng lần tính

```js
function calculateOrderTotal(price, quantity, isMember) {
  const subtotal = price * quantity;
  let total = subtotal;

  if (isMember) {
    const discount = subtotal * 0.1;
    total -= discount;
    // discount chỉ dùng trong khối if này
  }

  // Không thể truy cập discount ở đây
  return total;
}

console.log(calculateOrderTotal(100000, 2, true)); // 180000
console.log(calculateOrderTotal(100000, 2, false)); // 200000
```

`subtotal`, `total` và các tham số thuộc phạm vi của hàm. Mỗi lần gọi hàm có các biến riêng, nên tính đơn hàng này không làm thay đổi kết quả của đơn hàng khác.

Lưu ý:

- Phạm vi bên trong có thể truy cập biến của phạm vi bên ngoài, nhưng chiều ngược lại thì không.
- `var` không có block scope; nên ưu tiên `const`, dùng `let` khi cần gán lại giá trị.
- Biến ở cấp cao nhất của một JavaScript module thuộc phạm vi module, không tự trở thành biến toàn cục.

---

## 6. Context (Execution Context - Ngữ cảnh thực thi)

`Execution Context` là môi trường JavaScript sử dụng để thực thi code, theo dõi các biến, phạm vi truy cập và thông tin như `this` của đoạn code đang chạy.

```text
Execution Context
├── Global Execution Context
├── Function Execution Context
└── Eval Execution Context
```

### 1. Global Execution Context (Ngữ cảnh thực thi toàn cục)

Là ngữ cảnh thực thi phần code ở cấp cao nhất của script, bên ngoài các hàm. Trong ứng dụng, đây thường là nơi khai báo cấu hình và chạy code khởi tạo.

Ví dụ trong một script thông thường trên trình duyệt (`<script>` không có `type="module"`):

```js
const shopName = "F8 Shop";
const shippingFee = 30000;

function calculateTotal(subtotal) {
  return subtotal + shippingFee;
}

// Code khởi tạo chạy trong Global Execution Context
console.log("Cửa hàng:", shopName); // Cửa hàng: F8 Shop
console.log(calculateTotal(200000)); // 230000
```

Các lệnh ở ngoài hàm chạy trong Global Execution Context. Khi gọi `calculateTotal(200000)`, JavaScript tạo một Function Execution Context để chạy phần thân hàm, sau đó quay lại thực hiện phần code gọi hàm.

Lưu ý:

- Trong script thông thường trên trình duyệt, `this` ở cấp cao nhất là `window`.
- Biến toàn cục khai báo bằng `let`, `const` không trở thành thuộc tính của `window`.
- JavaScript module có môi trường module riêng; `this` ở cấp cao nhất của module là `undefined`.

### 2. Function Execution Context (Ngữ cảnh thực thi hàm)

Mỗi lần gọi một hàm, JavaScript tạo một Function Execution Context mới. Mỗi lần gọi có tham số và biến cục bộ riêng, kể cả khi gọi lại cùng một hàm.

### Ứng dụng: Tính tiền cho nhiều đơn hàng

```js
function calculateSubtotal(price, quantity) {
  const subtotal = price * quantity;
  return subtotal;
}

function calculateOrderTotal(price, quantity, shippingFee) {
  const subtotal = calculateSubtotal(price, quantity);
  const total = subtotal + shippingFee;
  return total;
}

console.log(calculateOrderTotal(100000, 2, 30000)); // 230000
console.log(calculateOrderTotal(150000, 1, 0)); // 150000
```

Khi tính đơn hàng đầu tiên:

1. Gọi `calculateOrderTotal()` → tạo context với `price = 100000`, `quantity = 2`, `shippingFee = 30000`.
2. Hàm gọi tiếp `calculateSubtotal()` → tạo context mới để tính `subtotal = 200000`; context của `calculateOrderTotal()` tạm chờ.
3. `calculateSubtotal()` trả kết quả → context của hàm này được lấy ra khỏi call stack, tiếp tục chạy `calculateOrderTotal()`.
4. `calculateOrderTotal()` trả về `230000` → context của nó được lấy ra khỏi call stack, chương trình tiếp tục ở nơi gọi hàm.

Đơn hàng thứ hai tạo các context mới với dữ liệu riêng. Các lời gọi hàm được quản lý bằng **call stack**: hàm gọi sau nằm trên cùng và được xử lý trước khi quay lại hàm đang chờ bên dưới.

### 3. Eval Execution Context (Ngữ cảnh thực thi eval)

Khi `eval()` thực thi một chuỗi chứa code JavaScript, JavaScript tạo ngữ cảnh thực thi cho đoạn code đó.

### Trường hợp có thể gặp: Đọc code cũ tính giá từ công thức dạng chuỗi

```js
function calculateLegacyPrice(price, quantity) {
  "use strict";

  // Giả sử công thức này nằm cố định trong mã nguồn của hệ thống cũ
  const formula = "price * quantity";
  const total = eval(formula);
  return total;
}

console.log(calculateLegacyPrice(100000, 2)); // 200000
```

Trong ví dụ này, `eval(formula)` là lời gọi **eval trực tiếp**. Code trong chuỗi có thể truy cập `price`, `quantity` từ môi trường của hàm đang gọi nó. Sau khi tính biểu thức, `eval()` trả kết quả để hàm tiếp tục chạy.

Trong code mới, công thức trên nên viết trực tiếp thành `const total = price * quantity`. Ví dụ dùng `eval()` để nhận biết và hiểu cách code cũ chạy, không phải cách nên chọn để xây dựng chức năng tính giá.

Lưu ý:

- Không đưa dữ liệu người dùng nhập vào `eval()` vì chuỗi đó được thực thi như code JavaScript.
- Eval trực tiếp có thể dùng môi trường tại nơi gọi; eval gián tiếp như `(0, eval)(code)` thực thi code trong môi trường toàn cục.
- `Scope` xác định nơi có thể truy cập biến; `Execution Context` quản lý việc thực thi code. `this` chỉ là một phần thông tin liên quan, không đồng nghĩa với toàn bộ Execution Context.

---

## 7. Closure (Hàm ghi nhớ phạm vi bên ngoài)

`Closure` là khi một hàm vẫn truy cập được các biến trong phạm vi bên ngoài nơi nó được tạo, kể cả sau khi hàm bên ngoài đã chạy xong.

### Ứng dụng: Debounce ô tìm kiếm

Khi người dùng gõ liên tục, không cần thực hiện tìm kiếm ở mỗi lần nhập. `Debounce` giúp chờ người dùng ngừng gõ một khoảng thời gian rồi mới chạy chức năng tìm kiếm.

```js
function debounce(callback, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

const searchProducts = debounce((keyword) => {
  // Có thể đặt logic lọc sản phẩm hoặc gọi API tìm kiếm tại đây
  console.log("Tìm sản phẩm:", keyword);
}, 500);

// Giả sử người dùng nhập liên tiếp trong vòng 500ms
searchProducts("á");
searchProducts("áo");
searchProducts("áo thun");

// Sau khoảng 500ms kể từ lần gọi cuối, chỉ in một lần:
// Tìm sản phẩm: áo thun
```

Hàm được trả về vẫn truy cập được `timerId`, `callback` và `delay` sau khi `debounce()` chạy xong. Nhờ đó, mỗi lần nhập mới có thể hủy lần hẹn tìm kiếm trước đó.

Để dùng với ô nhập `<input id="search" placeholder="Tìm sản phẩm">`, đặt đoạn JavaScript sau phía dưới ô nhập:

```js
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (event) => {
  searchProducts(event.target.value);
});
```

Lưu ý:

- Tạo `searchProducts` một lần ở bên ngoài listener. Nếu gọi `debounce()` lại mỗi lần nhập, mỗi hàm mới sẽ có `timerId` riêng và không hủy được lịch hẹn trước đó.
- Mỗi lần gọi `debounce()` tạo một closure riêng, nên có thể dùng độc lập cho nhiều ô tìm kiếm.
- Closure giữ quyền truy cập vào biến, không phải một bản sao giá trị tại thời điểm tạo hàm.
- Debounce chỉ hủy lịch hẹn chưa chạy; không tự hủy request API đã gửi đi.

---

## 8. Recursion (Đệ quy)

`Recursion` là khi một hàm gọi lại chính nó để xử lý phần nhỏ hơn của bài toán. Cách này thường dùng với dữ liệu có nhiều cấp lồng nhau như danh mục sản phẩm, menu hoặc thư mục.

### Ứng dụng: Tìm danh mục theo ID trong cây danh mục nhiều cấp

```js
const categories = [
  {
    id: 1,
    name: "Thời trang",
    children: [
      {
        id: 2,
        name: "Nam",
        children: [
          { id: 3, name: "Áo thun", children: [] },
          { id: 4, name: "Quần jeans", children: [] },
        ],
      },
    ],
  },
  { id: 5, name: "Đồ gia dụng", children: [] },
];

function findCategoryById(categories, targetId) {
  for (const category of categories) {
    if (category.id === targetId) {
      return category;
    }

    const found = findCategoryById(category.children ?? [], targetId);

    if (found !== null) {
      return found;
    }
  }

  return null;
}

console.log(findCategoryById(categories, 3));
// { id: 3, name: "Áo thun", children: [] }

console.log(findCategoryById(categories, 99)); // null
```

Hàm kiểm tra từng danh mục. Nếu chưa khớp ID, hàm gọi lại chính nó để tìm trong danh sách danh mục con. Cách này xử lý được số cấp thay đổi mà không phải viết cố định nhiều vòng lặp lồng nhau.

### Hai thành phần cần có

- **Điều kiện dừng:** Khi tìm thấy ID thì trả về danh mục; khi danh sách rỗng hoặc đã duyệt hết mà không tìm thấy thì trả về `null`.
- **Bước đệ quy:** Gọi `findCategoryById()` với `category.children`, đi xuống cấp con để tiến đến điều kiện dừng.

Lưu ý:

- Cần trả kết quả tìm được từ lời gọi con về lời gọi cha bằng `return found`.
- Ví dụ giả định dữ liệu là cây, không có danh mục con trỏ ngược về danh mục cha gây vòng lặp.
- Dữ liệu lồng quá sâu có thể gây lỗi tràn call stack; khi đó có thể dùng vòng lặp kết hợp một mảng làm stack.
