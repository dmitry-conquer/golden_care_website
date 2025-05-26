export class Header {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    triggerButton: "[data-js-header-trigger-button]",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  private rootElement: HTMLElement | null;
  private overlayElement: HTMLElement | null;
  private triggerButtonElement: HTMLElement | null;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement?.querySelector(this.selectors.overlay) || null;
    this.triggerButtonElement = this.rootElement?.querySelector(this.selectors.triggerButton) || null;

    this.init();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.overlayElement && !!this.triggerButtonElement;
  }

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  private onDocumentClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.closest(this.selectors.triggerButton) || target.closest(this.selectors.overlay)) return;
    this.triggerButtonElement?.classList.remove(this.stateClasses.isActive);
    this.overlayElement?.classList.remove(this.stateClasses.isActive);
    document.documentElement.classList.remove(this.stateClasses.isLock);
  };

  private onTriggerButtonClick = (): void => {
    this.triggerButtonElement?.classList.toggle(this.stateClasses.isActive);
    this.overlayElement?.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  bindEvents(): void {
    this.triggerButtonElement?.addEventListener("click", this.onTriggerButtonClick);
    document.documentElement?.addEventListener("click", this.onDocumentClick);
  }
}

export default Header;
