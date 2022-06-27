import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../../firebase-config";
import Loading from "../assets/loading/Loading";
import {
  Days,
  FbIcon,
  GgIcon,
  InsIcon,
  Months,
  tick,
  userIcon,
  Years,
} from "./Constant";
import "./digitCode.css";
import Username from "./Register/Username";
import {
  ChannelIcon,
  ChannelIconWrapper,
  ChannelItemWrapper,
  ChannelName,
  FooterContainer,
  LoginContainers,
  LoginTitle,
  LoginTitleContainer,
  SignUp,
  SocialContainer,
  Toggle,
  ToLogin,
} from "./Signin";

const Signup = ({ handleSignUp }) => {
  const [signUpPhone, setSignUpPhone] = useState(false);
  const [listMonths, setListMonths] = useState(false);
  const [listDays, setListDays] = useState(false);
  const [listYears, setListYears] = useState(false);
  const [selectMonths, setSelectMonths] = useState();
  const [selectDays, setSelectDays] = useState();
  const [selectYears, setSelectYears] = useState();
  const [digitCode, setDigitCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [countDown, setCountDown] = useState();
  const [beginCountDown, setBeginCountDown] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const signUpWithPhoneOrEmail = () => {
    return setSignUpPhone(true);
  };

  const fetchListContainer = (type) => {
    switch (type) {
      case "Months":
        return !listMonths ? setListMonths(true) : setListMonths(false);
      case "Days":
        return !listDays ? setListDays(true) : setListDays(false);
      case "Years":
        return !listYears ? setListYears(true) : setListYears(false);
      default:
        break;
    }
  };
  const fetchListMonths = () => {
    return (
      <SelectorContainer onClick={() => fetchListContainer("Months")}>
        <SelectContainer
          col={selectMonths ? "black" : "rgba(18, 18, 18, 0.34)"}
        >
          {!selectMonths
            ? "Months"
            : Months.filter((res, index) =>
                selectMonths === index + 1 ? res : null
              )}
        </SelectContainer>
        {listMonths ? (
          <ListContainer onClick={handleChooseMonths}>
            {Months.map((res, index) => (
              <ListItem value={index + 1} key={index}>
                {res}
                {selectMonths === index + 1 ? (
                  <TickContainer src={tick} />
                ) : null}
              </ListItem>
            ))}
          </ListContainer>
        ) : null}
      </SelectorContainer>
    );
  };
  const fetchListDays = () => {
    return (
      <SelectorContainer onClick={() => fetchListContainer("Days")}>
        <SelectContainer col={selectDays ? "black" : "rgba(18, 18, 18, 0.34)"}>
          {!selectDays
            ? "Days"
            : Days.filter((res, index) =>
                selectDays === index + 1 ? res : null
              )}
        </SelectContainer>
        {listDays ? (
          <ListContainer onClick={handleChooseDays}>
            {Days.map((res, index) => (
              <ListItem value={index + 1} key={index}>
                {res}
                {selectDays === index + 1 ? <TickContainer src={tick} /> : null}
              </ListItem>
            ))}
          </ListContainer>
        ) : null}
      </SelectorContainer>
    );
  };
  const fetchListYears = () => {
    return (
      <SelectorContainer onClick={() => fetchListContainer("Years")}>
        <SelectContainer col={selectYears ? "black" : "rgba(18, 18, 18, 0.34)"}>
          {!selectYears
            ? "Years"
            : Years.filter((res, index) =>
                selectYears === index + 1 ? res : null
              )}
        </SelectContainer>
        {listYears ? (
          <ListContainer onClick={handleChooseYears}>
            {Years.map((res, index) => (
              <ListItem value={index + 1} key={index}>
                {res}
                {selectYears === index + 1 ? (
                  <TickContainer src={tick} />
                ) : null}
              </ListItem>
            ))}
          </ListContainer>
        ) : null}
      </SelectorContainer>
    );
  };

  const handleChooseMonths = (e) => {
    setSelectMonths(e.target.value);
  };
  const handleChooseDays = (e) => {
    setSelectDays(e.target.value);
  };
  const handleChooseYears = (e) => {
    setSelectYears(e.target.value);
  };
  const generateRecaptcha = () => {
    setIsLoading(true);
    auth.languageCode = "it";
    auth.useDeviceLanguage();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOTP = () => {
    setBeginCountDown(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+84${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setIsLoading(false);
      })
      .catch((error) => {
        // Error; SMS not sent
        // console.log(error);
        // ...
      });
  };
  const clearRecaptcha = () => {
    window.recaptchaVerifier.recaptcha.reset();
  };

  const handleConfirmCode = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(digitCode)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
    setNextPage(true);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const handleDigitCode = (e) => {
    setDigitCode(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (beginCountDown) {
      let i = 60;
      const interval = setInterval(() => {
        --i;
        setCountDown(i);
        if (i < 1) {
          clearInterval(interval);
          setBeginCountDown(false);
          setCountDown(60);
          clearRecaptcha();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [beginCountDown]);

  return (
    <LoginContainers>
      {signUpPhone ? (
        !nextPage ? (
          <Username handleSignUp={handleSignUp} />
        ) : (
          <>
            <LoginTitleContainer>
              <BackIcon onClick={() => setSignUpPhone(false)} />
              <LoginTitle>Sign Up</LoginTitle>
              <form action="">
                <TittleWrapper>
                  <div>When’s your birthday?</div>
                </TittleWrapper>
                <DateSelector>
                  {fetchListMonths()}
                  {fetchListDays()}
                  {fetchListYears()}
                </DateSelector>
                <SubTitleSignUp>
                  Your birthday won't be shown publicly.
                </SubTitleSignUp>
                <PaddingBottom>
                  <TitleWrapperBottom>
                    <div>Phone</div>
                    <SignUpWithEmail>Sign up with email</SignUpWithEmail>
                  </TitleWrapperBottom>
                  <InputField>
                    <SelectorContainer className="PhoneNumber">
                      <SelectContainer>VN +84</SelectContainer>
                    </SelectorContainer>
                    <SeparatorWrapper>
                      <p></p>
                    </SeparatorWrapper>
                    <InputPhoneNumber
                      placeholder="Phone number"
                      type="text"
                      name="phone"
                      maxLength={9}
                      onChange={handlePhoneNumber}
                    ></InputPhoneNumber>
                  </InputField>
                  <DigitCodeContainer>
                    <InputField
                      style={{
                        borderRadius: "4px 0px 0px 4px",
                        borderRight: "none",
                      }}
                    >
                      <InputPhoneNumber
                        placeholder="Enter 6-digit code"
                        type="text"
                        name="code"
                        maxLength={6}
                        id="digitCode"
                        onChange={handleDigitCode}
                      />
                    </InputField>
                    {isLoading ? (
                      <ButtonLoading>
                        <Loading />
                      </ButtonLoading>
                    ) : beginCountDown ? (
                      <ButtonCountDown>
                        {countDown && countDown}
                      </ButtonCountDown>
                    ) : (
                      <ButtonSendCode
                        onClick={
                          phoneNumber && phoneNumber.length === 9
                            ? requestOTP
                            : null
                        }
                        style={
                          phoneNumber && phoneNumber.length === 9
                            ? {
                                cursor: "pointer",
                                color: "white",
                                backgroundColor: "rgba(254,44,85,1)",
                              }
                            : null
                        }
                      >
                        Sent Code
                      </ButtonSendCode>
                    )}
                  </DigitCodeContainer>
                  <ButtonNext
                    style={
                      phoneNumber &&
                      phoneNumber.length === 9 &&
                      digitCode &&
                      digitCode.length === 6
                        ? {
                            color: "#ffff",
                            backgroundColor: "#fe2c55",
                            cursor: "pointer",
                          }
                        : null
                    }
                    onClick={handleConfirmCode}
                  >
                    Next
                  </ButtonNext>
                </PaddingBottom>
              </form>
              <FooterContainer>
                <FooterSignUp>
                  <SubTitle>
                    Bằng cách tiếp tục, bạn đồng ý với
                    <a href="#"> Điều khoản Sử dụng </a>
                    của TikTok và xác nhận rằng bạn đã đọc hiểu
                    <a href=""> Chính sách Quyền riêng tư </a> của TikTok.
                  </SubTitle>
                </FooterSignUp>
                <Toggle>
                  <ToLogin>
                    Bạn đã có tài khoản?
                    <SignUp onClick={handleSignUp}>Đăng Nhập</SignUp>
                  </ToLogin>
                </Toggle>
              </FooterContainer>
            </LoginTitleContainer>
            <Recaptcha id="recapcha" />
          </>
        )
      ) : (
        <LoginTitleContainer>
          <LoginTitle>Đăng Ký vào TikTok</LoginTitle>
          <SocialContainer>
            <ChannelItemWrapper onClick={signUpWithPhoneOrEmail}>
              <ChannelIconWrapper>
                <ChannelIcon urlBg={userIcon} />
              </ChannelIconWrapper>
              <ChannelName>Sử dụng số điện thoại hoặc email</ChannelName>
            </ChannelItemWrapper>
            <ChannelItemWrapper>
              <ChannelIconWrapper>
                <ChannelIcon urlBg={FbIcon} />
              </ChannelIconWrapper>
              <ChannelName>Tiếp tục với Facebook</ChannelName>
            </ChannelItemWrapper>
            <ChannelItemWrapper>
              <ChannelIconWrapper>
                <ChannelIcon urlBg={GgIcon} />
              </ChannelIconWrapper>
              <ChannelName>Tiếp tục với Google</ChannelName>
            </ChannelItemWrapper>
            <ChannelItemWrapper>
              <ChannelIconWrapper>
                <ChannelIcon urlBg={InsIcon} />
              </ChannelIconWrapper>
              <ChannelName>Tiếp tục với Instagram</ChannelName>
            </ChannelItemWrapper>
          </SocialContainer>
          <FooterContainer>
            <FooterSignUp>
              <SubTitle>
                Bằng cách tiếp tục, bạn đồng ý với
                <a href=""> Điều khoản Sử dụng </a>
                của TikTok và xác nhận rằng bạn đã đọc hiểu
                <a href=""> Chính sách Quyền riêng tư </a> của TikTok.
              </SubTitle>
            </FooterSignUp>
            <Toggle>
              <ToLogin>
                Bạn đã có tài khoản?
                <SignUp onClick={handleSignUp}>Đăng Nhập</SignUp>
              </ToLogin>
            </Toggle>
          </FooterContainer>
        </LoginTitleContainer>
      )}
    </LoginContainers>
  );
};
const FooterSignUp = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
`;
const SubTitle = styled.div`
  text-align: center;
  font-size: 11px;
  line-height: 15px;
  width: 386px;
  a {
    color: #161823;
    font-size: 12px;
    text-decoration: none;
    font-weight: 700;
  }
`;
const BackIcon = styled.div`
  cursor: pointer;
  position: absolute;
  left: 16px;
  top: 24px;
  width: 24px;
  height: 24px;
  background-image: url(https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp_login/svgs/back_modal.bbfe2402.svg);
`;
export const TittleWrapper = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #161823;
  margin-top: 16px;
  margin-bottom: 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateSelector = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const SubTitleSignUp = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: rgba(22, 24, 35, 0.5);
  margin-top: 4px;
`;
const SelectorContainer = styled.div`
  width: 120px;
  position: relative;
  color: #161823;
  background: rgba(22, 24, 35, 0.06);
  border-radius: 4px;
  &:hover {
    background: rgba(22, 24, 35, 0.1);
  }
`;
const SelectContainer = styled.div`
  font-size: 16px;
  color: ${(props) => props.col};
  box-sizing: border-box;
  height: 44px;
  line-height: 44px;
  padding: 0 13px 0 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  white-space: pre;
  border-radius: 2px;
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    margin: 12px 0;
    display: block;
    background-image: url(https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp_login/svgs/openSelector.3e786e4d.svg);
    background-size: contain;
  }
`;
const PaddingBottom = styled.div`
  padding-bottom: 40px;
`;
const TitleWrapperBottom = styled.div`
  margin-bottom: -4px;
  font-size: 16px;
  line-height: 22px;
  color: #161823;
  margin-top: 16px;
  margin-bottom: 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SignUpWithEmail = styled.a`
  margin: 0;
  display: inline-block;
  font-size: 14px;
  line-height: 17px;
  color: #161823;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const InputField = styled.div`
  border-radius: 4px;
  position: relative;
  margin-top: 8px;
  background: rgba(22, 24, 35, 0.06);
  border: 1px solid rgba(22, 24, 35, 0.06);
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  margin-top: 12px;
  box-sizing: content-box;
  .PhoneNumber {
    background: none;
    &:hover {
      background: rgba(22, 24, 35, 0.1);
    }
  }
`;
const SeparatorWrapper = styled.div`
  height: 100%;
  width: 1px;
  display: flex;
  align-items: center;
  p {
    width: 1px;
    height: 30px;
    background: rgba(22, 24, 35, 0.12);
  }
`;
const InputPhoneNumber = styled.input`
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
const DigitCodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonSendCode = styled.div`
  margin-top: 12px;
  width: 140px;
  cursor: not-allowed;
  color: rgba(22, 24, 35, 0.34);
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgba(22, 24, 35, 0.12);
  white-space: nowrap;
  height: 46px;
`;
const ButtonCountDown = styled.div`
  margin-top: 12px;
  width: 140px;
  cursor: not-allowed;
  color: rgba(22, 24, 35, 0.34);
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgba(22, 24, 35, 0.12);
  white-space: nowrap;
  height: 46px;
`;
const ButtonLoading = styled.div`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(254, 44, 85, 1);
  cursor: pointer;
  border: none;
  width: 44%;
  height: 46px;
  line-height: 44px;
  text-align: center;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  font-weight: 600;
  margin-top: 11px;
`;

const ButtonNext = styled.div`
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
const ListContainer = styled.ul`
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 3%), 0 2px 4px 0 rgb(0 0 0 / 3%);
  max-height: 286px;
  min-width: 100px;
  overflow: scroll;
  margin-top: 4px;
  -webkit-overflow-scrolling: touch;
  z-index: 11;
`;
const ListItem = styled.li`
  display: flex;
  padding: 0 12px;
  height: 34px;
  line-height: 34px;
  color: #161823;
  justify-content: space-between;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background: rgba(22, 24, 35, 0.1);
  }
`;
const TickContainer = styled.img`
  margin: 0 12px;
  width: 16px;
`;
const Recaptcha = styled.div`
  position: absolute;
`;
export default Signup;
