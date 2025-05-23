class Sliders {
  private readonly sliders = [
    {
      selector: "#testimonials-slider",
      options: {
        loop: true,
        speed: 900,
        slidesPerView: 3.7,
        spaceBetween: 20,
        navigation: {
          nextEl: ".testimonials__next",
          prevEl: ".testimonials__prev",
        },
        pagination: {
          el: ".testimonials__pagination",
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3.7,
            spaceBetween: 20,
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
