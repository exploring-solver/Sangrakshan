import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";
import dataService from "services/dataService";
import { useAuth } from "context/AuthContext";

function AdminDashboard() {
  const [{ user }] = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [analyticsData, usersData, sessionsData] = await Promise.all([
        dataService.getAnalytics(),
        dataService.getAllUsers(),
        dataService.getTrainingSessions(),
      ]);

      setAnalytics(analyticsData);
      setUsers(usersData);
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const userTableData = {
    columns: [
      { Header: "Name", accessor: "name", width: "20%" },
      { Header: "Role", accessor: "role", width: "15%" },
      { Header: "Email", accessor: "email", width: "25%" },
      { Header: "Organization", accessor: "organization", width: "20%" },
      { Header: "Status", accessor: "status", width: "10%" },
      { Header: "Last Login", accessor: "lastLogin", width: "10%" },
    ],
    rows: users.map((user) => ({
      name: user.name,
      role: user.role.toUpperCase(),
      email: user.email,
      organization: user.organization,
      status: (
        <MDBox display="flex" alignItems="center">
          <Icon
            fontSize="small"
            color={user.status === "Active" ? "success" : "error"}
            sx={{ mr: 1 }}
          >
            {user.status === "Active" ? "check_circle" : "cancel"}
          </Icon>
          <MDTypography variant="caption">{user.status}</MDTypography>
        </MDBox>
      ),
      lastLogin: user.lastLogin,
    })),
  };

  const sessionTableData = {
    columns: [
      { Header: "Session", accessor: "title", width: "25%" },
      { Header: "Type", accessor: "type", width: "12%" },
      { Header: "Instructor", accessor: "instructor", width: "18%" },
      { Header: "Date", accessor: "date", width: "12%" },
      { Header: "Participants", accessor: "participants", width: "13%" },
      { Header: "Status", accessor: "status", width: "10%" },
      { Header: "Location", accessor: "location", width: "10%" },
    ],
    rows: sessions.map((session) => ({
      title: session.title,
      type: (
        <MDBox
          bgColor={
            session.type === "Chemical"
              ? "warning"
              : session.type === "Biological"
              ? "error"
              : session.type === "Radiological"
              ? "info"
              : "dark"
          }
          color="white"
          borderRadius="md"
          px={1.5}
          py={0.5}
          display="inline-block"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {session.type}
          </MDTypography>
        </MDBox>
      ),
      instructor: session.instructor,
      date: session.scheduledDate,
      participants: `${session.participants}/${session.maxParticipants}`,
      status: (
        <MDBox
          bgColor={
            session.status === "Completed"
              ? "success"
              : session.status === "In Progress"
              ? "info"
              : "secondary"
          }
          color="white"
          borderRadius="md"
          px={1}
          py={0.5}
          display="inline-block"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {session.status}
          </MDTypography>
        </MDBox>
      ),
      location: session.location,
    })),
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
            Admin Dashboard - CBRN Training Management System
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="people"
              title="Total Trainees"
              count={analytics?.totalTrainees || 0}
              percentage={{
                color: "success",
                amount: `${analytics?.activeTrainees || 0}`,
                label: "active now",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="school"
              title="Training Sessions"
              count={analytics?.totalSessions || 0}
              percentage={{
                color: "success",
                amount: `${analytics?.completedSessions || 0}`,
                label: "completed",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="military_tech"
              title="Avg Performance"
              count={`${analytics?.averagePerformance || 0}%`}
              percentage={{
                color: "success",
                amount: "+5%",
                label: "than last month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="primary"
              icon="verified"
              title="Certification Rate"
              count={`${analytics?.certificationRate || 0}%`}
              percentage={{
                color: "success",
                amount: "+8%",
                label: "than last quarter",
              }}
            />
          </Grid>
        </Grid>

        {/* Training Distribution by Type */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Training Sessions by CBRN Type
                </MDTypography>
                <Grid container spacing={2}>
                  {analytics?.trainingByType &&
                    Object.entries(analytics.trainingByType).map(([type, count]) => (
                      <Grid item xs={6} md={3} key={type}>
                        <MDBox textAlign="center" p={2} bgColor="grey.100" borderRadius="lg">
                          <MDTypography variant="h3" fontWeight="bold" color="dark">
                            {count}
                          </MDTypography>
                          <MDTypography variant="button" color="text" fontWeight="medium">
                            {type}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Users Management Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    User Management
                  </MDTypography>
                  <MDTypography variant="button" color="info" fontWeight="medium">
                    View All Users
                  </MDTypography>
                </MDBox>
                <DataTable table={userTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Training Sessions Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    All Training Sessions
                  </MDTypography>
                  <MDTypography variant="button" color="info" fontWeight="medium">
                    Schedule New Session
                  </MDTypography>
                </MDBox>
                <DataTable table={sessionTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Compliance & Alerts Section */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  System Alerts
                </MDTypography>
                <MDBox>
                  <MDBox mb={2} p={2} bgColor="warning.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        warning
                      </Icon>
                      3 Equipment items need maintenance
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2} p={2} bgColor="info.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        info
                      </Icon>
                      15 Certifications expiring in next 30 days
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2} bgColor="success.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        check_circle
                      </Icon>
                      All safety protocols up to date
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Quick Actions
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDBox
                      p={2}
                      bgColor="info"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        person_add
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Add User
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox
                      p={2}
                      bgColor="success"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        event
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Schedule Session
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox
                      p={2}
                      bgColor="warning"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        assessment
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        View Reports
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox
                      p={2}
                      bgColor="dark"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        settings
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        System Settings
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AdminDashboard;
