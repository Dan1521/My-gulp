

const secutitySwiper = new Swiper('.security__swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 2500,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    }
  }
});