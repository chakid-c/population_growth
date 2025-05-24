# Population Bar Chart Race

แอปพลิเคชันแสดงกราฟ Bar Chart Race ของประชากรแต่ละประเทศในแต่ละปี  
สร้างด้วย React และ Recharts โดยดึงข้อมูลจาก API

---

## Features

- แสดงกราฟแท่งแนวตั้งเรียงอันดับ 10 ประเทศที่มีประชากรมากที่สุดในแต่ละปี  
- กราฟวิ่งเปลี่ยนปีอัตโนมัติทุก 2 วินาที  
- สีแท่งแต่ละประเทศแตกต่างกันเพื่อความชัดเจน  
- รองรับข้อมูลประชากรที่ถูก transform จาก API  

---

## Installation

1. คลอนโปรเจกต์

```bash
git clone https://github.com/chakid-c/population_growth.git
cd population_growth

## Backend
cd population_back
npm install
npm run start

## Frontend
cd population_front
npm install
npm run start

2. เปิดเบราว์เซอร์ไปที่ http://localhost:3000 เพื่อดูผลลัพธ์
