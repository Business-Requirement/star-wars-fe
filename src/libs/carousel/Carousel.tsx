import "./Carousel.scss";
import React, { useEffect, useRef, useState, useCallback } from "react";
import EmblaCarousel, { UserOptions } from "embla-carousel";
import isEqual from "lodash-es/isEqual";
import { useEffectMemo } from "libs/utils";

type Carousel = EmblaCarousel;
export { Carousel };

export interface CarouselProps {
  carouselRef?: (embla: EmblaCarousel) => void;
  options?: UserOptions;
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = props => {
  const container = useRef<HTMLDivElement>(null);
  const emblaRef = useRef<EmblaCarousel>();

  useEffectMemo(() => {
    if (!emblaRef.current && React.Children.count(props.children) > 0) {
      emblaRef.current = EmblaCarousel(container.current! as HTMLElement, props.options);
      if (props.carouselRef) props.carouselRef(emblaRef.current);
    }
    emblaRef.current?.changeOptions(props.options || {});
  }, [props.options, React.Children.count(props.children)]);

  return (
    <div className="carousel-wrapper" ref={container}>
      <div className="carousel-container">
        {React.Children.map(props.children, (slide, idx) => (
          <div className="slide-container" key={idx}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

const CarouselPropsCompare = (prevProps: CarouselProps, nextProps: CarouselProps) => {
  if (React.Children.count(prevProps.children) !== React.Children.count(nextProps.children)) {
    return false;
  }

  return isEqual(prevProps.options, nextProps.options);
};
const CarouselMemo = React.memo(Carousel, CarouselPropsCompare);
export { CarouselMemo };

// carousel utility
// use for dot
export interface CarouselDotsProps {
  carousel: EmblaCarousel | undefined;
  className?: string;
  selectedClassName?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = props => {
  type ScrollSnapList = ReturnType<EmblaCarousel["scrollSnapList"]>;
  const [scrollSnaps, setScrollSnaps] = useState<ScrollSnapList>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (props.carousel) {
      setScrollSnaps(props.carousel.scrollSnapList());
      setSelectedIndex(props.carousel.selectedScrollSnap());
      props.carousel.on("select", () => {
        setSelectedIndex(props.carousel!.selectedScrollSnap());
      });
    }
  }, [props.carousel]);

  const onDotSelect = useCallback(
    (index: number) => {
      if (props.carousel) {
        props.carousel.scrollTo(index);
      }
    },
    [props.carousel]
  );

  // default class
  const _class = props.className || "";
  const _selectedClass = props.selectedClassName || "";

  return (
    <>
      {scrollSnaps.map((snap, index) => (
        <button className={`${_class} ${index === selectedIndex ? _selectedClass : ""}`} key={index} onClick={() => onDotSelect(index)}></button>
      ))}
    </>
  );
};

export { CarouselDots };

// use for button
export interface CarouselButtonsProps {
  carousel: EmblaCarousel | undefined;
  className?: string;
  disableClassName?: string;
  nextContent?: React.ReactNode;
  prevContent?: React.ReactNode;
}

const CarouselButtons: React.FC<CarouselButtonsProps> = props => {
  const [nextEnable, setNextEnable] = useState<boolean>(true);
  const [prevEnable, setPrevEnable] = useState<boolean>(true);

  const next = useCallback(() => {
    if (props.carousel && props.carousel.canScrollNext()) {
      props.carousel.scrollNext();
    }
  }, [props.carousel]);

  const prev = useCallback(() => {
    if (props.carousel && props.carousel.canScrollPrev()) {
      props.carousel.scrollPrev();
    }
  }, [props.carousel]);

  useEffect(() => {
    if (props.carousel) {
      setNextEnable(props.carousel.canScrollNext());
      setPrevEnable(props.carousel.canScrollPrev());
      props.carousel.on("select", () => {
        setNextEnable(props.carousel!.canScrollNext());
        setPrevEnable(props.carousel!.canScrollPrev());
      });
    }
  }, [props.carousel]);

  // default val
  const _class = props.className || "";
  const _disableClass = props.disableClassName || "";

  return (
    <>
      <button className={`${_class} ${prevEnable ? "" : _disableClass}`} onClick={prev}>
        {props.prevContent}
      </button>
      <button className={`${_class} ${nextEnable ? "" : _disableClass}`} onClick={next}>
        {props.nextContent}
      </button>
    </>
  );
};

export { CarouselButtons };
