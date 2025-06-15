import MicroModal from "micromodal";

export const initModal = (scroll: any) => {
  MicroModal.init({
    disableScroll: false,
    disableFocus: true,
    onShow: () => scroll.stop(),
    onClose: () => {
      scroll.start();
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
    },
  });
};

export const openModal = (modalId: string, scroll: any) => {
  MicroModal.show(modalId, {
    disableScroll: false,
    disableFocus: true,
    onShow: () => scroll.stop(),
    onClose: () => {
      scroll.start();
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
    },
  });
};

const preventLinkClick = () => {
  const links = document.querySelectorAll("a[data-micromodal-trigger]");
  if (!links.length) return;
  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
    });
  });
};

preventLinkClick();
