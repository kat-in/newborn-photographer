import hero from "../data/images/007.jpg";

export default function Contacts() {
  return (
    <main className="page-section">
      <img className="contacts-hero reveal" src={hero} alt="Фотограф новорожденных" />
      <p className="contacts-title reveal">Спасибо за проявленный интерес к моему творчеству!</p>
      <p className="reveal">Свяжитесь со мной удобным для вас способом:</p>
      <div className="contacts-buttons reveal">
        <a
          className="contacts-button"
          href="tel:+79787150969"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"
            />
          </svg>
          +7 978 715-09-69
        </a>
        <a
          className="contacts-button"
          href="https://max.ru/u/f9LHodD0cOLURzm_cO8e8A1YaMaDx4AqpjEEXyT_Mht-1ZmPIvNmRlM8BkQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 1000 1000" width="20" height="20">
            <path
              fill="currentColor"
              d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
            />
          </svg>
          Написать в Max
        </a>
        <a
          className="contacts-button"
          href="https://t.me/katInDev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 448 512" width="20" height="20">
            <path
              fill="currentColor"
              d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
            />
          </svg>
          Написать в Телеграм
        </a>
      </div>
      <p className="contacts-title reveal">С радостью стану первым фотографом вашего малыша!</p>
    </main>
  );
}