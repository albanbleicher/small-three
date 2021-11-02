import "../app.scss";
import App from "./app";
if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}
document.addEventListener("DOMContentLoaded", (e) => {
  const canvas = document.querySelector("canvas");
  new App(canvas);
});
