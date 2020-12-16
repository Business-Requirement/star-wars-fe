import "./FormTest.scss";
import React from "react";
import { useForm } from "react-hook-form";
import DropDown from "../dropdown/Dropdown";
import Checkbox from "../checkbox/Checkbox";

export interface TestFormProps {}

type FormData = {
  name: string;
  email: string;
  country: string;
  platform: string;
  agree: boolean;
  newsletter: boolean;
};

const TestFormSignup: React.FC<TestFormProps> = props => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("submit: " + JSON.stringify(data));
  };

  return (
    <div className="com-testform-signup">
      <div className="container">
        <div className="text-container">
          <div className="title">Stay in the Known!</div>
          <div className="description">
            Don't get left behind? <br />
            Subscribe to our newsletter today!
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="name" placeholder="Name" ref={register({ required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            <input type="text" name="email" placeholder="Email" ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
            {errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
            {errors.email && errors.email.type === "pattern" && <span className="error">Invalid email</span>}

            <DropDown placeholder="Select Country" name="country" ref={register({ required: true })}>
              <option value="">Select Country</option>
              <option value="vn">Viet Nam</option>
            </DropDown>
            {errors.country && <span className="error">Country is required</span>}

            <DropDown placeholder="Select Platform" name="platform" ref={register({ required: true })}>
              <option value="">Select Platform</option>
              <option value="ios">Apple device</option>
              <option value="android">Android device</option>
              <option value="window">Windows device</option>
              <option value="other">Others device</option>
            </DropDown>
            {errors.platform && <span className="error">Platform is required</span>}

            <Checkbox name="agree" ref={register({ required: true })}>
              By signing up, I confirm that I am 13 years old or older. I agree to the Terms and Conditions and I have read the Privacy Policy.
            </Checkbox>
            {errors.agree && <span className="error">You should agree</span>}

            <Checkbox name="newsletter" ref={register}>
              I agree to receive promotional offers.
            </Checkbox>

            <button className="signup">Count me in!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestFormSignup;
