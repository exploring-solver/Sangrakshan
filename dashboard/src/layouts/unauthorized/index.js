import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Unauthorized() {
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Access Denied
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} textAlign="center">
          <MDTypography variant="h1" color="error" fontWeight="bold">
            403
          </MDTypography>
          <MDTypography variant="h5" color="text" mb={3}>
            Unauthorized Access
          </MDTypography>
          <MDTypography variant="body2" color="text" mb={4}>
            You don&apos;t have permission to access this page. Please contact your administrator
            if you believe this is an error.
          </MDTypography>
          <MDButton variant="gradient" color="info" component={Link} to="/dashboard">
            Go to Dashboard
          </MDButton>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Unauthorized;
