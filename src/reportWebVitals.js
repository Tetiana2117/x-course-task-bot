// Файл призначений для збору та звітності про ключові показники продуктивності програми React.
// Він допомагає відстежувати важливі метрики, що може бути корисно для покращення користувальницького досвіду та продуктивності програми.

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// Основні метрики web-vitals:
// CLS (Cumulative Layout Shift): Вимірює візуальну стабільність, відслідковуючи раптові усунення елементів на сторінці.
// FID (First Input Delay): Вимірює чуйність, оцінюючи затримку між першою взаємодією користувача та моментом, коли браузер починає обробку цієї взаємодії.
// FCP (First Contentful Paint): Вимірює час від початку завантаження сторінки до моменту, коли будь-який контент (текст, зображення тощо) з'являється на екрані.
// LCP (Largest Contentful Paint): Вимірює час до моменту, коли основний контент сторінки став видимим.
// TTFB (Time to First Byte): Вимірює затримку мережі, визначаючи час, що минув від запиту сторінки до отримання першого байта відповіді.
