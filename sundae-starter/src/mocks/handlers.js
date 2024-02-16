import { http, HttpResponse } from 'msw'

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
];