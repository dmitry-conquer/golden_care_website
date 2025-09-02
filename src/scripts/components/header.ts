export class Header {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    triggerButton: "[data-js-header-trigger-button]",
  };

  private readonly attributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  private rootElement: HTMLElement | null;
  private overlayElement: HTMLElement | null;
  private triggerButtonElement: HTMLElement | null;
  private toggleElements: HTMLElement[];
  private scroll: any;
  private itemHasSubmenuElements: HTMLElement[];

  constructor(scroll: any) {
    this.scroll = scroll;
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement?.querySelector(this.selectors.overlay) || null;
    this.triggerButtonElement = this.rootElement?.querySelector(this.selectors.triggerButton) || null;
    this.itemHasSubmenuElements = Array.from(this.rootElement?.querySelectorAll(".menu-item-has-children") || []);
    this.toggleElements = [this.rootElement, this.overlayElement, this.triggerButtonElement].filter(
      Boolean
    ) as HTMLElement[];

    this.init();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.overlayElement && !!this.triggerButtonElement;
  }

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  private onTriggerButtonClick = (): void => {
    const isActive = this.rootElement?.classList.contains(this.stateClasses.isActive);
    this.setActive(!isActive);
  };

  private setActive(state: boolean): void {
    this.toggleElements.forEach(el => el.classList.toggle(this.stateClasses.isActive, state));
    this.setAttributes(state);
    if (this.scroll && state) {
      this.scroll.stop();
    } else {
      this.scroll.start();
    }
  }

  private setAttributes(state: boolean): void {
    this.triggerButtonElement?.setAttribute(this.attributes.ariaExpanded, String(state));
  }

  get isTouchDevice() {
    return navigator.maxTouchPoints > 0 || window.matchMedia?.("(pointer: coarse)")?.matches;
  }

  private toggleSubmenu(currentIndex: number): void {
    this.itemHasSubmenuElements.forEach((menuItem, index) => {
      const subMenu = menuItem.querySelector("ul") as HTMLElement;
      if (!subMenu) return;
      const active = menuItem.classList.contains("is-active");

      if (currentIndex === index) {
        menuItem?.classList.toggle("is-active");
        subMenu.style.maxHeight = active ? "" : `${subMenu.scrollHeight}px`;
      } else {
        menuItem.classList.remove("is-active");
        subMenu.style.maxHeight = "";
      }
    });
  }

  private handleInteraction(index: number, e: MouseEvent) {
    const menuItem = this.itemHasSubmenuElements[index];
    const isActive = menuItem.classList.contains("is-active");

    if (!isActive) {
      e.preventDefault();
      this.toggleSubmenu(index);
    }
  }

  private onDocumentClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      target.closest(this.selectors.triggerButton) ||
      target.closest(this.selectors.overlay) ||
      target.closest(".menu-item-has-children")
    )
      return;
    this.itemHasSubmenuElements.forEach(menuItem => {
      const subMenu = menuItem.querySelector("ul") as HTMLElement;
      if (!subMenu) return;
      menuItem?.classList.remove("is-active");
      subMenu.style.maxHeight = "";
    });
  };

  bindEvents(): void {
    this.triggerButtonElement?.addEventListener("click", this.onTriggerButtonClick);
    document.documentElement?.addEventListener("click", this.onDocumentClick);
    this.itemHasSubmenuElements.forEach((item, index) => {
      (item.querySelector(":scope > a") as HTMLElement | null)?.addEventListener("click", (event: MouseEvent) => {
        if (this.isTouchDevice) {
          console.log(item);
          this.handleInteraction(index, event);
        }
      });
    });
  }
}

export default Header;
