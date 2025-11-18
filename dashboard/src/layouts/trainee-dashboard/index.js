import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import dataService from "services/dataService";
import { useAuth } from "context/AuthContext";

function TraineeDashboard() {
  const [{ user }] = useAuth();
  const [sessions, setSessions] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock trainee data - in production this would come from API
  const traineeData = {
    completedSessions: 12,
    totalSessions: 20,
    averageScore: 88,
    rank: 5,
    totalTrainees: 45,
    certifications: ["Basic CBRN", "Chemical Response"],
    upcomingCertifications: ["Biological Response"],
    monthlyScores: [
      { month: "Jun", score: 82 },
      { month: "Jul", score: 84 },
      { month: "Aug", score: 86 },
      { month: "Sep", score: 85 },
      { month: "Oct", score: 87 },
      { month: "Nov", score: 88 },
    ],
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [sessionsData, certificationsData, scenariosData] = await Promise.all([
        dataService.getTrainingSessions(),
        dataService.getCertifications(),
        dataService.getIncidentLibrary(),
      ]);

      setSessions(sessionsData.filter((s) => s.status !== "Completed"));
      setCertifications(certificationsData);
      setScenarios(scenariosData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const performanceChartData = {
    labels: traineeData.monthlyScores.map((m) => m.month),
    datasets: {
      label: "Your Performance",
      data: traineeData.monthlyScores.map((m) => m.score),
    },
  };

  const progressPercentage = Math.round(
    (traineeData.completedSessions / traineeData.totalSessions) * 100
  );

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
            Welcome back, {user?.name}
          </MDTypography>
          <MDTypography variant="body2" color="text">
            {user?.organization} - Employee ID: {user?.employeeId}
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="school"
              title="Training Progress"
              count={`${progressPercentage}%`}
              percentage={{
                color: "success",
                amount: `${traineeData.completedSessions}/${traineeData.totalSessions}`,
                label: "sessions completed",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="trending_up"
              title="Average Score"
              count={`${traineeData.averageScore}%`}
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="military_tech"
              title="Certifications"
              count={traineeData.certifications.length}
              percentage={{
                color: "info",
                amount: traineeData.upcomingCertifications.length.toString(),
                label: "in progress",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="leaderboard"
              title="Team Rank"
              count={`#${traineeData.rank}`}
              percentage={{
                color: "text",
                amount: `of ${traineeData.totalTrainees}`,
                label: "trainees",
              }}
            />
          </Grid>
        </Grid>

        {/* Performance Chart & Quick Start */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Your Performance Trend
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
            <Card sx={{ height: "100%" }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Quick Start Training
                </MDTypography>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    <Icon sx={{ mr: 1 }}>play_circle</Icon>
                    Start VR Training
                  </MDButton>
                </MDBox>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="success" fullWidth>
                    <Icon sx={{ mr: 1 }}>assignment</Icon>
                    Take Assessment
                  </MDButton>
                </MDBox>
                <MDBox mb={2}>
                  <MDButton variant="gradient" color="warning" fullWidth>
                    <Icon sx={{ mr: 1 }}>library_books</Icon>
                    Study Materials
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton variant="gradient" color="dark" fullWidth>
                    <Icon sx={{ mr: 1 }}>chat</Icon>
                    AI Assistant
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Certification Progress */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Certification Progress
                </MDTypography>
                <Grid container spacing={2}>
                  {certifications.slice(0, 4).map((cert) => {
                    const isCompleted = traineeData.certifications.includes(cert.name);
                    const isInProgress = traineeData.upcomingCertifications.includes(cert.name);
                    const progress = isCompleted ? 100 : isInProgress ? 60 : 0;

                    return (
                      <Grid item xs={12} md={6} key={cert.id}>
                        <MDBox p={2} bgColor="grey.100" borderRadius="lg">
                          <MDBox display="flex" justifyContent="space-between" mb={1}>
                            <MDBox>
                              <MDTypography variant="button" fontWeight="medium">
                                {cert.name}
                              </MDTypography>
                              <MDTypography variant="caption" color="text" display="block">
                                Level: {cert.level} - {cert.requiredSessions} sessions required
                              </MDTypography>
                            </MDBox>
                            {isCompleted && (
                              <Icon color="success" fontSize="large">
                                verified
                              </Icon>
                            )}
                          </MDBox>
                          <MDBox mb={1}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              color={isCompleted ? "success" : isInProgress ? "info" : "secondary"}
                            />
                          </MDBox>
                          <MDTypography variant="caption" color="text">
                            {isCompleted
                              ? "Completed - Valid for " + cert.validityPeriod
                              : isInProgress
                              ? "In Progress - 60% Complete"
                              : "Not Started"}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    );
                  })}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Sessions */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Upcoming Training Sessions
                </MDTypography>
                {sessions.slice(0, 3).map((session) => (
                  <MDBox
                    key={session.id}
                    mb={2}
                    p={2}
                    bgColor="grey.100"
                    borderRadius="lg"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDBox>
                      <MDBox display="flex" alignItems="center" mb={1}>
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
                          mr={2}
                        >
                          <MDTypography variant="caption" color="white" fontWeight="medium">
                            {session.type}
                          </MDTypography>
                        </MDBox>
                        <MDTypography variant="button" fontWeight="medium">
                          {session.title}
                        </MDTypography>
                      </MDBox>
                      <MDTypography variant="caption" color="text" display="block">
                        <Icon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }}>
                          calendar_today
                        </Icon>
                        {session.scheduledDate} • {session.duration} • Instructor:{" "}
                        {session.instructor}
                      </MDTypography>
                      <MDTypography variant="caption" color="text" display="block">
                        <Icon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }}>
                          location_on
                        </Icon>
                        {session.location}
                      </MDTypography>
                    </MDBox>
                    <MDBox>
                      {session.status === "Scheduled" ? (
                        <MDButton variant="gradient" color="info" size="small">
                          Enroll
                        </MDButton>
                      ) : (
                        <MDButton variant="gradient" color="success" size="small">
                          Join Now
                        </MDButton>
                      )}
                    </MDBox>
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: "100%" }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Learning Path
                </MDTypography>
                <MDBox>
                  {[
                    { name: "Basic CBRN Fundamentals", completed: true },
                    { name: "Chemical Agent Identification", completed: true },
                    { name: "PPE Usage & Safety", completed: true },
                    { name: "Decontamination Procedures", inProgress: true },
                    { name: "Biological Threat Response", locked: true },
                    { name: "Radiological Detection", locked: true },
                  ].map((item, index) => (
                    <MDBox key={index} display="flex" alignItems="center" mb={2}>
                      <MDBox
                        bgColor={
                          item.completed ? "success" : item.inProgress ? "info" : "grey.300"
                        }
                        width="32px"
                        height="32px"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mr={2}
                      >
                        <Icon fontSize="small" color="white">
                          {item.completed
                            ? "check"
                            : item.inProgress
                            ? "play_arrow"
                            : "lock"}
                        </Icon>
                      </MDBox>
                      <MDBox flex={1}>
                        <MDTypography
                          variant="caption"
                          fontWeight={item.inProgress ? "bold" : "regular"}
                          color={item.locked ? "text" : "dark"}
                        >
                          {item.name}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  ))}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Practice Scenarios */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Available Practice Scenarios
                  </MDTypography>
                  <MDButton variant="outlined" color="info" size="small">
                    View All Scenarios
                  </MDButton>
                </MDBox>
                <Grid container spacing={2}>
                  {scenarios.slice(0, 4).map((scenario) => (
                    <Grid item xs={12} md={6} lg={3} key={scenario.id}>
                      <MDBox
                        p={2}
                        bgColor="grey.100"
                        borderRadius="lg"
                        sx={{
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                      >
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
                          mb={1}
                          display="inline-block"
                        >
                          <MDTypography variant="caption" color="white" fontWeight="medium">
                            {scenario.type}
                          </MDTypography>
                        </MDBox>
                        <MDTypography variant="button" fontWeight="medium" display="block" mb={1}>
                          {scenario.name}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" display="block" mb={2}>
                          {scenario.description.substring(0, 80)}...
                        </MDTypography>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center">
                          <MDTypography variant="caption" color="text">
                            <Icon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }}>
                              schedule
                            </Icon>
                            {scenario.duration}
                          </MDTypography>
                          <MDButton variant="text" color="info" size="small">
                            Start
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  ))}
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

export default TraineeDashboard;
