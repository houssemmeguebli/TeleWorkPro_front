import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import Swal from "sweetalert2";
import AuthService from "../../../_services/AuthService";  // Modifié pour utiliser AuthService

const bgImage = "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";
const autherService = new AuthService();
function Cover() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  // Define roles with both value and label
  const roles = [
    { value: 0, label: "Project Manager" },
    { value: 1, label: "Employee" },
  ];

  // Handle role selection from Autocomplete
  const handleRoleChange = (event, value) => {
    setRole(value ? value.value : "");  // Store the numerical value of the selected role
  };

  // Handle input changes
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !email || !password || !phone || !department || role === "") {
      Swal.fire("Error!", "Please fill in all required fields.", "error");
      return;
    }

    // Prepare user object based on the role
    const user = {
      firstName,
      lastName,
      email,
      password,
      phone,
      department,
      role,
    };

    try {
      await autherService.register(user);  // Call the AuthService to register
      Swal.fire("Success!", "User registered successfully!", "success");
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire("Error!", "Error registering user.", "error");
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      description="Use these forms to sign up as an Employee or Project Manager."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register with
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <Socials />
        </ArgonBox>
        <ArgonBox px={12}>
          <Separator />
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="First Name" value={firstName} onChange={handleInputChange(setFirstName)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Last Name" value={lastName} onChange={handleInputChange(setLastName)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="email" placeholder="Email" value={email} onChange={handleInputChange(setEmail)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" placeholder="Password" value={password} onChange={handleInputChange(setPassword)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Phone" value={phone} onChange={handleInputChange(setPhone)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Department" value={department} onChange={handleInputChange(setDepartment)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <Autocomplete
                options={roles}
                value={roles.find((r) => r.value === role) || null}
                onChange={handleRoleChange}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton type="submit" variant="gradient" color="dark" fullWidth>
                Sign Up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign In
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
