import Sliders from "./components/sliders";
import Scroll from "./scroll";
import BackTopButton from "./components/back-top-button";
import GLightbox from "glightbox";
import AccordionCollection from "./components/accordion";
import "../styles/main.scss";
import "glightbox/dist/css/glightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
  new Sliders();
  new BackTopButton(900, "home");
  new AccordionCollection();

  GLightbox({
    selector: ".video-lightbox",
  });

  const scroll = new Scroll();
  scroll.initSmoothScroll();
  scroll.initAOS();
});
