import "./Swiper.scss";
import React, { useRef } from "react";
import Swiper, { SwiperOptions, SelectableElement } from "swiper";
import { useEffectMemo } from "libs/utils";
import merge from "lodash-es/merge";
// import isEqual from "lodash-es/isEqual";

// use module
// import { Swiper, SwiperOptions, SelectableElement, Navigation, Pagination, EffectCoverflow } from "swiper/js/swiper.esm";
// Swiper.use([Navigation, Pagination, EffectCoverflow]); // you might need to add more module if use it. Ref at https://swiperjs.com/api/#custom-build

export { Swiper };

export interface SwiperPlugin {
  name: string;
  params?: { [key: string]: any } & SwiperOptions;
}

export interface SwiperProps {
  options?: SwiperOptions;
  swiperRef?: (swiper: Swiper | undefined) => void;
  plugin?: SwiperPlugin;
}

const SwiperSlider: React.FC<SwiperProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slider = useRef<Swiper>();

  const { options, swiperRef, plugin, className, ...others } = props;
  // create/update instance if child change
  useEffectMemo(() => {
    if (!slider.current) {
      const slideOptions = merge(options, plugin?.params);
      slider.current = new Swiper(containerRef.current as SelectableElement, slideOptions);
      swiperRef?.(slider.current);
    }

    // update
    if (slider.current.params.loop) {
      slider.current.removeSlide(-1); // remove inlvaid slide to update loop
      slider.current.slideToLoop(slider.current.realIndex || 0, 0, false);
    }
    slider.current.update();
  }, [React.Children.count(props.children)]);

  // destroy when unmount
  useEffectMemo(() => {
    return () => {
      swiperRef?.(undefined);
      slider.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className={`swiper-container ${className || ""}`} ref={containerRef} {...others}>
      <div className="swiper-wrapper">
        {React.Children.map(props.children, (child, index) => (
          <div className="swiper-slide" key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

// const SwiperPropsCompare = (prevProps: SwiperProps, nextProps: SwiperProps) => {
//   if (React.Children.count(prevProps.children) !== React.Children.count(nextProps.children) || prevProps.swiperRef !== nextProps.swiperRef) {
//     return false;
//   }

//   // return isEqual(prevProps.options, nextProps.options);
//   return true;
// };

// const SwiperSliderMemo = React.memo(SwiperSlider, SwiperPropsCompare);

// export { SwiperSliderMemo };
export default SwiperSlider;

// (SwiperSlider as any).whyDidYouRender = {
//   logOnDifferentValues: true
// };
