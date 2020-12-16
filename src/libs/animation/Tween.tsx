import React from "react";
import gsap from "gsap";
import { useEffectMemo } from "libs/utils";

type Tween = GSAPTween;
export { Tween };
export type Timeline = GSAPTimeline;
export { gsap as gsapInst };

export interface TweenProps {
  from?: GSAPTweenVars;
  to?: GSAPTweenVars;
  duration?: number;
  tweenRef?: React.MutableRefObject<Tween | undefined>;
}

const Tween: React.FC<TweenProps> = props => {
  const targets: HTMLElement[] = [];
  const childCount = React.Children.count(props.children);
  useEffectMemo(() => {
    // clone all tween props because gsap will modify it in internal, and we need to keep ref to origin to compare change
    const from = props.from ? { ...props.from } : undefined;
    const to = props.to ? { ...props.to } : undefined;
    const duration = props.duration;

    let tween: GSAPTween | undefined;
    if (to && from) {
      tween = duration != null ? gsap.fromTo(targets, duration, from, to) : gsap.fromTo(targets, from, to);
    } else if (from) {
      tween = duration != null ? gsap.from(targets, duration, from) : gsap.from(targets, from);
    } else if (to) {
      tween = duration != null ? gsap.to(targets, duration, to) : gsap.to(targets, to);
    } else {
      console.warn("Use Tween without 'from' or 'to' state");
    }
    if (props.tweenRef) props.tweenRef.current = tween;

    return () => {
      if (to) tween?.progress(0);
      else tween?.progress(1);
      tween?.kill();
    };
  }, [props.from, props.to, props.duration, childCount]);

  const childs = React.Children.map(props.children as React.ReactElement[], child => {
    return React.cloneElement(child, {
      ref: (node: HTMLElement) => {
        targets.push(node);
      }
    });
  });

  return <React.Fragment>{childs}</React.Fragment>;
};

export default Tween;
