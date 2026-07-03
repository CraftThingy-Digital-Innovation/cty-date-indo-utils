# @craftthingy-digital-innovation/cty-date-indo-utils-web

Bilingual documentation: [Bahasa Indonesia](#bahasa-indonesia) | [English](#english)

---

## Bahasa Indonesia

Library client-side Javascript untuk memformat tanggal Indonesia (`DD/MM/YYYY`), mengubah ke format database (`YYYY-MM-DD`), memvalidasi tanggal kalender secara akurat (termasuk tahun kabisat), serta melakukan pembatasan input teks keyboard (date masking "HH/BB/TTTT").

Sangat berguna untuk standarisasi format tanggal Indonesia di berbagai form input aplikasi web Anda.

### Instalasi
```bash
npm install @craftthingy-digital-innovation/cty-date-indo-utils-web
```

### Cara Penggunaan
```javascript
import { 
  formatDateIndo, 
  convertDateToDb, 
  maskDateInput, 
  isValidDateIndo 
} from '@craftthingy-digital-innovation/cty-date-indo-utils-web';

// 1. Ubah database YYYY-MM-DD ke Indonesia DD/MM/YYYY
formatDateIndo('2026-07-03'); // Output: '03/07/2026'

// 2. Ubah database ke format tanggal lisan (Long Format)
formatDateIndo('2026-07-03', true); // Output: '03 Juli 2026'

// 3. Ubah input Indonesia DD/MM/YYYY kembali ke format database YYYY-MM-DD
convertDateToDb('03/07/2026'); // Output: '2026-07-03'

// 4. Validasi kebenaran kalender tanggal Indonesia (termasuk kabisat)
isValidDateIndo('29/02/2026'); // Output: false (2026 bukan tahun kabisat)
isValidDateIndo('29/02/2024'); // Output: true (2024 adalah tahun kabisat)

// 5. Pasang pembatas karakter ketik otomatis (Date Input Masking) pada input HTML
const myDateInput = document.getElementById('tanggal-lahir');
maskDateInput(myDateInput); // Otomatis menambahkan "/" saat diketik & hanya menerima angka
```

---

## English

A client-side JavaScript utility to format Indonesian dates (`DD/MM/YYYY`), convert them back to database formats (`YYYY-MM-DD`), validate calendar dates precisely (including leap years), and restrict text inputs (date masking "DD/MM/YYYY").

Perfect for standardizing Indonesian date entries across your web applications.

### Installation
```bash
npm install @craftthingy-digital-innovation/cty-date-indo-utils-web
```

### Usage
```javascript
import { 
  formatDateIndo, 
  convertDateToDb, 
  maskDateInput, 
  isValidDateIndo 
} from '@craftthingy-digital-innovation/cty-date-indo-utils-web';

// 1. Format database YYYY-MM-DD to Indonesian DD/MM/YYYY
formatDateIndo('2026-07-03'); // Returns: '03/07/2026'

// 2. Format to verbose/long format name
formatDateIndo('2026-07-03', true); // Returns: '03 Juli 2026'

// 3. Convert Indonesian entry back to YYYY-MM-DD database format
convertDateToDb('03/07/2026'); // Returns: '2026-07-03'

// 4. Validate calendar dates (handles leap years)
isValidDateIndo('29/02/2026'); // Returns: false (2026 is not a leap year)
isValidDateIndo('29/02/2024'); // Returns: true (2024 is a leap year)

// 5. Restrict typing input with auto-slash masking
const myDateInput = document.getElementById('birthdate');
maskDateInput(myDateInput); // Restricts to numbers and inserts "/" automatically
```
