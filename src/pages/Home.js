import React from "react";
import { history } from "../redux/store";

const Home = () => {
  return (
    <div>
      <h3>홈입니다.</h3>
      <h3
        className="myinfo_user_name"
        onClick={() => {
          history.push("/login");
        }}
      >
        <span>로그인 후 전체 기능을 이용해보세요!</span>
      </h3>
    </div>
  );
};

export default Home;
