import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [value, setValue] = React.useState(0);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [touched, setTouched] = React.useState({
    username: false,
    password: false,
  });
  const handleFieldBlur = (fieldName) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [fieldName]: true,
    }));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFaculty = async () => {
    // Handle form submission logic here
    console.log("Submit button clicked!");
    try {
      const res = await axios.post(
        "https://emsserver.vercel.app/api/v1/user/admin-login",
        {
          username,
          password,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const { token, _id, role, user } = res.data; // Ensure 'user' is destructured from response data
        setAuth({
          ...auth,
          user: user.username, // Access 'user' from response data
          token,
          role,
          _id, // Set '_id' from response
        });
        localStorage.setItem("auth", JSON.stringify({ token, _id, role }));
        let dashboardUrl = `/admin-dashboard/${token}/${_id}`;
        navigate(dashboardUrl);
        toast.success("logged in successfully");
      } else {
        console.log("login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://emsserver.vercel.app/api/v1/user/login",
        {
          username,
          password,
        }
      );
      const { token, _id, role, user } = res.data;
      if (res.data.success) {
        setAuth({
          ...auth,
          user: user.username,
          token,
          role,
          _id, // Set _id from response
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        let dashboardUrl = `/volunteer-dashboard/${token}/${_id}`;
        navigate(dashboardUrl);
        toast.success("Logged in successfully");
      } else {
        console.log("Login failed");
        // Handle login failure here, e.g., display an error message to the user
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error here, e.g., display an error message to the user
    }
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <Container
          sx={{
            margin: "10px",
            width: "400px",
            height: "400px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Student" {...a11yProps(0)} />
                <Tab label="Admin" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="flex justify-center">
                <form>
                  <h3 className="text-2xl pb-5 pt-3 font-semibold text-center text-gray-700">
                    STUDENT LOGIN
                  </h3>
                  <div
                    className={`flex flex-row p-4 px-10 mb-2 ${
                      usernameError ? "border-red-500" : ""
                    }`}
                  >
                    <TextField
                      id="filled-username"
                      label="Username"
                      variant="filled"
                      value={username}
                      onChange={handleUsernameChange}
                      onBlur={() => handleFieldBlur("username")}
                      sx={{ width: "300px" }}
                      error={usernameError}
                    />
                  </div>
                  <div
                    className={`flex flex-row p-4 px-10 mb-2 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  >
                    <TextField
                      id="filled-password"
                      label="Password"
                      variant="filled"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => handleFieldBlur("password")}
                      sx={{ width: "300px" }}
                      error={passwordError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex pb-6 justify-between px-10">
                    <Link
                      to="/forgot-password"
                      style={{ textDecoration: "underline", color: "#1769aa" }}
                    >
                      Forgot Password?
                    </Link>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "20px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "primary.main",
                        color: "primary.main",
                        transition:
                          "background-color 0.3s ease, transform 0.3s ease",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      LOGIN
                    </Button>
                  </div>
                </form>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="flex justify-center">
                <form>
                  <h3 className="text-2xl pb-5 pt-3 font-semibold text-center text-gray-700">
                    ADMIN LOGIN
                  </h3>
                  <div
                    className={`flex flex-row p-4 px-10 mb-2 ${
                      usernameError ? "border-red-500" : ""
                    }`}
                  >
                    <TextField
                      id="filled-username"
                      label="Username"
                      variant="filled"
                      value={username}
                      onChange={handleUsernameChange}
                      onBlur={() => handleFieldBlur("username")}
                      sx={{ width: "300px" }}
                      error={usernameError}
                    />
                  </div>
                  <div
                    className={`flex flex-row p-4 px-10 mb-2 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  >
                    <TextField
                      id="filled-password"
                      label="Password"
                      variant="filled"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => handleFieldBlur("password")}
                      sx={{ width: "300px" }}
                      error={passwordError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex pb-6 justify-between px-10">
                    <Link
                      to="/forgot-password"
                      style={{ textDecoration: "underline", color: "#1769aa" }}
                    >
                      Forgot Password?
                    </Link>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "20px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "primary.main",
                        color: "primary.main",
                        transition:
                          "background-color 0.3s ease, transform 0.3s ease",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={handleFaculty}
                    >
                      LOGIN
                    </Button>
                  </div>
                </form>
              </div>
            </CustomTabPanel>
          </Box>
        </Container>
      </div>
    </>
  );
}
