class Sliders {
  private readonly sliders = [
    {
      selector: "#hcservices",
      options: {
        speed: 1200,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
          nextEl: ".hcservices__navigation-button_next",
          prevEl: ".hcservices__navigation-button_prev",
        },
        pagination: {
          el: ".hcservices__pagination",
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerGroup: 1,
            slidesPerView: 1.6,
            spaceBetween: 10,
          },
          768: {
            slidesPerGroup: 1,
            slidesPerView: 2.3,
            spaceBetween: 40,
          },
          992: {
            slidesPerGroup: 3,
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      },
    },
  ];

  constructor() {
    this.initSliders();
  }

  initSliders() {
    this.sliders.forEach(slider => {
      if (document.querySelector(slider.selector)) {
        //@ts-expect-error Swiper is defined in the global scope
        if (typeof Swiper !== "undefined") {
          //@ts-expect-error Swiper is defined in the global scope
          new Swiper(slider.selector, slider.options);
        }
      }
    });
  }
}

export default Sliders;
