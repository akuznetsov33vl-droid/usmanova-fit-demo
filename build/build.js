/* ============================================================
   USMANOVA FIT — static site generator
   Генерирует: index.html + 6 подстраниц программ + 3 юр-страницы
   Запуск: node build/build.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* версия ассетов — меняем при правках CSS/JS, чтобы сбросить кэш браузера */
const VER = '4';

/* ---------- реквизиты ---------- */
const ORG = {
  name: 'ООО «Онлайн Фитнес»',
  inn: '7734434533', kpp: '773401001', ogrn: '1207700175209',
  addr: 'г. Москва, ул. Щукинская, д. 2, этаж/офис цокольный/32',
  email: 'care@usmanovafit.ru',
  years: '2020 — 2026'
};

/* ---------- логотипы рассрочки (круглые) ---------- */
const LOGO_TBANK = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><circle cx="48" cy="48" r="48" fill="#FFDD2D"/><path d="M30 27 H66 V43 C66 58 57.5 67 48 71 C38.5 67 30 58 30 43 Z" fill="#fff"/><text x="48" y="45" fill="#111" font-family="Gilroy,Arial,sans-serif" font-weight="700" font-size="24" text-anchor="middle" dominant-baseline="central">Т</text></svg>`;
const LOGO_DOLYAMI = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><circle cx="48" cy="48" r="48" fill="#111"/><g fill="#fff"><rect x="30" y="34" width="6" height="28" rx="3"/><rect x="40" y="34" width="6" height="28" rx="3"/><rect x="50" y="34" width="6" height="28" rx="3"/><rect x="60" y="34" width="6" height="28" rx="3"/></g></svg>`;
const num = s => parseInt(String(s).replace(/\D/g,''),10) || 0;
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');

/* ---------- кейсы (реальные истории учениц) ---------- */
const CASES = [
  {img:'cases/c2.jpg',  name:'Марина', metric:'−7 кг за 2 месяца', quote:'Тренировки — огонь, буду продлевать до бесконечности'},
  {img:'cases/c10.jpg', name:'Ульяна', metric:'Результат за 9 дней', quote:'Таких изменений не было даже с тренером в зале'},
  {img:'cases/c3.jpg',  name:'Анна',   metric:'−6 см с талии',      quote:'Наконец спорт в удовольствие, а не в наказание'},
  {img:'cases/c7.jpg',  name:'Ольга',  metric:'−9 кг за курс',      quote:'Одежда сидит свободнее, появилась лёгкость'},
  {img:'cases/c4.jpg',  name:'Дарья',  metric:'Минус размер',        quote:'Тело подтянулось, а живот стал плоским'},
  {img:'cases/c5.jpg',  name:'Ксения', metric:'−5 кг без диет',     quote:'Ем 4 раза в день и худею — это работает'}
];

/* ---------- сравнение (общее) ---------- */
const COMPARE = [
  ['Диеты','Голод и срыв.','Загоняют тело в режим голода, метаболизм замедляется, потом срыв и вес возвращается с плюсом.','4 приёма в день.','Вы едите 4 раза в день, не голодаете, а метаболизм наоборот ускоряется.'],
  ['Спортзал','Дорога и расписание.','Непонятно что делать, бросаете через месяц.','20–40 минут дома.','Чёткие инструкции, занимаетесь когда удобно.'],
  ['Бесплатные видео','Хаос без системы.','Нет прогрессии, а значит без результата.','Пошаговая программа.','Каждая тренировка на своём месте, нагрузка растёт постепенно.']
];

/* ---------- FAQ (общее) ---------- */
const FAQ = [
  ['Подойдёт ли программа новичкам?','Да. Программы построены по принципу постепенного роста нагрузки — начать можно с любого уровня подготовки, техника разбирается с нуля.'],
  ['Сколько времени в день нужно на тренировки?','В среднем 20–40 минут. Заниматься можно в любое удобное время — расписание подстраиваете под себя.'],
  ['Можно ли заниматься дома?','Да, все тренировки рассчитаны на дом. Из инвентаря — минимум, а часть программ идёт с собственным весом.'],
  ['Есть ли рассрочка?','Да. Оплату можно разбить на части через сервис «Долями» или оформить рассрочку банка при оформлении заказа.'],
  ['Как получить доступ после оплаты?','Сразу после оплаты на вашу почту и в личный кабинет приходит доступ к программе — можно приступать в тот же день.'],
  ['Работают ли карты иностранных банков?','Оплата доступна картами Мир, Visa, Mastercard российских банков, через СБП и рассрочку. Для оплаты из-за границы напишите в поддержку.']
];

/* ---------- программы ---------- */
const PROGRAMS = [
  {
    slug:'metod', cat:'Метод', name:'Метод Усмановой', img:'method/hero.png', flag:'Флагман',
    disc:82, from:'2 490', old:'13 800',
    lead:'Домашние тренировки с Катей и готовое питание по неделям возвращают лёгкость, подтягивают тело и превращают спорт в чистое удовольствие.',
    marquee:'По Методу Усмановой уже тренируются более 590 000 женщин',
    benefits:[
      ['⚡','Энергия','Утро начинается легко, сил хватает на весь день. Как пишут ученицы, «я просто ожила».'],
      ['✨','Лёгкость и форма','Уходят объёмы, одежда сидит свободнее, тело подтянуто.'],
      ['💪','Уверенность','Спорт становится в кайф. Появляется гордость за себя и привычка, которая остаётся.']
    ],
    inc:[
      ['20 тренировок с Катей','По 20–40 минут. 5 дней занимаетесь, 2 дня — растяжка и восстановление.'],
      ['Питание по неделям','Расписано по неделям, с меню и списком покупок. Без диет и подсчёта калорий.'],
      ['42 урока по питанию','Один раз разобрались и закрыли тему еды навсегда.'],
      ['Дыхание и осанка','Плоский живот и ровная осанка за счёт дыхания. По 10–15 минут.']
    ],
    tariffs:[
      ['Лёгкий старт','Доступ: 2 месяца','2 490','4 990','51%',['Обновлённый Метод: 20 тренировок','Питание по неделям','Растяжка и восстановление','5 лекций по питанию'],false],
      ['Преображение','Доступ: 3 месяца','4 990','19 900','75%',['Всё из «Лёгкого старта»','Курс питания: 42 урока','5 тренировок на живот и осанку','Доступ на 3 месяца'],true],
      ['Максимум','Доступ: 6 месяцев','7 990','44 000','82%',['Всё из «Преображения»','Курс «Жиросжигающий»','3 уровня по 45 дней','Доступ на 6 месяцев'],false]
    ]
  },
  {
    slug:'stroinost', cat:'Марафон', name:'Марафон Стройности', img:'img/prog2.png', flag:'Старт с нуля',
    disc:60, from:'1 490', old:'3 990',
    lead:'Первый видимый результат за 21 день — уходит первый жир, появляется тонус и лёгкость. Для тех, кто стартует с нуля.',
    marquee:'Первый результат уже за 21 день — минус 3–5 кг',
    benefits:[
      ['🔥','Минус объёмы','Уходит первый жир, талия становится заметно уже за 3 недели.'],
      ['🥗','Питание без диет','Простое меню на каждый день — без голода и жёстких ограничений.'],
      ['🙌','Лёгкий вход','Короткие тренировки, с которыми легко втянуться и не бросить.']
    ],
    inc:[
      ['21 день программы','Тренировки по 20–30 минут на каждый день марафона.'],
      ['Меню на 3 недели','Готовый план питания со списком покупок.'],
      ['Разминка и заминка','Бережный вход в нагрузку без травм.'],
      ['Чат поддержки','Мотивация и ответы на вопросы на протяжении марафона.']
    ],
    tariffs:[
      ['Старт','Доступ: 1 месяц','1 490','2 990','50%',['21 день тренировок','Меню на 3 недели','Разминка и заминка'],false],
      ['Оптимум','Доступ: 2 месяца','2 290','6 990','67%',['Всё из «Старта»','Чат поддержки','Бонус: гид по срывам'],true],
      ['Максимум','Доступ: 3 месяца','2 990','9 900','70%',['Всё из «Оптимума»','Продление на 3 месяца','Бонусные тренировки на пресс'],false]
    ]
  },
  {
    slug:'popa1', cat:'Марафон', name:'Упругая попа 1.0', img:'img/prog3.png', flag:'',
    disc:55, from:'1 490', old:'3 290',
    lead:'Первый объём и подтянутость ягодиц — с собственным весом. Для тех, кто впервые целенаправленно работает над попой.',
    marquee:'Круглая подтянутая попа — с собственным весом дома',
    benefits:[
      ['🍑','Форма ягодиц','Появляется объём и подтянутость там, где нужно.'],
      ['🏠','Дома без зала','Только собственный вес — никакого оборудования.'],
      ['📈','Понятная техника','Разбор каждого движения, чтобы работали именно ягодицы.']
    ],
    inc:[
      ['Тренировки на ягодицы','Прицельная проработка по 20–30 минут.'],
      ['Техника с нуля','Видео-разборы, чтобы не «забивать» ноги и спину.'],
      ['План на месяц','Чёткое расписание с прогрессией нагрузки.'],
      ['Растяжка','Восстановление и профилактика зажимов.']
    ],
    tariffs:[
      ['Старт','Доступ: 1 месяц','1 490','2 990','50%',['Тренировки на ягодицы','Техника с нуля','План на месяц'],false],
      ['Оптимум','Доступ: 2 месяца','2 190','5 490','60%',['Всё из «Старта»','Растяжка','Чат поддержки'],true],
      ['Максимум','Доступ: 3 месяца','2 790','7 990','65%',['Всё из «Оптимума»','Бонус: гид по питанию','Продление на 3 месяца'],false]
    ]
  },
  {
    slug:'popa2', cat:'Марафон', name:'Упругая попа 2.0', img:'img/prog4.png', flag:'Продвинутый',
    disc:55, from:'1 990', old:'4 490',
    lead:'Плотные, упругие ягодицы — следующий уровень после 1.0. С резинкой и утяжелителями, для подготовленных.',
    marquee:'Следующий уровень — плотные упругие ягодицы',
    benefits:[
      ['💥','Плотность и объём','Более серьёзная нагрузка для видимого рельефа.'],
      ['🎽','С инвентарём','Резинка и утяжелители для прогрессии.'],
      ['🔥','Для подготовленных','Продолжение после 1.0 или базовой подготовки.']
    ],
    inc:[
      ['Продвинутые тренировки','Работа с резинкой и утяжелителями.'],
      ['Прогрессия нагрузки','Схема, по которой мышцы продолжают расти.'],
      ['План на месяц','Расписание тренировок и восстановления.'],
      ['Растяжка','Мобилизация и восстановление.']
    ],
    tariffs:[
      ['Старт','Доступ: 1 месяц','1 990','3 490','43%',['Продвинутые тренировки','Прогрессия нагрузки','План на месяц'],false],
      ['Оптимум','Доступ: 2 месяца','2 690','6 490','58%',['Всё из «Старта»','Растяжка','Чат поддержки'],true],
      ['Максимум','Доступ: 3 месяца','3 290','8 990','63%',['Всё из «Оптимума»','Бонус: связка с 1.0','Продление на 3 месяца'],false]
    ]
  },
  {
    slug:'zhivot', cat:'Марафон', name:'Плоский живот', img:'img/prog5.png', flag:'',
    disc:55, from:'1 490', old:'3 290',
    lead:'Убрать вываливающийся живот, который не уходит даже после похудения. Тренировки на глубокие мышцы пресса — а не на «кубики».',
    marquee:'Плоский живот за счёт глубоких мышц пресса',
    benefits:[
      ['🎯','Глубокие мышцы','Работаем с тем, что отвечает за плоский живот.'],
      ['🧘','Дыхание и осанка','Плоский живот через дыхание, а не сотни скручиваний.'],
      ['⏱️','10–15 минут','Короткие тренировки, снимают стресс и зажимы в спине.']
    ],
    inc:[
      ['Тренировки на пресс','Прицельно на глубокие мышцы кора.'],
      ['Дыхательные практики','Техника для плоского живота и осанки.'],
      ['План на месяц','Расписание коротких занятий.'],
      ['Питание-подсказки','Что убрать из рациона для плоского живота.']
    ],
    tariffs:[
      ['Старт','Доступ: 1 месяц','1 490','2 790','47%',['Тренировки на пресс','Дыхательные практики','План на месяц'],false],
      ['Оптимум','Доступ: 2 месяца','2 190','5 290','59%',['Всё из «Старта»','Питание-подсказки','Чат поддержки'],true],
      ['Максимум','Доступ: 3 месяца','2 690','7 490','64%',['Всё из «Оптимума»','Бонус: осанка','Продление на 3 месяца'],false]
    ]
  },
  {
    slug:'zhiro', cat:'Курс', name:'Жиросжигающий', img:'img/prog6.png', flag:'Хит',
    disc:60, from:'1 990', old:'4 990',
    lead:'Сжечь жир и проявить рельеф — за 6 недель. Для тех, кто уже тренировался: с гантелями, по схеме интервальных нагрузок.',
    marquee:'Максимальное жиросжигание — три уровня по 45 дней',
    benefits:[
      ['🔥','Максимум жиросжигания','Интервальные нагрузки для быстрого результата.'],
      ['🏋️','Три уровня','Умеренный, интенсивный и силовой — идёте по своему.'],
      ['💎','Рельеф','Проявляем мышцы, а не просто «сгоняем» вес.']
    ],
    inc:[
      ['3 уровня по 45 дней','Умеренный для старта, интенсивный и силовой.'],
      ['Интервальные тренировки','Схема HIIT с гантелями.'],
      ['План питания','Рацион под жиросжигание.'],
      ['Восстановление','Растяжка между интенсивными блоками.']
    ],
    tariffs:[
      ['Старт','Доступ: 2 месяца','1 990','3 990','50%',['Уровень 1: умеренный','Интервальные тренировки','План питания'],false],
      ['Оптимум','Доступ: 3 месяца','3 290','8 490','61%',['Уровни 1–2','Восстановление','Чат поддержки'],true],
      ['Максимум','Доступ: 4 месяца','4 490','12 900','65%',['Все 3 уровня','Силовой блок','Продление на 4 месяца'],false]
    ]
  }
];

/* ================= partials ================= */
const head = (title, desc) => `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#f66297">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preload" href="assets/fonts/g2.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="assets/site.css?v=${VER}">
</head>
<body>`;

const headerMain = () => `
<header>
  <div class="wrap nav">
    <a href="index.html" class="logo">USMANOVA<b>FIT</b></a>
    <nav class="nav-links">
      <a href="index.html#programs">Программы</a>
      <a href="index.html#cases">Результаты</a>
      <a href="index.html#lead">Контакты</a>
    </nav>
    <a href="index.html#programs" class="btn btn-primary" data-scroll>Выбрать программу</a>
    <button class="burger" id="burger" aria-label="Меню"><span></span><span></span><span></span></button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="index.html#programs" data-close-menu>Программы</a>
    <a href="index.html#cases" data-close-menu>Результаты</a>
    <a href="index.html#lead" data-close-menu>Контакты</a>
  </div>
</header>`;

const headerSub = () => `
<header>
  <div class="wrap nav">
    <a href="index.html" class="logo">USMANOVA<b>FIT</b></a>
    <div class="nav-right">
      <a href="index.html#programs" class="back">← <span>Все программы</span></a>
      <a href="#tariffs" class="btn btn-primary" data-scroll>Забрать со скидкой</a>
    </div>
  </div>
</header>`;

const casesSection = () => `
<section class="block" id="cases">
  <div class="wrap">
    <div class="head">
      <div class="eyebrow">Результаты</div>
      <h2>Реальные истории учениц</h2>
      <p>580 000+ девушек уже тренируются с Катей. Присоединяйтесь — следующая история будет вашей.</p>
    </div>
    <div class="cases">
      ${CASES.map(c=>`<figure class="case">
        <img src="assets/${c.img}" alt="История ученицы ${c.name}" loading="lazy">
        <figcaption class="tag"><i></i>${c.metric}</figcaption>
        <div class="cap">${c.name}<small>«${c.quote}»</small></div>
      </figure>`).join('')}
    </div>
  </div>
</section>`;

const compareSection = () => `
<section class="block" style="background:var(--gray)">
  <div class="wrap">
    <div class="head"><h2>Почему это работает там, где остальное — нет</h2></div>
    <div class="cmp-grid">
      ${COMPARE.map(r=>`<div class="cmp-row">
        <div class="cmp-cell bad"><span class="lbl">${r[0]}</span><b>${r[1]}</b> ${r[2]}</div>
        <div class="cmp-cell good"><span class="lbl">В программе</span><b>${r[3]}</b> ${r[4]}</div>
      </div>`).join('')}
    </div>
  </div>
</section>`;

const paymentSection = (base) => {
  const m6 = Math.round(base/6), d4 = Math.round(base/4);
  return `
<section class="block">
  <div class="wrap">
    <div class="head"><h2>Рассрочка без переплат</h2><p>Оформите онлайн за пару минут — платёж частями, без процентов и первого взноса.</p></div>
    <div class="rass">
      <div class="rmethod">
        <div class="rlogo">${LOGO_TBANK}</div>
        <div class="rname">Рассрочка на 6 месяцев</div>
        <div class="rterms">от ${fmt(m6)} ₽ × 6 платежей<small>Раз в месяц</small></div>
      </div>
      <div class="rmethod">
        <div class="rlogo">${LOGO_DOLYAMI}</div>
        <div class="rname">Долями</div>
        <div class="rterms">от ${fmt(d4)} ₽ × 4 платежа<small>Раз в 2 недели</small></div>
      </div>
    </div>
    <div class="pay-note">Также можно оплатить сразу — картой <b>Мир · Visa · Mastercard</b> или через <b>СБП</b>. Чек и договор-оферта приходят после оплаты.</div>
  </div>
</section>`;
};

const faqSection = () => `
<section class="block" style="background:var(--gray)">
  <div class="wrap">
    <div class="head"><h2>Частые вопросы</h2></div>
    <div class="faq">
      ${FAQ.map(q=>`<details class="qa"><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}
    </div>
  </div>
</section>`;

const leadForm = (single, heading, sub) => `
<section class="block lead" id="lead">
  <div class="wrap">
    <div class="lead-box${single?' single':''}">
      ${single?'':`<div class="lead-info">
        <h2>${heading}</h2>
        <p>${sub}</p>
        <ul class="lead-list">
          <li><span class="ic">✓</span> Разбор вашей цели и текущей формы</li>
          <li><span class="ic">✓</span> Персональная подборка программы</li>
          <li><span class="ic">✓</span> Специальная цена для новых участниц</li>
        </ul>
      </div>`}
      <div class="form-card">
        <form id="leadForm" novalidate>
          <h3>${single?heading:'Подобрать программу'}</h3>
          <p class="fsub">${single?sub:'Ответим в течение 15 минут в рабочее время.'}</p>
          <div class="field" id="f-name">
            <label for="name">Как вас зовут?</label>
            <input type="text" id="name" placeholder="Ваше имя" autocomplete="name">
            <div class="msg">Пожалуйста, введите имя</div>
          </div>
          <div class="field" id="f-phone">
            <label for="phone">Телефон</label>
            <input type="tel" id="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" autocomplete="tel">
            <div class="msg">Введите корректный номер телефона</div>
          </div>
          <label class="consent"><input type="checkbox" id="agree"><span>Я согласна с <a href="privacy.html">политикой конфиденциальности</a> и <a href="consent.html">обработкой персональных данных</a></span></label>
          <button type="submit" class="btn btn-primary btn-block" id="submitBtn">${single?'Забрать со скидкой':'Получить подбор'}</button>
        </form>
        <div class="form-ok" id="formOk">
          <div class="check">✓</div>
          <h3>Заявка отправлена!</h3>
          <p id="okText">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          <button class="btn btn-light btn-block" style="margin-top:24px" id="resetForm">Отправить ещё одну</button>
        </div>
      </div>
    </div>
  </div>
</section>`;

const footer = () => `
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="logo">USMANOVA<b style="color:var(--pink)">FIT</b></div>
        <div class="req">${ORG.name}, ${ORG.years}<br>ИНН ${ORG.inn} · КПП ${ORG.kpp} · ОГРН ${ORG.ogrn}<br>${ORG.addr}<br>${ORG.email}</div>
      </div>
      <div class="fnav">
        <a href="index.html#programs">Программы</a>
        <a href="index.html#cases">Результаты</a>
        <a href="oferta.html">Оферта</a>
        <a href="privacy.html">Политика конфиденциальности</a>
        <a href="consent.html">Согласие на обработку ПДн</a>
        <a href="mailto:${ORG.email}">Служба заботы</a>
      </div>
    </div>
    <div class="foot-bottom">© ${ORG.name}, ${ORG.years}. Демо-реплика для тестового задания. Не является публичной офертой.</div>
  </div>
</footer>`;

const cookie = () => `
<div class="cookie" id="cookie">
  <p>Мы используем cookie-файлы для лучшей работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с этим и с <a href="privacy.html">политикой конфиденциальности</a>.</p>
  <button class="btn btn-primary" id="cookieOk">Принять</button>
</div>`;

const scripts = () => `<script src="assets/app.js?v=${VER}"></script>`;

/* ================= program page ================= */
function programPage(p){
  return head(`${p.name} — программа Кати Усмановой`, p.lead.slice(0,150))
  + headerSub()
  + `
<section class="hero hero-sub">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <div class="tagbadge">🔥 Скидка до ${p.disc}% — до конца лета</div>
      <h1><b>${p.name}</b></h1>
      <p class="lead">${p.lead}</p>
      <div class="price-now"><span class="now">от ${p.from} ₽</span><span class="old">${p.old} ₽</span><span class="disc">−${p.disc}%</span></div>
      <div style="margin-top:24px"><a href="#tariffs" class="btn btn-primary" data-scroll>Выбрать тариф</a></div>
      <p class="hero-note">Для корректной работы сайта отключите VPN</p>
    </div>
    <div class="hero-visual"><img src="assets/${p.img}" alt="${p.name}"></div>
  </div>
</section>
<div class="timer-bar"><div class="wrap timer-inner"><div class="t">Цены вырастут через:</div>
  <div class="clock" id="clock">
    <div class="u"><b id="dd">01</b><span>дней</span></div><div class="u"><b id="hh">08</b><span>часов</span></div>
    <div class="u"><b id="mm">45</b><span>минут</span></div><div class="u"><b id="ss">00</b><span>секунд</span></div>
  </div></div></div>
<div class="marquee"><div id="mqline" data-text="${p.marquee}"></div></div>
<section class="block">
  <div class="wrap">
    <div class="head"><h2>Что вы получите</h2></div>
    <div class="bene">${p.benefits.map(b=>`<div class="b"><div class="ic">${b[0]}</div><h3>${b[1]}</h3><p>${b[2]}</p></div>`).join('')}</div>
  </div>
</section>
<section class="block" style="background:var(--gray)">
  <div class="wrap">
    <div class="head"><h2>Что входит в программу</h2></div>
    <div class="inc">${p.inc.map((r,i)=>`<div class="row"><div class="num">${i+1}</div><div><h3>${r[0]}</h3><p>${r[1]}</p></div></div>`).join('')}</div>
  </div>
</section>`
  + casesSection()
  + compareSection()
  + paymentSection(num(p.tariffs[1][2]))
  + `
<section class="block" id="tariffs">
  <div class="wrap">
    <div class="head"><h2>Выберите свой тариф</h2><p>Чем раньше старт, тем больше успеете до конца лета.</p></div>
    <div class="tariffs">
      ${p.tariffs.map(t=>`<div class="tf${t[6]?' best':''}">${t[6]?'<div class="best-tag">Хит продаж</div>':''}
        <h3>${t[0]}</h3><div class="acc">${t[1]}</div>
        <div class="p"><span class="now">${t[2]} ₽</span><span class="old">${t[3]} ₽</span></div>
        <div class="disc">Скидка ${t[4]}</div>
        <ul>${t[5].map(li=>`<li>${li}</li>`).join('')}</ul>
        <a href="#lead" class="btn ${t[6]?'btn-primary':'btn-light'} btn-block" data-scroll>Забрать набор</a>
      </div>`).join('')}
    </div>
  </div>
</section>`
  + faqSection()
  + leadForm(true, `Оформить «${p.name}»`, 'Оставьте контакты — поможем выбрать тариф и оформить заказ.')
  + footer() + cookie() + scripts() + `
</body></html>`;
}

/* ================= index page ================= */
function indexPage(){
  const cardsData = PROGRAMS.map(p=>({img:p.img,cat:p.cat,name:p.name,flag:p.flag,link:p.slug+'.html',
    desc:p.lead.length>120?p.lead.slice(0,118)+'…':p.lead}));
  return head('Фитнес с Катей Усмановой — похудение, фигура, зал, форма после родов',
    'Приведите тело в форму с чемпионкой Катей Усмановой — без диет, голода и запретов, с пользой для здоровья.')
  + headerMain()
  + `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>Приведите тело в форму с&nbsp;чемпионкой <b>Катей&nbsp;Усмановой</b></h1>
      <div class="sub"><span class="a">без диет, голода и запретов</span><span class="b">с пользой для здоровья</span></div>
      <p class="lead">Похудеть, подтянуть попу и живот, набрать форму в зале, восстановиться после родов — тренировки и питание под вашу цель.</p>
      <a href="#programs" class="btn btn-primary" data-scroll>Выбрать программу</a>
      <p class="hero-note">Для корректной работы сайта отключите VPN</p>
      <div class="hero-badges">
        <div><div class="n">580 000+</div><div class="l">участниц уже с Катей</div></div>
        <div><div class="n">15 лет</div><div class="l">опыта тренера</div></div>
        <div><div class="n">4–6 кг</div><div class="l">в среднем за первый месяц</div></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="online"><span class="dot"></span><div>3 696 онлайн<small>тренируются сейчас</small></div></div>
      <img src="assets/img/hero.png" alt="Катя Усманова" width="975" height="1134">
    </div>
  </div>
</section>
<section class="block" id="programs">
  <div class="wrap">
    <div class="head"><div class="eyebrow">Программы</div><h2>Выберите программу под свою цель</h2>
      <p>Похудение, ягодицы, плоский живот или форма в зале — начните с флагмана или марафона.</p></div>
    <h3 class="cat-title">Тренировки дома</h3>
    <div class="cards" id="cards"></div>
  </div>
</section>`
  + casesSection()
  + paymentSection(2490)
  + leadForm(false, 'Не знаете, <b>с чего начать?</b>', 'Оставьте заявку — подберём программу под вашу цель и уровень. Это бесплатно и займёт пару минут.')
  + footer() + cookie()
  + `
<div class="modal" id="modal">
  <div class="modal-bg" data-close></div>
  <div class="modal-card">
    <button class="modal-close" data-close aria-label="Закрыть">✕</button>
    <div class="modal-media"><img id="mImg" src="" alt=""></div>
    <div class="modal-body"><div class="mcat" id="mCat"></div><h3 id="mName"></h3><div class="mdesc" id="mDesc"></div>
      <a href="#" id="mLink" class="btn btn-primary btn-block">Подробнее о программе</a></div>
  </div>
</div>
<script>
var PROGRAMS=${JSON.stringify(cardsData)};
(function(){
  var cards=document.getElementById('cards');
  PROGRAMS.forEach(function(p,i){
    var flag=p.flag?'<span class="card-flag'+((i===0||p.flag==='Хит')?' hot':'')+'">'+p.flag+'</span>':'';
    var el=document.createElement('article');el.className='card';
    el.innerHTML='<div class="card-media">'+flag+'<img src="assets/'+p.img+'" alt="'+p.name+'" loading="lazy"></div>'+
      '<div class="card-body"><div class="card-cat">'+p.cat+'</div><div class="card-name">'+p.name+'</div>'+
      '<div class="card-desc">'+p.desc+'</div>'+
      '<div style="display:flex;gap:10px;margin-top:20px"><button class="btn btn-light" style="flex:1" data-prog="'+i+'">Быстрый просмотр</button>'+
      '<a class="btn btn-primary" style="flex:1" href="'+p.link+'">Открыть</a></div></div>';
    cards.appendChild(el);
  });
  var modal=document.getElementById('modal');
  function open(i){var p=PROGRAMS[i];document.getElementById('mImg').src='assets/'+p.img;
    document.getElementById('mCat').textContent=p.cat;document.getElementById('mName').textContent=p.name;
    document.getElementById('mDesc').textContent=p.desc;document.getElementById('mLink').href=p.link;
    modal.classList.add('open');document.body.style.overflow='hidden';}
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  document.addEventListener('click',function(e){var pr=e.target.closest('[data-prog]');
    if(pr){open(+pr.getAttribute('data-prog'));return;}if(e.target.closest('[data-close]'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();
</script>`
  + scripts() + `
</body></html>`;
}

/* ================= legal pages ================= */
const legalWrap = (title, updated, body) =>
  head(title+' — USMANOVA FIT', title)
  + headerMain()
  + `<main class="legal"><h1>${title}</h1><div class="upd">Редакция от ${updated}</div>${body}
  <div class="box"><b>Реквизиты</b><br>${ORG.name}<br>ИНН ${ORG.inn}, КПП ${ORG.kpp}, ОГРН ${ORG.ogrn}<br>${ORG.addr}<br>E-mail: ${ORG.email}</div>
  </main>`
  + footer() + cookie() + scripts() + `\n</body></html>`;

const oferta = () => legalWrap('Публичная оферта','1 июля 2026 г.',`
<p>Настоящий документ является публичной офертой ${ORG.name} (далее — «Исполнитель») и содержит все существенные условия оказания информационно-консультационных услуг (доступа к онлайн-программам тренировок и питания).</p>
<h2>1. Предмет договора</h2>
<p>Исполнитель предоставляет Пользователю доступ к выбранной онлайн-программе на срок, указанный в тарифе, а Пользователь оплачивает услуги на условиях настоящей оферты.</p>
<h2>2. Стоимость и оплата</h2>
<ul><li>Стоимость указана на странице соответствующей программы.</li><li>Оплата производится картами Мир, Visa, Mastercard, через СБП или в рассрочку.</li><li>Доступ открывается в течение 24 часов после поступления оплаты.</li></ul>
<h2>3. Возврат</h2>
<p>Возврат денежных средств осуществляется в соответствии с законодательством РФ и Законом «О защите прав потребителей». Для возврата направьте заявление на ${ORG.email}.</p>
<h2>4. Ответственность</h2>
<p>Программы носят информационный характер. Перед началом тренировок рекомендуется проконсультироваться с врачом. Исполнитель не несёт ответственности за самостоятельно принятые решения Пользователя.</p>`);

const privacy = () => legalWrap('Политика конфиденциальности','1 июля 2026 г.',`
<p>Настоящая Политика описывает, как ${ORG.name} обрабатывает персональные данные пользователей сайта в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».</p>
<h2>1. Какие данные мы собираем</h2>
<ul><li>Имя и номер телефона, указанные в форме заявки.</li><li>Технические данные: cookie, IP-адрес, данные о посещении.</li></ul>
<h2>2. Цели обработки</h2>
<ul><li>Связь с пользователем и подбор программы.</li><li>Оформление и исполнение заказа.</li><li>Улучшение работы сайта.</li></ul>
<h2>3. Хранение и защита</h2>
<p>Данные хранятся на защищённых серверах и не передаются третьим лицам, кроме случаев, предусмотренных законом. Срок хранения — не дольше, чем требуется для целей обработки.</p>
<h2>4. Права пользователя</h2>
<p>Вы вправе запросить доступ, изменение или удаление своих данных, направив обращение на ${ORG.email}.</p>
<h2>5. Cookie</h2>
<p>Сайт использует cookie-файлы для корректной работы и аналитики. Вы можете отключить их в настройках браузера.</p>`);

const consent = () => legalWrap('Согласие на обработку персональных данных','1 июля 2026 г.',`
<p>Отправляя форму на сайте, пользователь даёт ${ORG.name} согласие на обработку своих персональных данных на следующих условиях.</p>
<h2>1. Перечень данных</h2>
<p>Фамилия, имя, номер телефона, адрес электронной почты, а также технические данные (cookie, IP-адрес).</p>
<h2>2. Перечень действий</h2>
<p>Сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу (в объёме, необходимом для исполнения заказа), обезличивание, блокирование и удаление.</p>
<h2>3. Цель</h2>
<p>Обратная связь, подбор и оказание услуг, информирование о продуктах и акциях.</p>
<h2>4. Срок действия и отзыв</h2>
<p>Согласие действует до момента его отзыва. Отозвать согласие можно, направив заявление на ${ORG.email}.</p>`);

/* ================= write files ================= */
const files = {
  'index.html': indexPage(),
  'oferta.html': oferta(),
  'privacy.html': privacy(),
  'consent.html': consent()
};
PROGRAMS.forEach(p => { files[p.slug + '.html'] = programPage(p); });

let n = 0;
for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, name), html, 'utf8');
  n++;
  console.log('written', name, html.length, 'bytes');
}
console.log('\nDONE:', n, 'files');
