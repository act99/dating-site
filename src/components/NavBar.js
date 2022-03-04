import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { CreateRoomButton } from "../elements/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    // sx={{ color: "white" }}
                    // textColor="white"

                    indicatorColor="secondary"
                    // indicatorColor="white"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ color: "#ffffff" }}
                      label="홈"
                      value="1"
                      onClick={() => history.push("/")}
                    />
                    <Tab
                      style={{ color: "#ffffff" }}
                      label="스토리"
                      value="2"
                      onClick={() => history.push("/story")}
                    />
                    <Tab
                      style={{ color: "#ffffff" }}
                      label="LIVE NOW"
                      value="3"
                      onClick={() => history.push("/rooms")}
                    />
                  </TabList>
                </Box>
              </TabContext>

              {/* {pages.map((page) => (
              <Button
                key={page[1]}
                onClick={() => {
                  handleNavigate(page[1]);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page[0]}
              </Button>
            ))} */}
            </Box>

            {user.is_login === false ? (
              <Button color="inherit" onClick={() => handleNavigate("/login")}>
                로그인
              </Button>
            ) : (
              <>
                {" "}
                <CreateRoomButton
                  variant="contained"
                  disableRipple
                  onClick={() => {
                    handleNavigate("/createroom");
                  }}
                >
                  지금 방 만들기
                </CreateRoomButton>{" "}
                <Button color="inherit" onClick={logout}>
                  로그아웃
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
