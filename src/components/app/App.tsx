import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLanguage } from "store/actions/localizeAction";

import { ScrollToTop } from "libs/utils";
import Home from "../views/home/Home";
import Detail from "../views/detail/Detail";
import TweenTest from "libs/animation/test/TweenTest";
import ModalTest from "libs/modal/test/ModalTest";
import CarouselTest from "libs/carousel/test/CarouselTest";
import CookieBannerTest from "libs/cookie-banner/test/CookieBannerTest";
import { GLCookieBanner } from "libs/cookie-banner/CookieBanner";
import { ReCaptcha2Test } from "libs/recaptcha/test/ReCaptchaTest";
import TestFormSignup from "libs/form-elements/test/FormTest";
import SwiperTest from "libs/swiper/test/SwiperTest";

const App: React.FC = () => {
  useLanguage(); // load save/default language
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="com-app">
        <ScrollToTop />
        <Switch>
          <Route path="/detail/:id">
            <Detail></Detail>
          </Route>

          {/* test router */}
          <Route path="/tween">
            <TweenTest />
          </Route>
          <Route path="/modal">
            <ModalTest />
          </Route>
          <Route path="/carousel">
            <CarouselTest />
          </Route>
          <Route path="/cookie">
            <CookieBannerTest />
          </Route>
          <Route path="/recaptcha">
            <ReCaptcha2Test />
          </Route>
          <Route path="/form">
            <TestFormSignup />
          </Route>
          <Route path="/swiper">
            <SwiperTest></SwiperTest>
          </Route>

          <Route path="/" exact>
            <Home></Home>
          </Route>
        </Switch>
      </div>
      <GLCookieBanner></GLCookieBanner>
    </Router>
  );
};

export default App;
