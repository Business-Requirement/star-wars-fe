import "./ReCaptchaV3.scss";
import useScripts from "libs/utils/script-loader";

let __recaptcha_use_key = "";

const useReCaptcha3 = (sitekey: string) => {
  __recaptcha_use_key = sitekey;
  useScripts(["https://www.google.com/recaptcha/api.js?render=" + sitekey]);

  const execute = async (action: string) => {
    if (window.grecaptcha) {
      const token = await window.grecaptcha.execute(sitekey, { action });
      return token;
    }
    return null;
  };

  return execute;
};

const recaptcha3 = {
  execute: async (action: string, sitekey?: string) => {
    if (window.grecaptcha) {
      if (!sitekey) sitekey = __recaptcha_use_key;
      const token = await window.grecaptcha.execute(sitekey, { action });
      return token;
    }
    return null;
  }
};

export { recaptcha3 };

export default useReCaptcha3;
