import "./CarouselTest.scss";
import React, { useRef, useState } from "react";
import Carousel, { CarouselDots, CarouselButtons } from "../Carousel";

const CarouselTest: React.FC = () => {
  const carousel = useRef<Carousel>();
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="carousel1">
        <p>Basic carousel</p>
        <Carousel options={{ loop: true }}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
        </Carousel>
      </div>

      <div className="carousel2">
        <p>
          Carousel with dot and button
          <br />
          Also with cursor demo
        </p>
        <Carousel carouselRef={ref => (carousel.current = ref)} options={{ draggableClass: "carousel-draggable", draggingClass: "carousel-dragging" }}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
          <div>Slide 4</div>
          <div>Slide 5</div>
        </Carousel>
        <div className="carousel-dots-container">
          <CarouselDots carousel={carousel.current} className="carousel-dot" selectedClassName="is-selected"></CarouselDots>
        </div>
        <div className="carousel-buttons-container">
          <CarouselButtons carousel={carousel.current} nextContent="Next" prevContent="Prev" className="carousel-button" disableClassName="is-disable"></CarouselButtons>
        </div>
      </div>

      <div>
        <button onClick={() => setCount(count + 1)}>Parent State: {count}</button>
      </div>
    </>
  );
};

export default CarouselTest;
