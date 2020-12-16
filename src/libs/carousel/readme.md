# About the Carousel Component

This component is as a wrapper for embla-carousel in ReactJS.  
Embla-carousel use in the test has version 2.6.7

# How to use

1. Install embla-carousel module using `npm` command `npm install embla-carousel`
2. Copy this folder to your source code (or you can copy only `Carousel.tsx` file)

# Use example

For more detail about example you can references in `test\CarouselTest.tsx`

1. Carousel style base

   ```scss
   .carousel-wrapper {
     overflow: hidden;
     width: 100%;
     .carousel-container {
       display: flex;
       will-change: transform;

       .slide-container {
         position: relative;
         flex: 0 0 auto;
         width: 100%;

         .slide {
         }
       }
     }
   }
   ```

   You can override these class inside your component.  
    Usually we will not change the `.carousel-container` and `.slide-container`. If you need to change the slide width you can set the `width` of `.slide-container`. If you want to set the spacing between slides you can change the `margin` of `.slide`

2. Basic use

   ```tsx
   <Carousel options={{ loop: true }}>
     <div className="slide">Slide 1</div>
     <div className="slide">Slide 2</div>
     <div className="slide">Slide 3</div>
     <div className="slide">Slide 4</div>
   </Carousel>
   ```

   `Carousel` component props:

   - `carouselRef` reference to carousel itself so can can call method of embla-carousel on this (ex: `reference.current.scrollNext()`)
   - `options` embla-carousel options, you can refs here https://github.com/davidcetinkaya/embla-carousel#options

3. Advance use (Use with dots indicator and scroll button)

   ```tsx
     <Carousel carouselRef={ref => carousel.current = ref} options={{draggableClass: 'carousel-draggable', draggingClass: 'carousel-dragging'}}>
       <div className="slide">Slide 1</div>
       <div className="slide">Slide 2</div>
       <div className="slide">Slide 3</div>
       <div className="slide">Slide 4</div>
       <div className="slide">Slide 5</div>
     </Carousel>
     <div className="carousel-dots-container">
       <CarouselDots carousel={carousel.current} className="carousel-dot" selectedClassName="is-selected">
       </CarouselDots>
     </div>
     <div className="carousel-buttons-container">
       <CarouselButtons carousel={carousel.current} nextContent="Next" prevContent="Prev" className="carousel-button" disableClassName="is-disable">
       </CarouselButtons>
     </div>
   ```

   `CarouselDots` component props:

   - `carousel` reference to carousel instance ref
   - `className` css class name apply to style the dot button
   - `selectedClassName` css class of dot button when it has selected.

   `CarouselButtons` component props:

   - `carousel` reference to carousel instance ref
   - `className` css class name apply to style the next and prev button
   - `disableClassName` css class of button when carousel can not scroll next or prev.
   - `nextContent` the content of next button.
   - `prevContent` the content of prev button.

# References

Embla-carousel offical project https://github.com/davidcetinkaya/embla-carousel
