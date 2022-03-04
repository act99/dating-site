import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { BootstrapButton } from "../elements/Button";

const pages = [
  ["홈", "/"],
  ["스토리", "/story"],
  ["LIVE NOW", "/livenow"],
  ["방 만들기", "/rooms"],
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = () => {
  const dispatch = useDispatch();
  const handleNavigate = (target) => {
    history.push(target);
  };
  const logout = () => {
    dispatch(userActions.logout());
    history.replace("/");
    history.go(0);
  };
  const user = useSelector((state) => state.userReducer.user);
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            onClick={() => history.push("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              backgroundColor: "white",
            }}
          >
            Logo
          </Button>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page[1]}
                onClick={() => {
                  handleNavigate(page[1]);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
          <BootstrapButton variant="contained" disableRipple>
            지금 방 만들기
          </BootstrapButton>
          {user.is_login === false ? (
            <Button color="inherit" onClick={() => handleNavigate("/login")}>
              로그인
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              로그아웃
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
