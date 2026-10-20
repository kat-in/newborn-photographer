import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import slide01 from "../assets/home/slide01.webp";
import slide02 from "../assets/home/slide02.webp";
import slide03 from "../assets/home/slide03.webp";
import slide04 from "../assets/home/slide04.webp";
import slide05 from "../assets/home/slide05.webp";
import slide06 from "../assets/home/slide06.webp";
import slide07 from "../assets/home/slide07.webp";
import slide08 from "../assets/home/slide08.webp";
import slide09 from "../assets/home/slide09.webp";
import slide10 from "../assets/home/slide10.webp";
import slide11 from "../assets/home/slide11.webp";
import slide12 from "../assets/home/slide12.webp";
import slide13 from "../assets/home/slide13.webp";
import intro from "../assets/home/intro.webp";
import work from "../assets/home/work.webp";
import deliver from "../assets/home/deliver.webp";
import before from "../assets/home/before.webp";
import after from "../assets/home/after.webp";
import videoPoster from "../assets/home/video-poster.webp";
import manifest from "../assets/manifest.json";

const SLIDE_ALT = "Фотограф новорожденных Краснодар — Екатерина Крюкова";

const SLIDES = [slide01, slide02, slide03, slide04, slide05, slide06, slide07, slide08, slide09, slide10, slide11, slide12, slide13];

const SLIDE_ALTS = [
  SLIDE_ALT,
  SLIDE_ALT,
  SLIDE_ALT,
  "Фотосессия новорожденного в косухе",
  SLIDE_ALT,
  SLIDE_ALT,
  SLIDE_ALT,
  SLIDE_ALT,
  SLIDE_ALT,
  "Фотосессия ньюборн",
  "Фотограф ньюборн в Краснодаре",
  "Фотосессия новорожденного лягушка",
  SLIDE_ALT,
];

const TRACK = [...SLIDES, ...SLIDES, ...SLIDES];

const SLIDE_DELAY = 5000;
const HOVER_DELAY = 3500;

const Chevron = ({ dir }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}
  >
    <path
      d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Slider() {
  const stripRef = useRef(null);
  const indexRef = useRef(SLIDES.length);
  const timerRef = useRef(null);
  const dirRef = useRef(1);
  const delayRef = useRef(SLIDE_DELAY);
  const modeRef = useRef("auto");
  const [index, setIndex] = useState(SLIDES.length);
  const [stripW, setStripW] = useState(0);
  const [stripH, setStripH] = useState(0);
  const [noTr, setNoTr] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);

  const go = useCallback((dir) => {
    const N = SLIDES.length;
    const raw = indexRef.current + dir;
    if (raw === 2 * N || raw === N - 1) {
      const bounced = raw === 2 * N ? N : 2 * N - 1;
      setNoTr(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setNoTr(false)));
      indexRef.current = bounced;
      setIndex(bounced);
    } else {
      indexRef.current = raw;
      setIndex(raw);
    }
  }, []);

  const rearmRef = useRef(null);

  const onZoneEnter = useCallback((zone) => {
    dirRef.current = zone === "prev" ? -1 : 1;
    if (modeRef.current !== "hover") {
      modeRef.current = "hover";
      delayRef.current = HOVER_DELAY;
      rearmRef.current?.(HOVER_DELAY);
    }
  }, []);

  const onZoneLeave = useCallback(() => {
    dirRef.current = 1;
    if (modeRef.current !== "auto") {
      modeRef.current = "auto";
      delayRef.current = SLIDE_DELAY;
      rearmRef.current?.(SLIDE_DELAY);
    }
  }, []);

  const onPointerUp = useCallback((e) => {
    if (e.pointerType === "touch") {
      onZoneLeave();
    }
  }, [onZoneLeave]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 900px)");
    const applyMobile = () => setMobile(mq.matches);
    mq.addEventListener?.("change", applyMobile);
    const update = () => {
      setStripW(el.clientWidth);
      setStripH(el.clientHeight);
    };
    let raf1;
    let raf2;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    raf1 = requestAnimationFrame(() => {
      applyMobile();
      raf2 = requestAnimationFrame(() => setReady(true));
    });
    const step = () => {
      go(dirRef.current);
      timerRef.current = setTimeout(step, delayRef.current);
    };
    const rearm = (delay) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(step, delay);
    };
    rearmRef.current = rearm;
    rearm(SLIDE_DELAY);
    return () => {
      ro.disconnect();
      mq.removeEventListener?.("change", applyMobile);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timerRef.current);
      rearmRef.current = null;
    };
  }, [go]);

  const slideW = mobile ? stripW : Math.round(stripH * (2000 / 1333));
  const peek = mobile ? 0 : Math.max(0, Math.round((stripW - slideW) / 2));

  return (
    <div
      className="strip"
      ref={stripRef}
      role="region"
      aria-label="Работы фотографа"
      style={{ "--slide-w": slideW ? `${slideW}px` : "150vh" }}
    >
      <div
        className="slides"
        style={{
          transform: `translate3d(${slideW ? peek - index * slideW : 0}px, 0, 0)`,
          transition: !ready || noTr ? "none" : "transform 0.4s ease",
        }}
      >
        {TRACK.map((src, i) => {
          const m = manifest[`home/slide${String((i % SLIDES.length) + 1).padStart(2, "0")}.webp`];
          return (
            <div className="slide" key={`${src}-${i}`}>
              <img
                src={src}
                alt={SLIDE_ALTS[i % SLIDES.length]}
                width={m?.w}
                height={m?.h}
                decoding="async"
                fetchPriority={i === SLIDES.length ? "high" : "auto"}
              />
            </div>
          );
        })}
      </div>
      <div className="controls" onPointerLeave={onZoneLeave} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <div
          className="prev"
          onPointerEnter={() => onZoneEnter("prev")}
          onPointerDown={() => onZoneEnter("prev")}
        >
          <div className="handler"><Chevron dir="left" /></div>
        </div>
        <div
          className="next"
          onPointerEnter={() => onZoneEnter("next")}
          onPointerDown={() => onZoneEnter("next")}
        >
          <div className="handler"><Chevron dir="right" /></div>
        </div>
      </div>
    </div>
  );
}

const QUESTIONS = [
  {
    t: "Лучший возраст ребенка для фотосессии",
    a: [
      <p key="0">Лучший возраст для фотосессии новорожденного 5-14 дней.</p>,
      <p key="1">В&nbsp;этот период дети крепко спят, меньше вероятность проявления колик.</p>,
      <p key="2">Но&nbsp;если малышу уже больше 14 дней, а&nbsp;вы&nbsp;только задумались о&nbsp;съемке, не&nbsp;тяните дальше, у&nbsp;вас все еще есть возможность получить неповторимые кадры.</p>,
    ],
  },
  {
    t: "Соска",
    a: [
      <p key="0">Чтобы фотосъемка прошла легче, обязательно подготовьте соску для малыша. Кроха будет сосредоточен на&nbsp;сосании и&nbsp;быстрее уснет.</p>,
      <p key="1">Соска используется только по&nbsp;необходимости, поэтому ребенок не&nbsp;привыкнет к&nbsp;ней за&nbsp;столь короткий промежуток времени.</p>,
      <p key="2">Если вам кажется, что малыш соску не&nbsp;берет, все равно лучше позаботиться о&nbsp;ее&nbsp;наличии. Даже в&nbsp;таких ситуациях&nbsp;— это палочка&nbsp;— выручалочка.&nbsp;</p>,
    ],
  },
  {
    t: "Температура в помещении",
    a: [
      <p key="0">Оптимальная температура для проведения съемки 28 градусов.</p>,
      <p key="1">Взрослым может быть жарковато, но&nbsp;малышу будет тепло и&nbsp;уютно, что важно для крепкого и&nbsp;спокойного сна.</p>,
      <p key="2">Конечно, такая температура не&nbsp;является рекомендацией на&nbsp;каждый день и&nbsp;необходима только на&nbsp;фотосессии.&nbsp;</p>,
    ],
  },
  {
    t: "Что сделать, чтобы не болел животик?",
    a: [
      <p key="0">Точно спрогнозировать будет&nbsp;ли беспокоить животик малыша мы&nbsp;не&nbsp;можем, все очень индивидуально, но&nbsp;все&nbsp;же можно учесть некоторые моменты, чтобы предотвратить или облегчить это состояние.</p>,
      <p key="1">Если малыш на&nbsp;ГВ, то&nbsp;не&nbsp;вводите новые&nbsp;продукты в&nbsp;свой рацион за&nbsp;2-3 дня до&nbsp;съемки, соблюдайте диету. Лучше исключить молоко и&nbsp;хлебо-булочные изделия.&nbsp;</p>,
      <p key="2">Подготовьте ветрогонное средство от&nbsp;колик (уменьшающих образование в&nbsp;желудочно-кишечном тракте газов и&nbsp;помогающих их&nbsp;выведению при метеоризме). Хорошо подойдет Эспумизан, Саб-Симплекс, Боботик (средства содержащие симетикон). Эти препараты не&nbsp;всасываются в&nbsp;кровь и&nbsp;имеют накопительный эффект.</p>,
      <p key="3">Если не&nbsp;было отдельных рекомендаций врача НЕ&nbsp;начинайте давать средство для микрофлоры Биогая.</p>,
      <p key="4">Это пробиотик и&nbsp;действует совсем иначе. Моментального эффекта не&nbsp;будет, а&nbsp;вот еще больше беспокоить животик может. Это выводы из&nbsp;личных наблюдений. Начните давать уже после съемки, если хотите.&nbsp;</p>,
    ],
  },
  {
    t: "Я хочу подарить фотосессию новорожденного. Есть ли подарочные сертификаты?",
    a: [
      <p key="0">Да! Фотосессия ньюборн - отличный подарок на рождения ребенка от родственников, коллег, друзей. К любому из пакетов можно приобрести подарочный сертификат.&nbsp;</p>,
      <p key="1">Но, чтобы подарок еще больше порадовал молодых родителей, прочтите несколько рекомендаций:</p>,
      <p key="2">- срок действия сертификата на ньюборн фотосессию ограничен периодом новорожденности малыша (28 дней). Оптимальный же возраст 5-14 дней. Поэтому свободные даты на съемку лучше согласовать сразу с родителями и мной на моменте приобретения подарка.</p>,
      <p key="3">- приобретение сертификата не должно быть сюрпризом. Это тот случай, когда подарок важно согласовать с родителями. Хотят ли они вообще такую съемку малышу? Нравится ли мой стиль? Знают ли они об особенностях фотосессии новорожденного? Как долго она длится, какой оптимальный возраст, как проходит съемка?</p>,
      <p key="4">- сертификат не подлежит возврату и обмену на денежный эквивалент.</p>,
    ],
  },
];

function Comparer() {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);

  const update = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(95, Math.max(5, p)));
  };

  const onDown = (e) => {
    e.preventDefault();
    update(e.clientX);
    const move = (ev) => update(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className="comparison" ref={ref} onPointerDown={onDown} style={{ "--pos": `${pos}%` }}>
      <img
        src={after}
        alt="Фотография новорожденного после авторской обработки"
        width={manifest["home/after.webp"]?.w}
        height={manifest["home/after.webp"]?.h}
        loading="lazy"
        decoding="async"
      />
      <div className="before">
        <img
          src={before}
          alt="Фотография новорожденного до авторской обработки"
          width={manifest["home/before.webp"]?.w}
          height={manifest["home/before.webp"]?.h}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="drag" />
    </div>
  );
}

function Questions() {
  const [open, setOpen] = useState(new Set());

  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="questions">
      {QUESTIONS.map((q, i) => (
        <div className={`accord${open.has(i) ? " open" : ""}`} key={q.t}>
          <h3 className="a-title" onClick={() => toggle(i)}>
            {q.t}
            <span className="a-plus">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </h3>
          <div className="a-answer">
            <div className="a-inner">{q.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VkVideo() {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className="video">
        <iframe
          src="https://vk.com/video_ext.php?oid=3355064&id=456239119&hash=b3997b1b8e8848de&autoplay=1"
          title="Видео: фотокнига новорожденного"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video">
      <div className="overlay" onClick={() => setPlay(true)}>
        <img
          src={videoPoster}
          alt="Видео о фотокнигах для новорожденных"
          width={manifest["home/video-poster.webp"]?.w}
          height={manifest["home/video-poster.webp"]?.h}
          loading="lazy"
          decoding="async"
        />
        <span className="play">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1e1e1e">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const targets = document.querySelectorAll(".home .strip, .home .home-box");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="home">
      <h1 className="sr-only">Фотограф новорожденных в Краснодаре — Екатерина Крюкова</h1>

      <Slider />

      <div className="home-box">
        <div className="row">
          <div className="col-6">
            <h2 className="sec-title"><b>Привет, я&nbsp;Екатерина&nbsp;</b></h2>
            <h2 className="sec-title">&nbsp;— фотограф новорожденных в&nbsp;Краснодаре.</h2>
            <p className="home-lead">Если вы&nbsp;оказались на&nbsp;моем сайте, наверняка вы&nbsp;хотите сохранить память о&nbsp;первых днях жизни крошечного человечка. Фотосессия newborn&nbsp;— отличный подарок на&nbsp;рождение ребенка.</p>
            <p>Посмотрите <Link to="/gallery/">галерею моих работ</Link> и&nbsp;узнайте <Link to="/pricing/">стоимость фотосессии</Link> новорожденного в&nbsp;Краснодаре.</p>
          </div>
          <div className="col-6">
            <div className="pic -round">
              <img
                src={intro}
                alt="Екатерина Крюкова — фотограф новорожденных в Краснодаре"
                width={manifest["home/intro.webp"]?.w}
                height={manifest["home/intro.webp"]?.h}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row">
          <div className="col-6">
            <div className="pic">
              <img
                src={work}
                alt="Съемка новорожденного в специализированной студии фотографа в Краснодаре"
                width={manifest["home/work.webp"]?.w}
                height={manifest["home/work.webp"]?.h}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="col-6">
            <h2 className="sec-title">Как я&nbsp;работаю</h2>
            <p>Все что вам понадобится для фотосессии&nbsp;новорожденного&nbsp;— это малыш и&nbsp;соска.&nbsp;</p>
            <h3>ПРЕДВАРИТЕЛЬНАЯ ЗАПИСЬ:</h3>
            <ul>
              <li>Я&nbsp;записываю на&nbsp;фотосессию еще во&nbsp;время беременности за&nbsp;3-4 недельки до&nbsp;ПДР (предварительной даты родов)</li>
              <li>Запись производится по&nbsp;предоплате 2000р (далее эта сумма идет в&nbsp;счет оплаты съемки)</li>
              <li>Если малыш уже родился, пишите мне как можно скорее, времени остается все меньше, я&nbsp;обязательно найду для вас окошко!</li>
              <li>Если вы&nbsp;записались по&nbsp;ПДР, то&nbsp;место для вашей фотосессии уже забронировано, как только малыш родится, вы&nbsp;сообщаете мне и&nbsp;мы&nbsp;назначаем точный день съемки.&nbsp;</li>
              <li>Важно! Сообщите мне о&nbsp;рождении малыша в&nbsp;самые первые дни.</li>
            </ul>
            <h3>В&nbsp;ДЕНЬ ФОТОСЕСИИ:</h3>
            <ul>
              <li>Съемка проходит в&nbsp;<b>моей специализированной фотостудии для новорожденных и&nbsp;малышей до&nbsp;года.</b></li>
              <li>В&nbsp;студии есть&nbsp;все&nbsp;необходимое&nbsp;<b>оборудование и&nbsp;реквизит;</b></li>
              <li>Я&nbsp;сама&nbsp;<b>укачаю, одену, красиво уложу малыша&nbsp;</b>и&nbsp;сделаю самые милые кадры для вас!</li>
              <li>В&nbsp;день съемки вы&nbsp;будете отдыхать и&nbsp;наблюдать за&nbsp;процессом.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row">
          <div className="col-6">
            <h2 className="sec-title">Как я&nbsp;отдаю фотографии</h2>
            <p>&nbsp;</p>
            <ul>
              <li>Через неделю после съемки я&nbsp;пришлю ссылку со&nbsp;всеми удачными кадрами в&nbsp;минимальной цветокоррекции. Из&nbsp;этих кадров вы&nbsp;можете&nbsp;<b>самостоятельно выбрать фотографии&nbsp;</b>для авторской обработки.&nbsp;</li>
              <li>Если вы&nbsp;не&nbsp;сделали выбор в&nbsp;течении&nbsp;<b>1 месяца,</b>&nbsp;то&nbsp;я&nbsp;отбираю фото самостоятельно и&nbsp;приступаю к&nbsp;работе. После этого момента мой выбор изменениям уже не&nbsp;подлежит.</li>
              <li>полноразмерные фотографии в&nbsp;электронном виде будут готовы&nbsp;<b>через 45 дней после вашего отбора;</b></li>
              <li>если в&nbsp;пакет входит&nbsp;<b>фотокнига</b>, то&nbsp;после готовности фотографий в&nbsp;электронном виде, я&nbsp;сделаю макет книги, согласую с&nbsp;вами и&nbsp;отправлю на&nbsp;печать.&nbsp;</li>
              <li>Если вы&nbsp;задерживаете согласование макета книги более чем на&nbsp;3 месяца, то&nbsp;в&nbsp;случае изменения стоимости книги, необходимо внести доплату.</li>
              <li>Когда книга будет напечатана, я&nbsp;проверяю&nbsp;качество печати и&nbsp;только после этого передаю готовый результат&nbsp;вам.&nbsp;<b>Готовность книги в&nbsp;течение 30 дней с&nbsp;момента отправки на&nbsp;печать.&nbsp;</b></li>
            </ul>
          </div>
          <div className="col-6">
            <div className="pic">
              <img
                src={deliver}
                alt="Фотокнига с фотографиями новорожденного — результат фотосессии"
                width={manifest["home/deliver.webp"]?.w}
                height={manifest["home/deliver.webp"]?.h}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row -top">
          <div className="col-8">
            <Comparer />
          </div>
          <div className="col-4">
            <h2 className="sec-title">Детальная обработка</h2>
            <p>У&nbsp;новорожденных малышей редко бывает идеальная кожа.</p>
            <p>Покраснения, шелушинки, царапинки, желтушка, даже зеленый пупок&nbsp;— все это часто встречается, но&nbsp;совершенно не&nbsp;мешает провести съемку.&nbsp;</p>
            <p>После обработки кожа малыша будет ровной и&nbsp;гладкой, все дефекты будут отретушированы.</p>
            <p>&nbsp;При этом я&nbsp;стараюсь сохранить максимальную естественность на&nbsp;фотографии.</p>
            <p><br /></p>
            <p>Пожалуйста, ознакомьтесь с моими работами. Выбирая меня своим фотографом, вы соглашаетесь с авторским стилем обработки фотографий.&nbsp;</p>
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row -top">
          <div className="col-4">
            <h2>Фотокниги</h2>
            <p>Благодаря оформлению&nbsp;фотосессии&nbsp;новорожденного в&nbsp;виде фотокниги, вы&nbsp;получите не&nbsp;только предмет интерьера (ведь книга может быть украшением полки в&nbsp;детской или гостинной), но&nbsp;и&nbsp;ценные воспоминания.</p>
            <p>Качественная точная печать, приятная на&nbsp;ощупь обложка, плотные страницы, развороты на&nbsp;180 градусов, а&nbsp;главное самые ценные снимки&nbsp;— все это будет радовать вас долгие годы.&nbsp;&nbsp;</p>
            <p>Вы&nbsp;с&nbsp;легкостью сможете просматривать снимки в&nbsp;любое время, показывать книгу гостям и&nbsp;получать много положительных эмоций.</p>
            <p>А&nbsp;главное&nbsp;— фотокнига станет замечательным памятным подарком на&nbsp;всю жизнь для самого малыша.</p>
          </div>
          <div className="col-8">
            <VkVideo />
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row -top">
          <div className="col-8 col-lg-8-offset-2">
            <h2 className="questions-title">Советы родителям</h2>
            <Questions />
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row -top">
          <div className="col-8 col-lg-8-offset-2">
            <div className="tail">
              <p>Я&nbsp;приношу радость молодым родителям, сохраняя в&nbsp;виде фотографий уникальные моменты первых дней жизни малышей<i>.</i></p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-box">
        <div className="row -top">
          <div className="col-8 col-lg-8-offset-2">
            <h2>Запись на фотосессию новорожденного в Краснодаре</h2>
            <p>
              Я&nbsp;занимаюсь фотосессиями новорожденных (newborn) в&nbsp;Краснодаре и&nbsp;Краснодарском крае больше 10&nbsp;лет.
              Съемки проходят в&nbsp;моей специализированной студии для новорожденных: с&nbsp;отдельной зоной ухода,
              комфортной температурой и&nbsp;профессиональным светом. Оптимальный возраст малыша для съемки&nbsp;— 5–14&nbsp;дней.
            </p>
            <p>
              В&nbsp;пакет входят фотосессия, профессиональная ретушь и&nbsp;печать фотокниги. Узнать актуальные цены
              можно на&nbsp;странице <Link to="/pricing/">пакетов услуг</Link>, а&nbsp;посмотреть примеры работ&nbsp;— в&nbsp;<Link to="/gallery/">галерее</Link>.
              Мои отзывы&nbsp;— на&nbsp;странице <Link to="/reviews/">отзывов клиентов</Link>.
            </p>
            <p>
              <Link to="/contacts/" className="home-cta">
                Записаться на фотосессию
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
