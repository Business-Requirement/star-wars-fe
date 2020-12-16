# About the tween

This tween component has made to easy intergrade GSAP animation lib to Reactjs  
The GSAP version use is 3.0.4

# How to use

1. Install gsap lib using `npm` command `npm install gsap`
2. Copy this folder to your source code (or you can copy only `Tween.tsx` file)

# Notice

1. Each direct child element will be apply by an instance of tween, so if you need to control child in 1 instance of tween you need to wrap all your element in `div`
2. To apply `stagger` anim we need more than 1 child in tween
3. You can pause tween to autoplay when create by adding `pause` option in tween property
4. Currently if child tween change the tween will re-create so this tween can be autoplay if you not specify `pause` option. If tween option change it will not re-create tween instance because each time react render comp this object will be new one so it make a new tween too.

## Use example

For more detail about example you can references in `test\TweenTest.tsx`

1. Tween with stagger
   ```tsx
   <Tween from={{ y: 50, duration: 2, stagger: 0.5 }}>
     <div>My child 1</div>
     <div>My child 2</div>
   </Tween>
   ```
2. Tween with controller and pause when create

   ```tsx
   const controler = useRef<Tween>();
   const play = () => {
     controler.current?.play();
   };

   <Tween from={{ x: 200, duration: 1, paused: true }} controller={controler}>
     <div>My child content</div>
   </Tween>;
   ```

3. Use timeline

   ```tsx
     let tlc1 = useRef<Tween>();
     let tlc2 = useRef<Tween>();

     useEffect(() => {
       gsap.timeline().add(tlc1.current!).add(tlc2.current!);
     }, []);

     <Tween from={{scaleY: 0}} duration={2} controller={tlc1}>
       <div>Timeline content 1</div>
     </Tween>
     <Tween from={{y: 200}} duration={1} controller={tlc2}>
       <div>Timeline content 2</div>
     </Tween>
   ```

# Future improvement

1. If future GSAP support add tween to a timeline at index we can create Timeline component to simple use

# References

GSAP offical docs https://greensock.com/docs/v3/GSAP
