import { http, delay, HttpResponse } from 'msw'

//定義請求處理程序(handlers)
export const handlers = [
  http.get("http://localhost:3030/scoops", async () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
  http.get("http://localhost:3030/toppings", async () => {
    return HttpResponse.json([
      {
        "name": "M&Ms",
        "imagePath": "/images/m-and-ms.png"
      },
      {
        "name": "Hot fudge",
        "imagePath": "/images/hot-fudge.png"
      },
      {
        "name": "Peanut butter cups",
        "imagePath": "/images/peanut-butter-cups.png"
      },
    ]);
  }),
  http.post("http://localhost:3030/order", async () => {
    // 在這裡新增 100 毫秒的暫停，讓 jest 有機會看到「正在載入」狀態
    await delay(100);
    return HttpResponse.json({ orderNumber: 123455676 }, { status: 201 });
  }),
];