import Sliders from "./components/sliders";
import Scroll from "./scroll";
import BackTopButton from "./components/back-top-button";
import "../styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  new Sliders();
  new BackTopButton(900, "home");
  
  const scroll = new Scroll();
  scroll.initSmoothScroll();
  scroll.initAOS();
});
