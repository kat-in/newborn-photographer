import hero from "../data/images/113.jpg";
import malysh from "../data/images/114.jpg";
import standart from "../data/images/115.jpg";
import komfort from "../data/images/116.jpg";

export default function Pricing() {
    return (
        <main className="page-section pricing">
            <img className="pricing-hero reveal" src={hero} alt="Стоимость фотосессии новорожденных" />
            <h1 className="reveal">Стоимость фотосессии новорожденных</h1>
            <div className="pricing-grid">
                <section className="pricing-card reveal">
                    <img className="pricing-card-img" src={malysh} alt="Пакет Малыш" />
                    <h2>Малыш</h2>
                    <ul className="pricing-list">
                        <li>15 обработанных фотографий</li>
                        <li>В пакет входят только фото малыша</li>
                        <li>Консультация по подготовке к съемке</li>
                        <li>Готовые фотографии в электронном виде</li>
                        <li>Необходимый реквизит и оборудование</li>
                        <li>Все удачные кадры в цветокоррекции</li>
                        <li>Съемка проходит в моей специализированной студии</li>
                    </ul>
                    <p className="pricing-price">17 000 руб</p>
                </section>
                <section className="pricing-card reveal">
                    <img className="pricing-card-img" src={standart} alt="Пакет Стандарт" />
                    <h2>Стандарт</h2>
                    <ul className="pricing-list">
                        <li>20 обработанных фотографий</li>
                        <li>В пакет входят семейные фото (по желанию) и фото малыша</li>
                        <li>
                            <a href="https://www.youtube.com/watch?v=fY6e0SBbk3I" target="_blank" rel="noopener noreferrer">
                                Фотокнига 20x20 на 10 разворотов в твердой фотообложке
                            </a>
                        </li>
                        <li>Консультация по подготовке к съемке</li>
                        <li>Готовые фотографии в электронном виде</li>
                        <li>Необходимый реквизит и оборудование</li>
                        <li>Все удачные кадры в цветокоррекции</li>
                        <li>Съемка проходит в моей специализированной студии</li>
                    </ul>
                    <p className="pricing-price">25 000 руб</p>
                </section>
                <section className="pricing-card reveal">
                    <img className="pricing-card-img" src={komfort} alt="Пакет Комфорт" />
                    <h2>Комфорт</h2>
                    <ul className="pricing-list">
                        <li>30 обработанных фотографий</li>
                        <li>В пакет входят семейные фото (по желанию) и фото малыша</li>
                        <li>Фотокнига 20x20 на 15 разворотов в премиум обложке из экокожи с фотоокном</li>
                        <li>Консультация по подготовке к съемке</li>
                        <li>Необходимый реквизит и оборудование</li>
                        <li>Все удачные кадры в цветокоррекции</li>
                        <li>Съемка проходит в моей специализированной студии</li>
                    </ul>
                    <p className="pricing-price">38 000 руб</p>
                </section>
            </div>

            <h2 className="reveal">Дополнительно</h2>
            <ul className="pricing-extra reveal">
                <li>Обработка фото сверх пакета 1 фотография — 500 руб</li>
                <li>Дополнительная фотокнига для родственников 20x20 на 10 разворотов в твердой фотообложке — 8500 руб</li>
                <li>Дополнительный разворот в книге 20x20 — 800 руб</li>
            </ul>

            <p className="pricing-note reveal">Пожалуйста, ознакомьтесь с моими работами.</p>
            <p className="pricing-note reveal">
                Выбирая меня своим фотографом, Вы соглашаетесь с моим авторским стилем обработки фотографий и с включением Ваших снимков в мое портфолио.
            </p>
        </main>
    )
}