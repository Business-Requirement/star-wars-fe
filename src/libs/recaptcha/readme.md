# About

This module support google recaptcha version 2 & 3.
Recommend to use ReCaptcha V3

# How to use

Recaptcha need to be verify in backend, so you need to send the recaptcha token to backend. Backend will use `recaptcha secret key` + `client token key` to final verify.

Below is use guide for each version

## Recaptcha 3

Copy this folder to your source code (Or you can only copy `ReCaptchaV3.tsx` and `ReCaptchaV3.scss` files)

To use recaptcha 3 simple call `useReCaptcha3(sitekey)` function in your any component. It recommend to call in root app component so it can be load early and can be use in every page.  
`useReCaptcha3` also return async function so you can use this function to get token later.

This also support `recaptcha3.execute(action, sitekey?)` fucntion to get the token for action. It will only work if `useReCaptcha3` has call somewhere before.

Notice: To hiden Recaptcha badge at bottom right you can use the style in `ReCaptchaV3.scss` (un-comment the style) but notice that you need to include google privacy and t&c in place you use this. Ex: bottom of form:

```html
This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and
<a href="https://policies.google.com/terms">Terms of Service</a> apply.
```

Parameters:

> `action`: Use to separate action location. Ex: login, register,...
> `sitekey`: ReCaptcha site key, you can get from ReCaptcha admin page. If this is `undefined` it will use the last key by `useReCaptcha3`

## ReCaptcha 2

Copy this folder to your source code (Or you can only copy `ReCaptchaV2.tsx` file)  
In the form you need to use recaptcha, include `ReCaptchaV2` component.  
Component props:

> `sitekey` - `string` - Required: ReCaptcha site key, you can get from ReCaptcha admin page  
> `theme` - `'dark' or 'light'` - Optional: The color theme of the widget  
> `size` -`'compact' or 'normal' or 'invisible'` - Optional: The size of the widget  
> `tabindex` - `number` - Optional: The tabindex of the widget and challenge  
> `callback` - `(token: string) => void` - Optional: executed when the user submits a successful response  
> `expiredCallback` -`Function` - Optional: executed when the reCAPTCHA response expires and the user needs to re-verify  
> `errorCallback` - `Function` - Optional: executed when reCAPTCHA encounters an error  
> `hl` - `string` - Optional: language reference  
> `badge` - `'bottomright' or 'bottomleft' or 'inline'` - Optional: postion of badge when using invisible recaptcha  
> `type` - `'image' or 'audio'` - Optional: type of challenge  
> `recaptchaRef` - `Ref` - Optional: Reference to recaptcha v2 instance  
> For more infomation [Read more here](https://developers.google.com/recaptcha/docs/display#g-recaptcha_tag_attributes_and_grecaptcharender_parameters)

Recaptcha reference api:

> `getValue` - `() => string | null` get the current token of recaptcha  
> `execute` - `() => void` execute the challenge. In case of invisible recaptcha you need to call this before to get the token. Work only with invisible recaptcha  
> `reset` - `() => void` Reset recaptcha challegen  
> `getWidgetId` - `() => any` get the current recaptcha widget id

Notice: `checkbox` and `invisible` size must be use separate sitekey

# Example

## Recaptcha 3

```tsx
const captcha = useReCaptcha3("6LdyG9gUAAAAAAD-RCucURlytYjewbGpBhETettt");
const executeCaptcha = async () => {
  const token = await captcha("Submit");
  // or use
  // const token = await recaptcha3.execute('6LdyG9gUAAAAAAD-RCucURlytYjewbGpBhETettt', 'Submit');
  console.log("Token: " + token);
};
```

## Recaptcha 2

```tsx
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

return (
  <ReCaptchaV2
    sitekey="6LddFNgUAAAAAIuKgrIMOWf8XzLflSgq5xDHyekx"
    recaptchaRef={recaptcha}
    callback={onCallback}
    expiredCallback={onExpried}
    errorCallback={onError}
    size="invisible"
  ></ReCaptchaV2>
);
```
