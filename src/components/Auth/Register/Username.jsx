import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import styled from "styled-components";
import useDebounce from "../../../Hooks/useDebounce";
import {
  FooterContainer,
  LoginTitle,
  LoginTitleContainer,
  SignUp,
  Toggle,
  ToLogin,
} from "../Signin";
import { InputField, TittleWrapper } from "../Signup";
import Loading from "../../assets/loading/Loading";

const Username = ({ handleSignUp }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [valueUser, setValueUser] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const debounced = useDebounce(formValues.username, 2000);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const test = () => {
    setFormErrors(validate(formValues));
  };
  const validate = (values) => {
    let errors = {};
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (!regex.test(values.password)) {
      errors.password = "Invalid password format";
    }
    return errors;
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (formValues.username.length >= 8) {
      startTransition(async () => {
        await axios
          .get(
            `http://localhost:5506/users/search?userName=${encodeURIComponent(
              debounced
            )}`
          )
          .then((data) => {
            setValueUser(data.data);
          });
      });
    }
  }, [debounced]);

  const isSignUp = () => {
    console.log("hello");
  };

  useEffect(() => {
    if (formValues.password.length >= 8) {
      test();
    }
  }, [formValues]);
  return (
    <LoginTitleContainer>
      <LoginTitle>Sign Up</LoginTitle>
      <TittleWrapper>
        <div>Create password</div>
      </TittleWrapper>
      <InputField>
        <InputPassword
          placeholder="Password"
          type={passwordShown ? "text" : "password"}
          name="password"
          maxLength={20}
          onChange={handleInput}
        />
        {passwordShown ? (
          <HidePassword onClick={togglePassword} />
        ) : (
          <ShowPassword onClick={togglePassword} />
        )}
      </InputField>
      <TitlePassword>
        <div>Your password must have</div>
      </TitlePassword>
      <TitleCheckWrapper>
        <li
          style={
            formValues.password.length === 0
              ? null
              : formValues.password.length >= 8
              ? { color: "green" }
              : { color: "red" }
          }
        >
          8 to 20 character
          {formValues.password.length >= 8 ? <CheckIcon /> : null}
        </li>
        <li
          style={
            formValues.password.length === 0
              ? null
              : formValues.password.length >= 8 &&
                Object.keys(formErrors).length === 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          Letters, numbers, and special characters
          {formValues.password.length === 0 ? null : formValues.password
              .length >= 8 && Object.keys(formErrors).length === 0 ? (
            <CheckIcon />
          ) : null}
        </li>
      </TitleCheckWrapper>
      <TittleWrapper>
        <div>Create username</div>
      </TittleWrapper>
      <InputField>
        <InputPassword
          placeholder="Username"
          type="text"
          name="username"
          maxLength={20}
          onChange={handleInput}
        />
        {isPending ? (
          <LoadingUser style={{ cursor: "default" }}>
            <Loading />
          </LoadingUser>
        ) : null}
      </InputField>
      <TitleCheckWrapper style={{ paddingLeft: "0" }}>
        <div>You can always change this later.</div>
        <li
          style={
            formValues.username.length === 0
              ? null
              : formValues.username.length >= 8
              ? { color: "green" }
              : { color: "red" }
          }
        >
          8 to 20 character
          {formValues.username.length >= 8 ? <CheckIcon /> : null}
        </li>
        {formValues.username.length >= 8 && valueUser.length > 0 ? (
          <li style={{ color: "red" }}>
            The name already exists, please change your name
          </li>
        ) : null}
      </TitleCheckWrapper>
      {formValues.username.length >= 8 &&
      valueUser.length === 0 &&
      formValues.password.length >= 8 &&
      Object.keys(formErrors).length === 0 ? (
        <ButtonSign onClick={isSignUp}>Sign up</ButtonSign>
      ) : (
        <ButtonSignDisable>Sign up</ButtonSignDisable>
      )}

      <FooterContainer>
        <Toggle>
          <ToLogin>
            Bạn đã có tài khoản?
            <SignUp onClick={handleSignUp}>Đăng Nhập</SignUp>
          </ToLogin>
        </Toggle>
      </FooterContainer>
    </LoginTitleContainer>
  );
};

const TitlePassword = styled.div`
  font-size: 12px;
  line-height: 22px;
  color: #161823;
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleCheckWrapper = styled.ul`
  font-size: 12px;
  line-height: 22px;
  color: #a7a7a7;
  margin-bottom: 5px;
  display: flex;
  flex-flow: column;
  li {
    display: flex;
    align-items: center;
    &:before {
      content: "✓";
      padding-right: 4px;
    }
  }
`;
const InputPassword = styled.input`
  padding-left: 12px !important;
  background: transparent;
  outline: none;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  direction: ltr;
  color: #161823;
  font-size: 16px;
  caret-color: #fe2c55;
  border-radius: 0px 4px 4px 0px;
`;
const HidePassword = styled.p`
  background: url(//lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp_login/svgs/hidePassword.d3d87c2c.svg)
    no-repeat;
  width: 20px;
  height: 20px;
  margin: 12px 0;
  position: absolute;
  right: 12px;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
`;
const ShowPassword = styled.p`
  width: 20px;
  height: 20px;
  margin: 12px 0;
  position: absolute;
  right: 12px;
  background: url(//lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp_login/svgs/showPassword.3eea0a28.svg)
    no-repeat;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
`;
const ButtonSignDisable = styled.div`
  color: rgba(22, 24, 35, 0.3);
  background-color: rgba(22, 24, 35, 0.06);
  cursor: not-allowed;
  border: none;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  font-weight: 600;
  margin-top: 16px;
`;
const ButtonSign = styled.div`
  color: white;
  background-color: rgba(254, 44, 85, 1);
  cursor: pointer;
  border: none;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  font-weight: 600;
  margin-top: 16px;
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),
      #fe2c55;
  }
`;
const CheckIcon = styled.div`
  width: 17px;
  height: 17px;
  background-repeat: no-repeat;
  background-size: cover !important;
  background: url("https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png");
`;
const LoadingUser = styled.div`
  width: 20px;
  height: 20px;
  margin: 12px 0;
  position: absolute;
  right: 12px;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
`;

export default Username;
