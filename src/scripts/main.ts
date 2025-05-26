import Sliders from "./components/sliders";
import Scroll from "./scroll";
import BackTopButton from "./components/back-top-button";
import GLightbox from "glightbox";
import AccordionCollection from "./components/accordion";
import Header from "./components/header";
import "../styles/main.scss";
import "glightbox/dist/css/glightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
  new Sliders();
  new BackTopButton(900, "top");
  new AccordionCollection();
  new Header();

  GLightbox({
    selector: ".video-lightbox",
  });

  const scroll = new Scroll();
  scroll.initSmoothScroll();
  scroll.initAOS();
});
