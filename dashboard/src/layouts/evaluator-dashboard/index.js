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

function EvaluatorDashboard() {
  const [{ user }] = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [scenariosData, sessionsData, traineesData] = await Promise.all([
        dataService.getIncidentLibrary(),
        dataService.getTrainingSessions(),
        dataService.getTrainees(),
      ]);

      setScenarios(scenariosData);
      setSessions(sessionsData.filter((s) => s.status === "Completed"));
      setTrainees(traineesData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scenarioTableData = {
    columns: [
      { Header: "Scenario Name", accessor: "name", width: "25%" },
      { Header: "Type", accessor: "type", width: "12%" },
      { Header: "Difficulty", accessor: "difficulty", width: "12%" },
      { Header: "Duration", accessor: "duration", width: "10%" },
      { Header: "Times Used", accessor: "timesUsed", width: "10%" },
      { Header: "Avg Score", accessor: "avgScore", width: "10%" },
      { Header: "Action", accessor: "action", width: "21%" },
    ],
    rows: scenarios.map((scenario, index) => ({
      name: scenario.name,
      type: (
        <MDBox
          bgColor={
            scenario.type === "Chemical"
              ? "warning"
              : scenario.type === "Biological"
              ? "error"
              : scenario.type === "Radiological"
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
            {scenario.type}
          </MDTypography>
        </MDBox>
      ),
      difficulty: (
        <MDBox
          bgColor={
            scenario.difficulty === "Advanced"
              ? "error"
              : scenario.difficulty === "Intermediate"
              ? "warning"
              : "success"
          }
          color="white"
          borderRadius="md"
          px={1}
          py={0.5}
          display="inline-block"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {scenario.difficulty}
          </MDTypography>
        </MDBox>
      ),
      duration: scenario.duration,
      timesUsed: Math.floor(Math.random() * 20) + 5,
      avgScore: `${Math.floor(Math.random() * 15) + 80}%`,
      action: (
        <MDBox display="flex" gap={1}>
          <MDButton variant="text" color="info" size="small">
            <Icon fontSize="small">edit</Icon>
          </MDButton>
          <MDButton variant="text" color="success" size="small">
            <Icon fontSize="small">visibility</Icon>
          </MDButton>
          <MDButton variant="text" color="warning" size="small">
            <Icon fontSize="small">analytics</Icon>
          </MDButton>
        </MDBox>
      ),
    })),
  };

  const evaluationTableData = {
    columns: [
      { Header: "Trainee", accessor: "trainee", width: "20%" },
      { Header: "Session", accessor: "session", width: "20%" },
      { Header: "Date", accessor: "date", width: "12%" },
      { Header: "Score", accessor: "score", width: "10%" },
      { Header: "Time Taken", accessor: "timeTaken", width: "12%" },
      { Header: "Status", accessor: "status", width: "13%" },
      { Header: "Action", accessor: "action", width: "13%" },
    ],
    rows: sessions.slice(0, 5).flatMap((session) =>
      trainees.slice(0, 2).map((trainee) => ({
        trainee: trainee.name,
        session: session.title,
        date: session.scheduledDate,
        score: (
          <MDTypography
            variant="button"
            fontWeight="bold"
            color={trainee.averageScore >= 85 ? "success" : trainee.averageScore >= 70 ? "info" : "warning"}
          >
            {trainee.averageScore}%
          </MDTypography>
        ),
        timeTaken: session.duration,
        status: (
          <MDBox bgColor="success" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Evaluated
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDButton variant="text" color="info" size="small">
            Details
          </MDButton>
        ),
      }))
    ),
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
            Evaluator Dashboard - {user?.specialization || "CBRN Training"} Specialist
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="assignment"
              title="Total Scenarios"
              count={scenarios.length}
              percentage={{
                color: "success",
                amount: "4",
                label: "created this month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="rate_review"
              title="Evaluations Pending"
              count="8"
              percentage={{
                color: "warning",
                amount: "3",
                label: "due today",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="groups"
              title="Trainees Assessed"
              count={trainees.length * 2}
              percentage={{
                color: "success",
                amount: "+12",
                label: "this week",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="trending_up"
              title="Avg Pass Rate"
              count="87%"
              percentage={{
                color: "success",
                amount: "+5%",
                label: "improvement",
              }}
            />
          </Grid>
        </Grid>

        {/* Quick Actions & Assessment Tools */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Assessment Tools
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="info"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        add_circle
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Create Scenario
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="success"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        grading
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Grade Performance
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="warning"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        analytics
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        View Analytics
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="error"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        science
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Scenario Library
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="dark"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        quiz
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Create Quiz
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <MDBox
                      p={2}
                      bgColor="primary"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        download
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Export Reports
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
                  Recent Activity
                </MDTypography>
                <MDBox>
                  {[
                    {
                      action: "Scenario Created",
                      item: "Chemical Fire Response",
                      time: "2 hours ago",
                      icon: "add_circle",
                      color: "success",
                    },
                    {
                      action: "Evaluation Completed",
                      item: "15 trainees assessed",
                      time: "5 hours ago",
                      icon: "check_circle",
                      color: "info",
                    },
                    {
                      action: "Quiz Published",
                      item: "Biological Threats",
                      time: "1 day ago",
                      icon: "quiz",
                      color: "warning",
                    },
                    {
                      action: "Report Generated",
                      item: "Monthly Performance",
                      time: "2 days ago",
                      icon: "assessment",
                      color: "dark",
                    },
                  ].map((activity, index) => (
                    <MDBox key={index} display="flex" mb={2}>
                      <MDBox
                        bgColor={activity.color}
                        width="40px"
                        height="40px"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mr={2}
                      >
                        <Icon fontSize="small" color="white">
                          {activity.icon}
                        </Icon>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="caption" fontWeight="medium" display="block">
                          {activity.action}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" display="block">
                          {activity.item}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" fontSize="10px">
                          {activity.time}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  ))}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Scenario Management Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Training Scenarios
                  </MDTypography>
                  <MDButton variant="gradient" color="info" size="small">
                    <Icon sx={{ mr: 1 }}>add</Icon>
                    Create New Scenario
                  </MDButton>
                </MDBox>
                <DataTable table={scenarioTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Evaluations Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Recent Evaluations
                  </MDTypography>
                  <MDButton variant="outlined" color="info" size="small">
                    View All Evaluations
                  </MDButton>
                </MDBox>
                <DataTable table={evaluationTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EvaluatorDashboard;
