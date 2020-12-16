import React, { useRef, useState, useEffect } from "react";
import Tween, { gsapInst, Timeline } from "../Tween";

const TweenTest: React.FC = () => {
  let controler = useRef<Tween>();

  const play = () => {
    controler.current?.play();
  };
  const revert = () => {
    controler.current?.reverse();
  };

  // beacuse of gsap.timeline not support add child at specific index, so we can not use generic function/component for that, we need to make manual
  let tlc1 = useRef<Tween>();
  let tlc2 = useRef<Tween>();
  let tl = useRef<Timeline>();
  useEffect(() => {
    console.log("timeline");
    tl.current = gsapInst
      .timeline({ onComplete: () => console.log("complete") })
      .add(tlc1.current!)
      .add(tlc2.current!)
      .play();
  }, []);

  // state test
  const [count, setCount] = useState<number>(0);

  const countHandle = () => {
    setCount(count + 1);
  };

  const renderCount = () => {
    let counts = [];
    for (let i = 0; i < count; i++) {
      counts.push(<div key={i}>Count item {i}</div>);
    }
    return counts;
  };

  return (
    <>
      <button onClick={countHandle}>Increase Count</button>
      <br />
      <br />
      <p>Tween test stagger</p>
      <Tween from={{ y: 50, duration: 2, stagger: 0.5 }}>
        <div>My single text {count}</div>
        <div>My double text</div>
      </Tween>
      <br />

      <p>Tween test dymaic child count</p>
      <Tween from={{ x: 200, duration: 1, paused: false }} tweenRef={controler}>
        <div>My second text {count}</div>
        {renderCount()}
      </Tween>
      <button onClick={play}>Play</button>
      <button onClick={revert}>Revert</button>

      <br />
      <br />
      <p>Timeline test</p>
      <Tween from={{ scaleY: 0 }} duration={2} tweenRef={tlc1}>
        <div>Timeline text 1</div>
      </Tween>
      <Tween from={{ y: 200 }} duration={1} tweenRef={tlc2}>
        <div>Timeline text 2</div>
      </Tween>
      <button onClick={() => tl.current?.reverse()}>Timline Reverse</button>
      <button onClick={() => tl.current?.play()}>Timline Play</button>
    </>
  );
};

export default TweenTest;
