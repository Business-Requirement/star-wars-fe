import React, { useRef } from "react";
import ReCaptchaV2, { ReCaptchaV2API } from "../ReCaptchaV2";
import useReCaptcha3, { recaptcha3 } from "../ReCaptchaV3";
import { Link } from "react-router-dom";

const ReCaptcha2Test: React.FC = () => {
  const recaptcha = useRef<ReCaptchaV2API>();

  // api use
  const getValue = () => {
    console.log("value: " + recaptcha.current?.getValue());
  };

  const execute = () => {
    recaptcha.current?.execute();
  };

  const reset = () => {
    recaptcha.current?.reset();
  };

  // callback
  const onCallback = (token: string) => {
    console.log("callback token: " + token);
  };
  const onExpried = () => {
    console.log("expried");
  };
  const onError = () => {
    console.log("error");
  };

  // recaptcha invisible key: 6LddFNgUAAAAAIuKgrIMOWf8XzLflSgq5xDHyekx
  // recaptcha checkbox key: 6LeoadcUAAAAACdckrh-fBeImonH6sg_n57-XCo1
  return (
    <>
      <ReCaptchaV2
        sitekey="6LddFNgUAAAAAIuKgrIMOWf8XzLflSgq5xDHyekx"
        recaptchaRef={recaptcha}
        callback={onCallback}
        expiredCallback={onExpried}
        errorCallback={onError}
        size="invisible"
      ></ReCaptchaV2>
      <div>
        <button onClick={getValue}>Get ReCaptcha value</button>
      </div>
      <div>
        <button onClick={execute}>Execute ReCaptcha</button>
      </div>
      <div>
        <button onClick={reset}>Reset ReCaptcha</button>
      </div>
    </>
  );
};
export { ReCaptcha2Test };

const ReCaptcha3Test: React.FC = () => {
  const captcha = useReCaptcha3("6LdyG9gUAAAAAAD-RCucURlytYjewbGpBhETettt");
  const executeCaptcha = async () => {
    let token = await captcha("Submit");
    // or use
    token = await recaptcha3.execute("Submit", "6LdyG9gUAAAAAAD-RCucURlytYjewbGpBhETettt");
    console.log("Token: " + token);
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>Recaptcha 3 test</div>
      <div>
        <button onClick={executeCaptcha}>Recaptcha3 Execute</button>
      </div>
    </>
  );
};

export { ReCaptcha3Test };
