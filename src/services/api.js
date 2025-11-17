// Если у тебя нет сервера — оставь пустым.
// Когда появится API, укажи: 'http://localhost:3001' или прод-домен.
const BASE_URL = 'http://localhost:5174/';

async function http(path = '') {
  if (!BASE_URL) throw new Error('NO_API'); // принудительно уходим в фолбэк-данные
  const r = await fetch(`${BASE_URL}/api/products${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!r.ok) throw new Error('API error');
  return r.json();
}

// ---------- Фолбэк-демо (можешь править под свои картинки) ----------
function demoData() {
  return [
    {
      id: 1,
      brand: 'Porsche',
      title: 'Porsche 911 (992)',
      price: 31_800_000,
      discount: 20,
      imageUrl: '/img/992.jpg',
      images: ['/img/992.jpg', '/img/992-2.jpg', '/img/992-3.jpg'],
      flags: { sale: true },
      specs: { year: 2023, mileageKm: 1201, engineType: 'Бензин', engineVolumeL: 3.7, powerHP: 650 },
    },
    {
      id: 2,
      brand: 'Porsche',
      title: 'Porsche Cayman 718 ',
      price: 10_700_000,
      discount: 10,
      imageUrl: '/img/cayman.jpg',
      images: ['/img/cayman.jpg', '/img/cayman-2.jpg'],
      flags: { hit: true },
      specs: { year: 2020, mileageKm: 18_500, engineType: 'Бензин', engineVolumeL: 2.0, powerHP: 300 },
    },
    {
      id: 3,
      brand: 'Porsche',
      title: 'Porsche Cayenne',
      price: 27_500_000,
      imageUrl: '/img/cayenne.jpg',
      images: ['/img/cayenne.jpg'],
      flags: { new: true },
      specs: { year: 2024, mileageKm: 0, engineType: 'Бензин', engineVolumeL: 3.0, powerHP: 353 },
    },
    {
      id: 4,
      brand: 'Porsche',
      title: 'Porsche 718 Spyder',
      price: 13_000_000,
      discount: 20,
      imageUrl: '/img/spy.jpg',
      images: ['/img/spy.jpg', '/img/spy-2.jpg'],
      flags: { sale: true },
      specs: { year: 2021, mileageKm: 12_000, engineType: 'Бензин', engineVolumeL: 4.0, powerHP: 420 },
    },
    {
      id: 5,
      brand: 'BMW',
      title: 'BMW M4 G82/G83',
      price: 10_290_000,
      imageUrl: '/img/bmwg.jpg',
      images: ['/img/bmwg.jpg'],
      flags: { new: true },
      specs: { year: 2022, mileageKm: 9_800, engineType: 'Бензин', engineVolumeL: 3.0, powerHP: 510 },
    },
    {
      id: 7,
      brand: 'BMW',
      title: 'BMW 8 серии II',
      price: 15_900_000,
      imageUrl: 'https://jetcar24.ru/wp-content/uploads/2024/04/4e186f19e25273b092e454369fa8eee2.jpg',
      images: [
        'https://jetcar24.ru/wp-content/uploads/2024/04/4e186f19e25273b092e454369fa8eee2.jpg',
      ],
      flags: { new: true },
      specs: { year: 2020, mileageKm: 21_000, engineType: 'Бензин', engineVolumeL: 3.0, powerHP: 340 },
    },
    {
      id: 8,
      brand: 'BMW',
      title: 'BMW X5 IV',
      price: 15_500_000,
      imageUrl: 'https://jetcar24.ru/wp-content/uploads/2025/08/8d6dcf2abb8c84ef2f7fa77f2a7a96b1.jpg',
      images: [
        'https://jetcar24.ru/wp-content/uploads/2025/08/8d6dcf2abb8c84ef2f7fa77f2a7a96b1.jpg',
      ],
      flags: { new: true },
      specs: { year: 2023, mileageKm: 7_500, engineType: 'Бензин', engineVolumeL: 3.0, powerHP: 381 },
    },
    {
      id: 9,
      brand: 'BMW',
      title: 'BMW 8 серии II (другая комплектация)',
      price: 15_900_000,
      imageUrl: 'https://jetcar24.ru/wp-content/uploads/2024/04/4e186f19e25273b092e454369fa8eee2.jpg',
      images: [
        'https://jetcar24.ru/wp-content/uploads/2024/04/4e186f19e25273b092e454369fa8eee2.jpg',
      ],
      flags: { new: true },
      specs: { year: 2019, mileageKm: 32_000, engineType: 'Бензин', engineVolumeL: 4.4, powerHP: 530 },
    },
    {
      id: 10,
      brand: 'Ferrari',
      title: 'Ferrari F8',
      price: 38_500_000,
      imageUrl: 'https://jetcar24.ru/wp-content/uploads/2025/03/51619fbeaa511581d6c2a1d97255e76f.jpg',
      images: [
        'https://jetcar24.ru/wp-content/uploads/2025/03/51619fbeaa511581d6c2a1d97255e76f.jpg',
      ],
      flags: { new: true },
      specs: { year: 2021, mileageKm: 8_000, engineType: 'Бензин', engineVolumeL: 3.9, powerHP: 720 },
    },
        {
      id: 11,
      brand: 'Ferrari',
      title: 'Ferrari Roma',
      price: 34_417_000,
      imageUrl: 'https://jetcar24.ru/wp-content/uploads/2025/06/2d22be971836f271bf56895f4de79a8c.jpg',
      images: [
        'https://jetcar24.ru/wp-content/uploads/2025/06/2d22be971836f271bf56895f4de79a8c.jpg','https://jetcar24.ru/wp-content/uploads/2025/06/18ea7c3ec5085b4bc04b05d26a4fe792.jpg',
      ],
      flags: { new: true },
      specs: { year: 2025, mileageKm: 69, engineType: 'Бензин', engineVolumeL: 3.9, powerHP: 620 },
    },
      {
        id:12 ,
        brand:'Audi',
        title:'Audi RS 6 IV ',
        price: 21_700_000,
        imageUrl:'https://jetcar24.ru/wp-content/uploads/2025/04/63f58640dcd585bd48365dee310c0872.jpg',
        images:[ 
          'https://jetcar24.ru/wp-content/uploads/2025/04/63f58640dcd585bd48365dee310c0872.jpg','https://jetcar24.ru/wp-content/uploads/2025/04/1f26bbb4c7e082469a64a577296e1c1a.jpg',
        ],
        flags:{},
        specs:{ year: 2025, mileageKm: 32, engineType: 'Бензин', engineVolumeL: 4.0, powerHP: 630 },
      },
      {
        id:13,
        brand:'Lamborghini',
        title:'Lamborghini Huracán',
        price: 39_990_000,
        imageUrl:'https://jetcar24.ru/wp-content/uploads/2025/01/25473248f02a44a3524ca1ad622ee3c6.jpg',
        images:[
          'https://jetcar24.ru/wp-content/uploads/2025/01/25473248f02a44a3524ca1ad622ee3c6.jpg','https://jetcar24.ru/wp-content/uploads/2025/01/e3372ae5b635c5a361880b548b84022e.jpg'],
        flags:{new:true},
        specs:{ year: 2024, mileageKm:88, engineType:'Бензин',engineVolumeL:5.2,powerHP:640}

      },
  ];
}
// ------------------------------------------------------------------------

export const api = {
  /** Список товаров */
  async getProducts() {
    try {
      return await http('');
    } catch {
      return demoData();
    }
  },

  /** Один товар по id (для страницы детали) */
  async getProduct(id) {
    const list = await this.getProducts();
    return list.find(p => String(p.id) === String(id)) || null;
  },

  /** Поиск по названию/бренду */
  async search(q) {
    const list = await this.getProducts();
    if (!q) return list;
    const s = String(q).trim().toLowerCase();
    return list.filter(p =>
      p.title.toLowerCase().includes(s) ||
      (p.brand && p.brand.toLowerCase().includes(s))
    );
  },
};