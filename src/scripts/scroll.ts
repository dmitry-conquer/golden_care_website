import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import "lenis/dist/lenis.css";

declare const backendData: {
  smoothScroll?: boolean;
};

export default class Scroll {
  private lenis: any;

  private isSmoothScrollReady() {
    return typeof backendData !== "undefined" && backendData.smoothScroll;
  }

  public initSmoothScroll() {
    if (!this.isSmoothScrollReady()) return;
    this.lenis = new Lenis({
      autoRaf: true,
      anchors: true,
    });
    this.bubbleScrollAtEdge();
  }

  public initAOS() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  public stop() {
    this.lenis.stop();
  }

  public start() {
    this.lenis.start();
  }

  public bubbleScrollAtEdge() {
    const scrolledElements = document.querySelectorAll("[data-lenis-prevent]") as NodeListOf<HTMLElement>;
    scrolledElements.forEach((element: HTMLElement) => {
      element?.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          const scrollTop = element.scrollTop;
          const scrollHeight = element.scrollHeight;
          const offsetHeight = element.offsetHeight;
          const delta = e.deltaY;

          if (scrollTop + offsetHeight >= scrollHeight && delta > 0) {
            e.preventDefault();
            window.dispatchEvent(new WheelEvent("wheel", { deltaY: delta }));
          }

          if (scrollTop <= 0 && delta < 0) {
            e.preventDefault();
            window.dispatchEvent(new WheelEvent("wheel", { deltaY: delta }));
          }
        },
        { passive: false }
      );
    });
  }
}
