import React, { useRef, useCallback } from "react";
import useScripts from "libs/utils/script-loader";

export interface ReCaptchaV2API {
  getValue: () => string | null;
  execute: () => void;
  reset: () => void;
  getWidgetId: () => any;
}

export interface ReCaptchaV2Props {
  sitekey: string;
  theme?: "dark" | "light";
  size?: "compact" | "normal" | "invisible";
  tabindex?: number;
  callback?: (token: string) => void;
  expiredCallback?: Function;
  errorCallback?: Function;
  hl?: string;
  badge?: "bottomright" | "bottomleft" | "inline";
  type?: "image" | "audio";
  recaptchaRef?: React.MutableRefObject<ReCaptchaV2API | undefined>;
  [key: string]: any;
}

const ReCaptchaV2: React.FC<ReCaptchaV2Props> = props => {
  // set default props
  const theme = props.theme || "light";
  const size = props.size || "normal";
  const tabindex = props.tabindex || 0;
  const type = props.type || "image";
  const badge = props.badge || "bottomright";

  const recaptcha = useRef(null);
  const widgetId = useRef(null);

  if (props.recaptchaRef && !props.recaptchaRef.current) {
    props.recaptchaRef.current = {
      getValue: () => {
        if (window.grecaptcha && widgetId.current !== undefined) {
          return window.grecaptcha.getResponse(widgetId.current);
        }
        return null;
      },
      execute: () => {
        if (window.grecaptcha && widgetId.current !== undefined && props.size === "invisible") {
          return window.grecaptcha.execute(widgetId.current);
        }
      },
      reset: () => {
        if (window.grecaptcha && widgetId.current !== undefined) {
          return window.grecaptcha.reset(widgetId.current);
        }
      },
      getWidgetId: () => {
        if (window.grecaptcha && widgetId.current !== undefined) {
          return widgetId.current;
        }
        return null;
      }
    };
  }

  const { callback, expiredCallback, errorCallback } = props;

  const onChange = useCallback(
    (token: string) => {
      if (callback) callback(token);
    },
    [callback]
  );

  const onExpried = useCallback(() => {
    if (expiredCallback) expiredCallback();
  }, [expiredCallback]);

  const onError = useCallback(() => {
    if (errorCallback) errorCallback();
  }, [errorCallback]);

  const onCaptchaLoad = useCallback(() => {
    const render = () => {
      widgetId.current = window.grecaptcha.render(recaptcha.current, {
        sitekey: props.sitekey,
        callback: onChange,
        theme: theme,
        type: type,
        tabindex: tabindex,
        "expired-callback": onExpried,
        "error-callback": onError,
        size: size,
        hl: props.hl,
        badge: badge
      });
    };

    if (window.grecaptcha.render) {
      render();
    } else {
      window.grecaptcha.ready(render);
    }
  }, [props.sitekey, badge, onChange, onError, onExpried, props.hl, size, tabindex, theme, type]);

  useScripts(["https://www.google.com/recaptcha/api.js?onload=&render=explicit"], onCaptchaLoad);

  return <div ref={recaptcha} data-sitekey={props.sitekey}></div>;
};

export default ReCaptchaV2;
