'use strict';

// endtime = deadLine
// endtime = 1687996800000

// Дати в мілісікундах:
// День = 86 400 000;
// Година = 3 600 000
// Хвилини = 60 000
// Секунда = 1 000

// фОРМУЛИ
// t = 1687996800000 - 1687014845000 = 1127116000 - це час який лишився в мілісікундах
// days = 1126317000 / (24 * 60 * 60)  = 13
// hours = 1126317000 / (1000 * 60 * 60) % 24 = 0
// minutes = (1126317000 / 1000 / 60) % 60 = 52
// seconds = (1126317000 / 1000) % 60 = 100

// Дії
// 1 - Функція яка вираховує усе та вертає обєкт з даними
// 2 - Функція яка приймає два агрументи ) В середині получає усі елементи з якими працюєм, запускає setInterval з іншою функцією яка елемети запускає на сайт та викликає функцію перевірку
// Певна дата до якої буде працювати час
window.addEventListener('DOMContentLoaded', () => {
   const deadLine = '2024-03-24';

   function getTimeClock(deadLine) {
      let days, hours, minutes, seconds;
      const t = Math.floor(Date.parse(deadLine) - Date.parse(new Date()));
      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (24 * 60 * 60 * 1000));
         hours = Math.floor((t / (60 * 60 * 1000)) % 24);
         minutes = Math.floor((t / 1000 / 60) % 60);
         seconds = Math.floor((t / 1000) % 60);
      }

      return {
         total: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds,
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, deadLine) {
      const boxClock = document.querySelector(selector),
         days = boxClock.querySelector('#days'),
         hours = boxClock.querySelector('#hours'),
         minutes = boxClock.querySelector('#minutes'),
         seconds = boxClock.querySelector('#seconds');

      function updateClock() {
         const t = getTimeClock(deadLine);
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }

      updateClock();
      const timeInterval = setInterval(updateClock, 1000);
   }

   setClock('.boxClock', deadLine);
});
