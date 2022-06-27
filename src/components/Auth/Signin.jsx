import { memo, useState } from "react";
import styled from "styled-components";
import auth from "../../firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import axios from "axios";

const tiktokQR =
  "https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp_login/svgs/QR_Code.22d6d5db.svg";
const userIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAANlBMVEVHcEwAAAAJChIMDBkWGCIOEBcOEBcJCg8QEhwNDxQUFiAAAAAAAAAVFyMDBAYQEhsWGCMAAAD5xs1FAAAAEHRSTlMA7zAQ33+jXkIgxt/B72+Q9PCfEQAAASBJREFUSMftVMsSgyAM5CUEENT//9k2aEesQNLeOtM9EciSLCwI8cd30GDNugbrmPnwzN5hWJRprTB9mM9guD0NhFC2DIEgYP9G7WNfAkYB/4oUXQLbsGe4XMMGwnVLIHvCHuorfItJgiAJpta8q06khul6aGFIyLilfkXlIsZ+0gn3PBga6yXPsJKB07WkmUJxUAohlUGgX4+pzRo8470tZ/6iWU/O29JOssB/1grA//K35LONctvkHDJHB8xbhZn6mdQlHRGHVbLc7sgD5x19ZKXxh81HuWmcP0N95yOGwzX5ptKVJpvSfcR8dTsGZMiWCUt11Tg4nG/8Zr7bbG7vhAViWxwe1nKbjT1tz8tHFbdZ2S3QWXNRdn0zWvtFPAAmbxZPKTUEzQAAAABJRU5ErkJggg==";
const FbIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEVHcEwYdfEYdvIXd/IYd+8Xd+8Xd/IXd/IQcO8Yd/IXd/EXd/IYdvMXdvIYd/JU6UsnAAAADnRSTlMAgKDGQCFa7xDfkK9/bxPrucEAAAFTSURBVCjPbdM/S8NAFADwh9Ua/Idx6lSKOEuhg+IQMjtIKWRxKNncOokIQhCcXKSfIIsgTqGrS/ETCH4Da/+EtHKfwbvkvcu75t5ydz+Ou5d3eQBFOJcfUdp5ewQjNs9EHqvQUE9gZMy3tMr9Xc03gsUd6Z4w4hP5y+Q/62baPtDrh+NOLIdFnkZMeqJSlWOqktkgvQVk0eZnhJpnckJn/ILmKY4q5iULvzx6qPD7KJ+3YJt4JPkU5/dwRdwCqNN8Bk2aHrLvXYLHWN+zsnMGkY1TEDYWyPMgkI/uBMG1wT/0UrvIsck1vHJs8oEoapWY3MfPGZhc1GIBL/k4cV1f1sR1x1jkmi3vNuzbOAQnqnImL2lWWf0oz1UeQvnGjH2VarLOE1YGxqOimzyTp9hXTyafUyESzkvdO/W45JS1Wq/kd96YvbjgtLHWxq+Sdy58XP4DJ30Z99MJep4AAAAASUVORK5CYII=";
const GgIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAjVBMVEVHcEwwnU/VPjYvnk/VPjUvnVDWSDRQcKehaUFQcKhOc6Iunk7VPTXVPjVQcKdQcKjZWDMvnU7VPTXvtikwnVDWPTXvtSnurSpQcKfVPjYunk7ttChQcajstSgwn0zttCjvtShQcKlQcKgvnk/VPjbvtSnjfi7bsy07n009inXYTTSDqD6bqzqnrTdTokc44COHAAAAInRSTlMAPc/b5r4jPxC/oJBVkIjlQGOjtyC/0/cggIB7X2BQoJ/Psru6sQAAAUhJREFUSMftlduWgiAUhjGBoRTT0uw4B8Gp5vT+jzeGOggCC5vb/iuX6/vYe6MoAI/cFRLTGeScw4LGHnha8EHgCk/BRZwK5YZAa2Ok4OZYDDKz8DNiFqbyu0HXNMY4jVfQxWOJp3IRaOUB/NvGIYGpjT+9d/zO831Y1+WHWN+Tx3WTpgjEnsKpbg0KvDsSKWWB7ZMeRdi0wkbeWVRa3hShbIW1Q1gqQsvXB4dQ/U/oWnr1FjyGVmd4aYWzfHOSeZ9lK8wV4SD4r8ve8Iw6IVFP2235T8ZYPuKPXUtH/VGffxqeIVuBaqt9X74vTERvKqlMIzRBrEtETLzeEQBBL7AwkzeReVNFIiaV6DnIgywKm+urcQK1KTXX8Z72WxuaDWbhG8NSgy2sB29v5DPHUc3HRVDgPt0BmoSLKlmEbvOHYZSRxx/8rvwCaQpYY51gRIUAAAAASUVORK5CYII=";
const InsIcon =
  "data:image/png;base64,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";

const Signin = ({ handleSignUp, setOpenModal }) => {
  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    auth.languageCode = "it";
    auth.useDeviceLanguage();
    provider.setCustomParameters({
      login_hint: "user@gmail.com",
    });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log("user: ", result.user);
        await axios({
          method: "post",
          url: "http://localhost:5506/users/register",
          data: {
            serialId: result.user.uid,
            username: result.user.displayName,
            photoURL: result.user.photoURL,
            phoneNumber: "",
            fullname: result.user.displayName,
            tick: false,
            email: result.user.email,
          },
        }).then((res) => {
          setOpenModal(false);
          console.log(res);
        });
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleLoginWithFB = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('email');
    provider.addScope('user_likes');
    provider.addScope('user_friends');
    auth.useDeviceLanguage();
    auth.languageCode = "it";
    provider.setCustomParameters({
      display: "popup",
    });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        await axios({
          method: "post",
          url: "http://localhost:5506/users/register",
          data: {
            serialId: user.uid,
            username: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: "",
            fullname: user.displayName,
            tick: false,
            email: user.email,
          },
        }).then((res) => {
          setOpenModal(false);
          console.log(res);
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };

  return (
    <LoginContainers>
      <LoginTitleContainer>
        <LoginTitle>Đăng nhập vào TikTok</LoginTitle>
        <SocialContainer>
          <ChannelItemWrapper>
            <ChannelIconWrapper>
              <ChannelIcon urlBg={tiktokQR} />
            </ChannelIconWrapper>
            <ChannelName>Sử dụng mã QR</ChannelName>
          </ChannelItemWrapper>
          <ChannelItemWrapper>
            <ChannelIconWrapper>
              <ChannelIcon urlBg={userIcon} />
            </ChannelIconWrapper>
            <ChannelName>Số điện thoại / Email / TikTok ID</ChannelName>
          </ChannelItemWrapper>
          <ChannelItemWrapper onClick={handleLoginWithFB}>
            <ChannelIconWrapper>
              <ChannelIcon urlBg={FbIcon} />
            </ChannelIconWrapper>
            <ChannelName>Tiếp tục với Facebook</ChannelName>
          </ChannelItemWrapper>
          <ChannelItemWrapper onClick={handleLoginWithGoogle}>
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
          <Toggle>
            <ToLogin>
              Bạn không có tài khoản?
              <SignUp onClick={handleSignUp}>Đăng ký</SignUp>
            </ToLogin>
          </Toggle>
        </FooterContainer>
      </LoginTitleContainer>
    </LoginContainers>
  );
};

export const LoginContainers = styled.div`
  max-height: calc((100vh - 70px) - 60px);
  margin-top: 0;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 320px;
  margin: 0 auto 12px;
  padding-top: 62px;
`;
export const LoginTitleContainer = styled.div`
  flex: 0 1 auto;
`;
export const LoginTitle = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  font-weight: bolder;
`;
export const SocialContainer = styled.div`
  margin: 32px auto auto;
  overflow-y: auto;
  width: 100%;
`;
export const ChannelItemWrapper = styled.div`
  width: 100%;
  min-height: 46px;
  border: 1px solid rgba(22, 24, 35, 0.12);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0 12px 0 0;
  cursor: pointer;
`;
export const ChannelIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(22, 24, 35, 0.12);
`;
export const ChannelIcon = styled.div`
  background-image: url(${(props) => props.urlBg});
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
  border-radius: 0px;
`;
export const ChannelName = styled.div`
  margin-left: 12px;
  word-break: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #161823;
  font-weight: 600;
`;
export const FooterContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-size: 17px;
`;
export const Toggle = styled.div`
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
`;
export const ToLogin = styled.div`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  font-family: "ProximaNova-regular";
  padding: 20px 0;
  text-align: center;
  color: #161823;
`;
export const SignUp = styled.a`
  font-size: 15px;
  line-height: 18px;
  color: #fe2c55;
  font-weight: 700;
  padding-left: 5px;
  font-family: cursive;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export default memo(Signin);
