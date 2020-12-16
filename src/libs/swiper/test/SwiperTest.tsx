import "./SwiperTest.scss";
import React, { useRef, useState } from "react";
import SwiperSlider, { Swiper } from "../Swiper";

const SwiperTest: React.FC = () => {
  const swiper = useRef<Swiper>();
  const [testState, settestState] = useState(0);

  const next = () => {
    swiper.current?.slideNext();
  };

  const prev = () => {
    swiper.current?.slidePrev();
  };

  return (
    <>
      <SwiperSlider
        className="my-swiper"
        swiperRef={ref => (swiper.current = ref)}
        options={{
          slidesPerView: "auto",
          loop: true,
          centeredSlides: true,
          effect: "coverflow",
          coverflowEffect: {
            rotate: 40,
            slideShadows: false,
            stretch: 30
          },
          pagination: {
            el: ".my-swiper .swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".my-swiper .swiper-button-next",
            prevEl: ".my-swiper .swiper-button-prev"
          }
        }}
      >
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        <div className="swiper-slide">Slide 4</div>
        <div className="swiper-slide">Slide 5</div>
        <div className="swiper-slide">Slide 6</div>
      </SwiperSlider>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <button onClick={next}>Next slide</button>
      <button onClick={prev}>Prev slide</button>
      <br />
      {/* simulate change state of parent Swiper -> check render */}
      <button onClick={() => settestState(testState + 1)}>Change State</button> <span> State: {testState}</span>
    </>
  );
};

export default SwiperTest;
