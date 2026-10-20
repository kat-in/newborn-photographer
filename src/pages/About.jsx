import intro from "../data/about/intro.jpg";
import education from "../data/about/education.jpg";
import masterclass from "../data/about/masterclass.jpg";
import awardLeft from "../data/about/award-left.jpg";
import awardRight from "../data/about/award-right.jpg";

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
            <img src={intro} alt="Фотограф новорожденных Екатерина Крюкова" />
          </div>
        </div>
      </div>

      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -third">
            <img src={education} alt="Диплом фотографа новорожденных после курса обучения" />
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
            <img src={masterclass} alt="На мастерклассе по позированию новорожденных" />
          </div>
        </div>
      </div>

      <div className="about-block reveal">
        <div className="about-row">
          <div className="about-col -third">
            <img src={awardLeft} alt="Награда за лучшую съемку новорожденных" />
          </div>
          <div className="about-col -third about-center">
            <h2>Best newborn photographer</h2>
            <p>Вошла в топ ньюборн фотографов в известном <a href="https://35awards.com/page/contests/num/722/photographers/">фотоконкурсе</a>&nbsp;35awards.com.</p>
          </div>
          <div className="about-col -third">
            <img src={awardRight} alt="Диплом фотоконкурса 35awards" />
          </div>
        </div>
      </div>
    </main>
  );
}