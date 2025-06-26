import Sliders from "./components/sliders";
import Scroll from "./scroll";
import BackTopButton from "./components/back-top-button";
import GLightbox from "glightbox";
import AccordionCollection from "./components/accordion";
import Header from "./components/header";
//@ts-expect-error missing types
import { useDynamicAdapt } from "./dynamicAdapt";
import { initModal } from "./modal";
import Members from "./components/members";
import ScrollHeader from "./header-scroll";
import "../styles/main.scss";
import "glightbox/dist/css/glightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
  new Sliders();
  new BackTopButton(900, "top");
  new AccordionCollection();
  useDynamicAdapt();

  GLightbox({
    selector: ".video-lightbox",
  });

  const scroll = new Scroll();
  scroll.initSmoothScroll();
  scroll.initAOS();

  initModal(scroll);
  new Members(scroll);
  new Header(scroll);

  const initScrollHeader = () => {
    let scrollOffset = 300;
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      scrollOffset = heroSection.offsetHeight / 2;
    }
    new ScrollHeader(scrollOffset);
  };
  initScrollHeader();
});
