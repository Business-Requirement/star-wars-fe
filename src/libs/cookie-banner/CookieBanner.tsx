import "./CookieBanner.scss";
import React, { useEffect, useState, useRef } from "react";
import useScripts from "libs/utils/script-loader";

export interface GLCookieBannerProps {
  language?: string;
  cookieUrl?: string;
}

const GLCookieBanner: React.FC<GLCookieBannerProps> = props => {
  useEffect(() => {
    (window as any).language = props.language || "en";
    (window as any).cookiePolicyPage = props.cookieUrl || "";
  }, [props]);

  useScripts(["https://code.jquery.com/jquery-3.4.1.slim.min.js", ""]);

  return null;
};

export { GLCookieBanner };

// Custom cookie banner
export interface CustomCookieBannerProps {
  cookieUrl?: string;
}

const CustomCookieBanner: React.FC<CustomCookieBannerProps> = props => {
  const cookiePolicyUrl = props.cookieUrl || "";
  const cookieName = "accept_cookie";

  const getAcceptCookie = () => {
    var name = cookieName + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return false;
  };

  const setAcceptCookie = () => {
    var date = new Date();
    // Default at 365 days.
    var days = 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+date + days * 86400000); //24 * 60 * 60 * 1000

    document.cookie = cookieName + "=1; expires=" + date.toUTCString() + "; path=/";
  };

  const acceptedCookie = getAcceptCookie() !== false;
  const [active, setActive] = useState(true);
  const cookieDiv = useRef<HTMLDivElement>(null);

  const acceptButton = () => {
    setActive(false);
    setTimeout(() => {
      setAcceptCookie();
    }, 500);
  };

  useEffect(() => {
    cookieDiv.current?.classList.toggle("show");
  }, [active]); // eslint-disable-line

  return !acceptedCookie ? (
    <div className={`cookie-banner`} ref={cookieDiv}>
      <div className="co-wrapper">
        <div className="co-cotent">
          We use{" "}
          <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">
            cookies
          </a>{" "}
          to ensure that you get the best experience on our websites. <br />
          This website uses analytics cookies / audience measurement. <br />
          For more information, please consult our{" "}
          <a href={cookiePolicyUrl} target="_blank" rel="noopener noreferrer">
            Cookies Policy
          </a>
          . By continuing to use this site, you agree to accept cookies.
        </div>
        <div className="co-button" onClick={acceptButton}>
          Got it!
        </div>
      </div>
    </div>
  ) : null;
};

export { CustomCookieBanner };
