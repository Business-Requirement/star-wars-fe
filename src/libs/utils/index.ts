import { useState, useEffect, useRef } from "react";
import isEqual from "lodash-es/isEqual";
import { useHistory } from "react-router-dom";

// get windows current size, it will re-render in case window size change
const useWindowSize = () => {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
export { useWindowSize };

// store previous value of object
const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
export { usePrevious };

const useCompareMemo = <T>(value: T) => {
  const ref = useRef<T>();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};
// useEffect with support for compare dependencies
const useEffectMemo = (callback: React.EffectCallback, dependencies: React.DependencyList) => {
  useEffect(callback, useCompareMemo(dependencies));
};
export { useEffectMemo };

// check document is visible
const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const visibilityChange = () => {
      setVisible(!document.hidden);
    };
    window.document.addEventListener("visibilitychange", visibilityChange);
    return window.document.removeEventListener("visibilitychange", visibilityChange);
  });

  return visible;
};

export { useDocumentVisibility };

// scroll to top component when switch route
const ScrollToTop: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const unlistener = history.listen(() => {
      // Keep default behavior of restoring scroll position when user:
      // - clicked back button
      // - clicked on a link that programmatically calls `history.goBack()`
      // - manually changed the URL in the address bar (here we might want
      // to scroll to top, but we can't differentiate it from the others)
      if (history.action === "POP") {
        return;
      }
      // In all other cases, check fragment/scroll to top
      let hash = history.location.hash;
      if (hash) {
        let element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ block: "start", behavior: "smooth" });
        }
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => unlistener();
  }, [history]);

  return null;
};

export { ScrollToTop };
