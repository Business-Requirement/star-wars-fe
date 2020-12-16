import React, { useEffect, useState, useRef } from "react";

export interface SvgInlineProps {
  src: string;
  onLoaded?: Function;
}

const SvgInline: React.FC<SvgInlineProps> = (props) => {
  const [svg, setSvg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const loadRef = useRef(props.onLoaded);

  useEffect(() => {
    fetch(props.src)
      .then((res) => res.text())
      .then((svg) => setSvg(svg))
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .then(() => {
        setLoaded(true);
        if (loadRef.current) loadRef.current();
      });
  }, [props.src]);

  return <span className={`svginline ${loaded ? "svginline-loaded" : "svginline-loading"} ${error ? "svginline-error" : ""}`} dangerouslySetInnerHTML={{ __html: svg }}></span>;
};

export default SvgInline;
