import intro from "../assets/about/intro.webp";
import education from "../assets/about/education.webp";
import masterclass from "../assets/about/masterclass.webp";
import awardLeft from "../assets/about/award-left.webp";
import awardRight from "../assets/about/award-right.webp";
import manifest from "../assets/manifest.json";

export default function About() {
  return (
    <main className="about">
      <h1 className="sr-only">Обо мне — фотограф новорожденных Екатерина Крюкова, Краснодар</h1>
      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -half">
            <p>Меня зовут Екатерина, я&nbsp;— фотограф новорожденных и&nbsp;малышей до&nbsp;года в&nbsp;Краснодаре.&nbsp;</p>
            <p>Фотографией я&nbsp;занимаюсь уже больше 10 лет, но&nbsp;после рождения третьего ребенка, я&nbsp;окончательно поняла, что больше всего люблю фотографировать новорожденных малышей. С&nbsp;тех пор я&nbsp;активно развиваюсь в&nbsp;этом направлении.</p>
          </div>
          <div className="about-col -half">
            <img
              src={intro}
              alt="Фотограф новорожденных Екатерина Крюкова"
              width={manifest["about/intro.webp"]?.w}
              height={manifest["about/intro.webp"]?.h}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -third">
            <img
              src={education}
              alt="Диплом фотографа новорожденных после курса обучения"
              width={manifest["about/education.webp"]?.w}
              height={manifest["about/education.webp"]?.h}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-col -two-thirds">
            <p>
              &nbsp; Фотосъемка новорожденных&nbsp;— это кропотливый процесс, требующий грамотного подхода и&nbsp;обучения, ведь вы&nbsp;доверяете фотографу самое дорогое.
              <br />
              <br />
              Консультации неонатолога, детальная отработка позирования, домашние задания, разборы и&nbsp;дипломная работа.&nbsp;
              <br />
              <br />
              Больше двух месяцев я&nbsp;проходила авторский курс у&nbsp;талантливой{" "}
              <a href="https://www.instagram.com/alenagorohovskaya/">@alenagorohovskaya</a>,
              <br />
              и&nbsp;вот в&nbsp;копилочку добавился долгожданный диплом.
              <br />
              <br />
              О&nbsp;чем это говорит? О&nbsp;том, что я&nbsp;знаю и&nbsp;умею правильно, безопасно и&nbsp;красиво провести фотосессию с&nbsp;вашим малышом, чтобы результат вас радовал долгие годы.&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>

      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -third">
            <p>На мастерклассе Насти Филлиповой узнала много новых хитростей, влюбилась в идеальные позировки малышей и всегда к ним стремлюсь 🥰</p>
          </div>
          <div className="about-col -two-thirds">
            <img
              src={masterclass}
              alt="На мастерклассе по позированию новорожденных"
              width={manifest["about/masterclass.webp"]?.w}
              height={manifest["about/masterclass.webp"]?.h}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -third">
            <img
              src={awardLeft}
              alt="Награда за лучшую съемку новорожденных"
              width={manifest["about/award-left.webp"]?.w}
              height={manifest["about/award-left.webp"]?.h}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-col -third about-center">
            <h2>Best newborn photographer</h2>
            <p>Вошла в топ ньюборн фотографов в известном <a href="https://35awards.com/page/contests/num/722/photographers/">фотоконкурсе</a>&nbsp;35awards.com.</p>
          </div>
          <div className="about-col -third">
            <img
              src={awardRight}
              alt="Диплом фотоконкурса 35awards"
              width={manifest["about/award-right.webp"]?.w}
              height={manifest["about/award-right.webp"]?.h}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </main>
  );
}