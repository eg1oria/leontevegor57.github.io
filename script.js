const TOKEN = "8434380524:AAG-SobibHnfi5piqGfyjJr7WbIlqiEumZA";
    const CHAT_ID = "2010505085";
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    document.getElementById("tgForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      let message = "<b>Новая заявка с сайта MiAmore coffee</b>\n\n";
      formData.forEach((value, key) => {
        message += `<b>${key}:</b> ${value}\n`;
      });

      const statusEl = document.getElementById("statusMessage");

      fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "charset": "utf-8" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "html"
        })
      })
      .then(res => {
        if (res.ok) {
          statusEl.textContent = "✅ Заявка отправлена!";
          statusEl.className = "status success";
          this.reset();
        } else {
          statusEl.textContent = "❌ Ошибка при отправке.";
          statusEl.className = "status error";
        }
      })
      .catch(err => {
        statusEl.textContent = "⚠️ Ошибка: " + err;
        statusEl.className = "status error";
      });
    });