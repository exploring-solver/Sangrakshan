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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import dataService from "services/dataService";
import { useAuth } from "context/AuthContext";

function CommanderDashboard() {
  const [{ user }] = useAuth();
  const [trainees, setTrainees] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [traineesData, sessionsData, analyticsData] = await Promise.all([
        dataService.getTrainees(),
        dataService.getTrainingSessions(),
        dataService.getAnalytics(),
      ]);

      setTrainees(traineesData);
      setSessions(sessionsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const traineeTableData = {
    columns: [
      { Header: "Name", accessor: "name", width: "20%" },
      { Header: "Employee ID", accessor: "employeeId", width: "15%" },
      { Header: "Batch", accessor: "batch", width: "12%" },
      { Header: "Progress", accessor: "progress", width: "18%" },
      { Header: "Avg Score", accessor: "avgScore", width: "10%" },
      { Header: "Certifications", accessor: "certifications", width: "15%" },
      { Header: "Status", accessor: "status", width: "10%" },
    ],
    rows: trainees.map((trainee) => ({
      name: trainee.name,
      employeeId: trainee.employeeId,
      batch: trainee.batch,
      progress: (
        <MDBox>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {trainee.completedSessions}/{trainee.totalSessions} sessions
          </MDTypography>
          <MDBox
            bgColor="grey.200"
            width="100%"
            height="4px"
            borderRadius="sm"
            mt={0.5}
            position="relative"
          >
            <MDBox
              bgColor="info"
              width={`${(trainee.completedSessions / trainee.totalSessions) * 100}%`}
              height="100%"
              borderRadius="sm"
            />
          </MDBox>
        </MDBox>
      ),
      avgScore: (
        <MDBox>
          <MDTypography
            variant="caption"
            fontWeight="bold"
            color={trainee.averageScore >= 85 ? "success" : trainee.averageScore >= 70 ? "info" : "warning"}
          >
            {trainee.averageScore}%
          </MDTypography>
        </MDBox>
      ),
      certifications: (
        <MDTypography variant="caption" color="text">
          {trainee.certifications.length} certified
        </MDTypography>
      ),
      status: (
        <MDBox
          bgColor={trainee.status === "Active" ? "success" : "secondary"}
          color="white"
          borderRadius="md"
          px={1}
          py={0.5}
          display="inline-block"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {trainee.status}
          </MDTypography>
        </MDBox>
      ),
    })),
  };

  const sessionTableData = {
    columns: [
      { Header: "Session", accessor: "title", width: "25%" },
      { Header: "Type", accessor: "type", width: "12%" },
      { Header: "Date", accessor: "date", width: "15%" },
      { Header: "Participants", accessor: "participants", width: "15%" },
      { Header: "Duration", accessor: "duration", width: "10%" },
      { Header: "Status", accessor: "status", width: "13%" },
      { Header: "Action", accessor: "action", width: "10%" },
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
      date: session.scheduledDate,
      participants: `${session.participants}/${session.maxParticipants}`,
      duration: session.duration,
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
      action: (
        <MDButton variant="text" color="info" size="small">
          View
        </MDButton>
      ),
    })),
  };

  const performanceChartData = {
    labels: analytics?.monthlyProgress?.map((m) => m.month) || [],
    datasets: {
      label: "Team Performance",
      data: analytics?.monthlyProgress?.map((m) => m.performance) || [],
    },
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
            {user?.organization} - Team Management Dashboard
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="groups"
              title="Team Size"
              count={user?.teamSize || trainees.length}
              percentage={{
                color: "success",
                amount: trainees.filter((t) => t.status === "Active").length.toString(),
                label: "active trainees",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="event"
              title="Upcoming Sessions"
              count={sessions.filter((s) => s.status === "Scheduled").length}
              percentage={{
                color: "info",
                amount: sessions.filter((s) => s.status === "In Progress").length.toString(),
                label: "in progress",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="trending_up"
              title="Team Avg Score"
              count={`${Math.round(trainees.reduce((sum, t) => sum + t.averageScore, 0) / trainees.length)}%`}
              percentage={{
                color: "success",
                amount: "+4%",
                label: "improvement",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="military_tech"
              title="Certifications"
              count={trainees.reduce((sum, t) => sum + t.certifications.length, 0)}
              percentage={{
                color: "success",
                amount: "12",
                label: "this month",
              }}
            />
          </Grid>
        </Grid>

        {/* Performance Chart */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Team Performance Trend
                </MDTypography>
                <ReportsLineChart
                  color="success"
                  title=""
                  description=""
                  chart={performanceChartData}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Quick Actions
                </MDTypography>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    <Icon sx={{ mr: 1 }}>event</Icon>
                    Schedule Training Session
                  </MDButton>
                </MDBox>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="success" fullWidth>
                    <Icon sx={{ mr: 1 }}>person_add</Icon>
                    Assign Training
                  </MDButton>
                </MDBox>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="warning" fullWidth>
                    <Icon sx={{ mr: 1 }}>assessment</Icon>
                    View Reports
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton variant="gradient" color="dark" fullWidth>
                    <Icon sx={{ mr: 1 }}>download</Icon>
                    Export Data
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Trainees Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Team Members
                  </MDTypography>
                  <MDButton variant="outlined" color="info" size="small">
                    <Icon sx={{ mr: 1 }}>add</Icon>
                    Add Trainee
                  </MDButton>
                </MDBox>
                <DataTable table={traineeTableData} canSearch />
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
                    Training Sessions
                  </MDTypography>
                  <MDButton variant="outlined" color="success" size="small">
                    <Icon sx={{ mr: 1 }}>event</Icon>
                    Schedule New
                  </MDButton>
                </MDBox>
                <DataTable table={sessionTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Team Insights */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Top Performers
                </MDTypography>
                {trainees
                  .sort((a, b) => b.averageScore - a.averageScore)
                  .slice(0, 3)
                  .map((trainee, index) => (
                    <MDBox
                      key={trainee.id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                      p={2}
                      bgColor="grey.100"
                      borderRadius="lg"
                    >
                      <MDBox display="flex" alignItems="center">
                        <MDBox
                          bgColor={index === 0 ? "warning" : index === 1 ? "grey.400" : "orange"}
                          width="32px"
                          height="32px"
                          borderRadius="50%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={2}
                        >
                          <MDTypography variant="button" color="white" fontWeight="bold">
                            {index + 1}
                          </MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDTypography variant="button" fontWeight="medium">
                            {trainee.name}
                          </MDTypography>
                          <MDTypography variant="caption" color="text" display="block">
                            {trainee.employeeId}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDTypography variant="h6" fontWeight="bold" color="success">
                        {trainee.averageScore}%
                      </MDTypography>
                    </MDBox>
                  ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Needs Attention
                </MDTypography>
                {trainees
                  .filter((t) => t.averageScore < 75 || t.status !== "Active")
                  .slice(0, 3)
                  .map((trainee) => (
                    <MDBox
                      key={trainee.id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                      p={2}
                      bgColor="warning.light"
                      borderRadius="lg"
                    >
                      <MDBox>
                        <MDTypography variant="button" fontWeight="medium">
                          {trainee.name}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" display="block">
                          Score: {trainee.averageScore}% - Progress:{" "}
                          {trainee.completedSessions}/{trainee.totalSessions}
                        </MDTypography>
                      </MDBox>
                      <MDButton variant="text" color="warning" size="small">
                        Review
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

export default CommanderDashboard;
