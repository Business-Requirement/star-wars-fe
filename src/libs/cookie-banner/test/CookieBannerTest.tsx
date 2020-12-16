import React from "react";
import { CustomCookieBanner } from "../CookieBanner";
// import { GLCookieBanner } from "../CookieBanner";

const CookieBannerTest: React.FC = () => {

  return ( 
    <div>
      {/* <GLCookieBanner></GLCookieBanner> */}
      <CustomCookieBanner></CustomCookieBanner>
    </div>
  );
}

export default CookieBannerTest;