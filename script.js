document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".delivery-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // не даём браузеру перезагрузить страницу

    // Собираем данные из формы
    const name = document.querySelector(".delivery-form__contacts-input--name").value;
    const phone = document.querySelector(".delivery-form__contacts-input--num").value;
    const comment = document.querySelector(".delivery-form__contacts-input--comment").value;

    // Текст для Telegram
    const message = `
📩 Новая заявка с сайта:
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment}
    `;

    // Твои данные
    const TOKEN = "ТОКЕН_ТВОЕГО_БОТА";
    const CHAT_ID = "ТВОЙ_CHAT_ID";
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        alert("Заявка отправлена! ✅");
        form.reset(); // очищаем форму
      } else {
        alert("Ошибка при отправке ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сети!");
    }
  });
});
