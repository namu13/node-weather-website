const input = document.querySelector("input");
const firstMessage = document.querySelector(".message-1");
const secondMessage = document.querySelector(".message-2");
const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInput = input.value;

  firstMessage.textContent = "Loding...";
  secondMessage.textContent = "";

  fetch(`http://localhost:3000/weather?address=${userInput}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          firstMessage.textContent = data.error;
        } else {
          firstMessage.textContent = data.location;
          secondMessage.textContent = data.forecast;
        }
      });
    }
  );
});
