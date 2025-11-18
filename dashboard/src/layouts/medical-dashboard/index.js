import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";
import dataService from "services/dataService";
import { useAuth } from "context/AuthContext";

function MedicalDashboard() {
  const [{ user }] = useAuth();
  const [healthRecords, setHealthRecords] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [healthData, sessionsData] = await Promise.all([
        dataService.getHealthRecords(),
        dataService.getTrainingSessions(),
      ]);

      setHealthRecords(healthData);
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const healthTableData = {
    columns: [
      { Header: "Trainee", accessor: "trainee", width: "15%" },
      { Header: "Last Checkup", accessor: "lastCheckup", width: "12%" },
      { Header: "Status", accessor: "status", width: "12%" },
      { Header: "BP", accessor: "bp", width: "10%" },
      { Header: "Heart Rate", accessor: "hr", width: "10%" },
      { Header: "Clearance", accessor: "clearance", width: "18%" },
      { Header: "Next Checkup", accessor: "nextCheckup", width: "12%" },
      { Header: "Action", accessor: "action", width: "11%" },
    ],
    rows: healthRecords.map((record) => ({
      trainee: record.traineeName,
      lastCheckup: record.lastCheckup,
      status: (
        <MDBox
          bgColor={
            record.status === "Fit"
              ? "success"
              : record.status === "Under Observation"
              ? "warning"
              : "error"
          }
          color="white"
          borderRadius="md"
          px={1}
          py={0.5}
          display="inline-block"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {record.status}
          </MDTypography>
        </MDBox>
      ),
      bp: record.bloodPressure,
      hr: `${record.heartRate} bpm`,
      clearance: (
        <MDTypography variant="caption" color={record.status === "Fit" ? "success" : "warning"}>
          {record.clearanceStatus}
        </MDTypography>
      ),
      nextCheckup: record.nextCheckup,
      action: (
        <MDButton variant="text" color="info" size="small">
          <Icon fontSize="small">visibility</Icon>
        </MDButton>
      ),
    })),
  };

  const incidentTableData = {
    columns: [
      { Header: "Date", accessor: "date", width: "12%" },
      { Header: "Incident Type", accessor: "type", width: "15%" },
      { Header: "Trainee", accessor: "trainee", width: "15%" },
      { Header: "Session", accessor: "session", width: "20%" },
      { Header: "Severity", accessor: "severity", width: "12%" },
      { Header: "Treatment", accessor: "treatment", width: "16%" },
      { Header: "Status", accessor: "status", width: "10%" },
    ],
    rows: [
      {
        date: "2024-11-15",
        type: "Minor Dehydration",
        trainee: "Constable Amit Singh",
        session: "Chemical Gas Leak Response",
        severity: (
          <MDBox bgColor="warning" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Minor
            </MDTypography>
          </MDBox>
        ),
        treatment: "Hydration, Rest",
        status: (
          <MDBox bgColor="success" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Resolved
            </MDTypography>
          </MDBox>
        ),
      },
      {
        date: "2024-11-10",
        type: "Mild Anxiety",
        trainee: "Constable Priya Verma",
        session: "Nuclear Disaster Management",
        severity: (
          <MDBox bgColor="info" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Low
            </MDTypography>
          </MDBox>
        ),
        treatment: "Counseling, Breathing exercises",
        status: (
          <MDBox bgColor="success" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Resolved
            </MDTypography>
          </MDBox>
        ),
      },
    ],
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDTypography variant="h4">Loading...</MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Welcome Section */}
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Welcome, {user?.name}
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Medical Officer Dashboard - {user?.qualification || "Healthcare Professional"}
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="health_and_safety"
              title="Fit for Training"
              count={healthRecords.filter((r) => r.status === "Fit").length}
              percentage={{
                color: "success",
                amount: `${Math.round((healthRecords.filter((r) => r.status === "Fit").length / healthRecords.length) * 100)}%`,
                label: "of total",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="monitor_heart"
              title="Under Observation"
              count={healthRecords.filter((r) => r.status === "Under Observation").length}
              percentage={{
                color: "warning",
                amount: "1",
                label: "needs attention",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="calendar_today"
              title="Checkups Today"
              count="5"
              percentage={{
                color: "info",
                amount: "12",
                label: "scheduled this week",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="error"
              icon="local_hospital"
              title="Incidents (Month)"
              count="2"
              percentage={{
                color: "success",
                amount: "-50%",
                label: "vs last month",
              }}
            />
          </Grid>
        </Grid>

        {/* Quick Actions & Health Alerts */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Health & Safety Actions
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="success"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        add_circle
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        New Checkup
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="info"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        medical_services
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Record Incident
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="warning"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        assignment
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        View Reports
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="dark"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        vaccines
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Vaccinations
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Urgent Alerts
                </MDTypography>
                <MDBox>
                  <MDBox mb={2} p={2} bgColor="error.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        warning
                      </Icon>
                      1 trainee needs immediate review
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2} p={2} bgColor="warning.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        schedule
                      </Icon>
                      5 checkups due today
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2} bgColor="info.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        info
                      </Icon>
                      3 vaccination records to update
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Health Records Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Health Records
                  </MDTypography>
                  <MDButton variant="gradient" color="success" size="small">
                    <Icon sx={{ mr: 1 }}>add</Icon>
                    New Health Check
                  </MDButton>
                </MDBox>
                <DataTable table={healthTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Safety Incidents Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Safety Incidents Log
                  </MDTypography>
                  <MDButton variant="outlined" color="info" size="small">
                    View All Incidents
                  </MDButton>
                </MDBox>
                <DataTable table={incidentTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Safety Protocols */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Active Safety Protocols
                </MDTypography>
                {[
                  { name: "PPE Compliance Check", status: "Active", lastUpdated: "Today" },
                  { name: "Heat Stress Monitoring", status: "Active", lastUpdated: "Yesterday" },
                  { name: "Mental Health Assessment", status: "Active", lastUpdated: "2 days ago" },
                  { name: "Post-Training Checkup", status: "Active", lastUpdated: "3 days ago" },
                ].map((protocol, index) => (
                  <MDBox
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    p={2}
                    bgColor="grey.100"
                    borderRadius="lg"
                  >
                    <MDBox>
                      <MDTypography variant="button" fontWeight="medium">
                        {protocol.name}
                      </MDTypography>
                      <MDTypography variant="caption" color="text" display="block">
                        Last updated: {protocol.lastUpdated}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      bgColor="success"
                      color="white"
                      borderRadius="md"
                      px={1.5}
                      py={0.5}
                    >
                      <MDTypography variant="caption" color="white" fontWeight="medium">
                        {protocol.status}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Upcoming Vaccinations
                </MDTypography>
                {[
                  { name: "Hepatitis B Booster", trainees: 12, dueDate: "2024-11-25" },
                  { name: "Tetanus Shot", trainees: 8, dueDate: "2024-12-05" },
                  { name: "Influenza Vaccine", trainees: 45, dueDate: "2024-12-15" },
                  { name: "COVID-19 Booster", trainees: 20, dueDate: "2024-12-20" },
                ].map((vaccine, index) => (
                  <MDBox
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    p={2}
                    bgColor="info.light"
                    borderRadius="lg"
                  >
                    <MDBox>
                      <MDTypography variant="button" fontWeight="medium">
                        {vaccine.name}
                      </MDTypography>
                      <MDTypography variant="caption" color="text" display="block">
                        {vaccine.trainees} trainees • Due: {vaccine.dueDate}
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="text" color="info" size="small">
                      Schedule
                    </MDButton>
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MedicalDashboard;
