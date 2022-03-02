import React from "react";

const LoginCont = (props) => {
  return (
    <div>
      <a id="custom-login-btn" onClick={props.onClick}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
        />
      </a>
    </div>
  );
};

export default LoginCont;
