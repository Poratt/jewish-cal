![Angular](https://img.shields.io/badge/Angular-20-red)
   ![License](https://img.shields.io/badge/license-MIT-blue) 
   
 <div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="120" height="120">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E1D4EF"/>
        <stop offset="100%" style="stop-color:#E1D3EF"/>
      </linearGradient>
      <linearGradient id="header" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#377AF3"/>
        <stop offset="100%" style="stop-color:#2EA6FF"/>
      </linearGradient>
    </defs>
    <rect width="27.953" height="27.953" x="2.047" y="2.023" fill="url(#bg)" rx="5.25"/>
    <path fill="url(#header)" d="M30 9.023H2.047v-1.75c0-2.9 2.35-5.25 5.25-5.25H24.75c2.9 0 5.25 2.35 5.25 5.25z"/>
    <rect width="3.086" height="3.125" x="7.797" y="11.953" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="14.481" y="11.953" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="21.164" y="11.953" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="7.797" y="17.406" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="14.481" y="17.406" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="21.164" y="17.406" fill="#2F99F4" rx=".1"/>
    <rect width="3.086" height="3.125" x="7.797" y="22.859" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="14.481" y="22.859" fill="#A59CB4" rx=".1"/>
    <rect width="3.086" height="3.125" x="21.164" y="22.859" fill="#A59CB4" rx=".1"/>
  </svg>

  <h1>📅 Jewish Calendar (Angular 19)</h1>
</div>

A custom-built Jewish calendar focused on functionality and modern Angular practices.
This app handles complex date conversions, daily Zmanim (Halachic times) based on geolocation, and daily learning schedules (Daf Yomi, etc.).

🔗 **[Live Demo](https://jewish-cal.netlify.app/)**

---

## ✨ Key Features

*   **📅 Full Jewish Calendar:**  Gregorian and Hebrew dates.
*   **⏰ Halachic Times (Zmanim):** Calculates precise times (Sunrise, Candle Lighting, Havdalah) based on geolocation.
*   **📚 Daily Learning Schedules:** Tracks for Daf Yomi, Mishna Yomi, Rambam, and more.
*   **🎨 Dynamic Theming:** User-customizable UI (fonts, colors, border brightness).
*   **🖨️ Print Optimized:** Dedicated print layout for generating clean, paper-ready monthly calendars.
*   **🌍 Localization:** Full RTL support with Hebrew interface.

---

## 🛠️ Tech Stack

*   **Framework:** Angular 20 (Standalone Components, Signals Architecture)
*   **State Management:** Angular Signals
*   **Styling:** SCSS, Tailwind CSS, PrimeNG Themes
*   **Logic & Data:** Hebcal API (for complex Jewish calendar calculations)
*   **Deployment:** Netlify (CI/CD)

---

## 📸 Screenshots

| Monthly View (Desktop) | Settings & Theming | Mobile View |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/1f6cf12f-50e2-4903-9588-40310ecfcdde" width="100%" alt="Desktop View"> | <img src="https://github.com/user-attachments/assets/dd85558c-9c02-48ee-b294-b475bf2bfcde" width="100%" alt="Settings"><br><br><img src="https://github.com/user-attachments/assets/db5471cf-a7e1-45ed-8cbb-2d06b7fda786" width="100%" alt="Themes"> | <img src="https://github.com/user-attachments/assets/5479ffbf-6621-47e3-81ce-e008f86fb0fe" width="100%" alt="Mobile View"> |

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/poratt/jewish-cal.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    ng serve
    ```
4.  Open `http://localhost:4200` in your browser.

---

## 🙌 Acknowledgements

*   Jewish calendar data powered by **[Hebcal.com](https://www.hebcal.com/)** (Creative Commons Attribution 4.0 International License).

---

<div align="center">
  <b>Developed by Porat Amrami</b><br>
  <a href="mailto:porat.amrami@gmail.com">porat.amrami@gmail.com</a>
</div>
