/**
 * =========================================================
 * React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 */

// @mui material components
import Card from "@mui/material/Card";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Past Accidents and lives lost count
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="October, 15, 2022" id="#CBRN-2022-Incident" price="" />
          <Invoice date="October, 15, 2022" id="#CBRN-2022-Incident" price="" />
          <Invoice date="October, 15, 2022" id="#CBRN-2022-Incident" price="" />
          <Invoice date="October, 15, 2022" id="#CBRN-2022-Incident" price="" />
          <Invoice date="October, 15, 2022" id="#CBRN-2022-Incident" price="" noGutter />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
