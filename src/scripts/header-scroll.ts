export default class ScrollHeader {
  private rootSelector: string = "[data-js-header]";
  private rootElement: HTMLElement | null;
  private readonly states: Record<string, string> = {
    isVisible: "is-scroll",
  };
  private scrollOffset: number = 100;
  private isTicking: boolean = false;

  constructor(scrollOffset?: number) {
    this.scrollOffset = scrollOffset || this.scrollOffset;
    this.rootElement = document.querySelector(this.rootSelector) || null;
    if (!this.rootElement) return;
    this.bindEvents();
  }

  private toggleVisibility = () => {
    if (!this.rootElement) return;
    const isVisible = window.scrollY > this.scrollOffset;
    this.rootElement.classList.toggle(this.states.isVisible, isVisible);
    this.isTicking = false;
  };

  private onScroll = () => {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(this.toggleVisibility);
    }
  };

  private bindEvents(): void {
    window.addEventListener("scroll", this.onScroll);
  }
}
