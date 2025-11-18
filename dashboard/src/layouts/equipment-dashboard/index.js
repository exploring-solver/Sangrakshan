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
import DataTable from "examples/Tables/DataTable";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import dataService from "services/dataService";
import { useAuth } from "context/AuthContext";

function EquipmentDashboard() {
  const [{ user }] = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const inventoryData = await dataService.getEquipmentInventory();
      setInventory(inventoryData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalEquipment = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const availableEquipment = inventory.reduce((sum, item) => sum + item.available, 0);
  const inUse = inventory.reduce((sum, item) => sum + item.inUse, 0);
  const underMaintenance = inventory.reduce((sum, item) => sum + item.underMaintenance, 0);

  const inventoryTableData = {
    columns: [
      { Header: "Equipment", accessor: "equipment", width: "20%" },
      { Header: "Category", accessor: "category", width: "15%" },
      { Header: "Total", accessor: "total", width: "8%" },
      { Header: "Available", accessor: "available", width: "10%" },
      { Header: "In Use", accessor: "inUse", width: "8%" },
      { Header: "Maintenance", accessor: "maintenance", width: "10%" },
      { Header: "Status", accessor: "status", width: "12%" },
      { Header: "Next Service", accessor: "nextService", width: "10%" },
      { Header: "Action", accessor: "action", width: "7%" },
    ],
    rows: inventory.map((item) => ({
      equipment: item.name,
      category: (
        <MDTypography variant="caption" color="text">
          {item.category}
        </MDTypography>
      ),
      total: item.quantity,
      available: (
        <MDTypography variant="caption" fontWeight="bold" color="success">
          {item.available}
        </MDTypography>
      ),
      inUse: (
        <MDTypography variant="caption" fontWeight="bold" color="info">
          {item.inUse}
        </MDTypography>
      ),
      maintenance: (
        <MDTypography variant="caption" fontWeight="bold" color="warning">
          {item.underMaintenance}
        </MDTypography>
      ),
      status: (
        <MDBox
          bgColor={
            item.status === "Good"
              ? "success"
              : item.status === "Needs Attention"
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
            {item.status}
          </MDTypography>
        </MDBox>
      ),
      nextService: item.nextMaintenance,
      action: (
        <MDButton variant="text" color="info" size="small">
          <Icon fontSize="small">edit</Icon>
        </MDButton>
      ),
    })),
  };

  const maintenanceTableData = {
    columns: [
      { Header: "Equipment", accessor: "equipment", width: "25%" },
      { Header: "Type", accessor: "type", width: "15%" },
      { Header: "Scheduled Date", accessor: "date", width: "15%" },
      { Header: "Technician", accessor: "technician", width: "15%" },
      { Header: "Priority", accessor: "priority", width: "12%" },
      { Header: "Status", accessor: "status", width: "10%" },
      { Header: "Action", accessor: "action", width: "8%" },
    ],
    rows: [
      {
        equipment: "VR Headset - Meta Quest 3 (Unit 12-15)",
        type: "Preventive",
        date: "2024-11-20",
        technician: "Tech Team A",
        priority: (
          <MDBox bgColor="warning" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Medium
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox bgColor="info" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              Scheduled
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDButton variant="text" color="info" size="small">
            View
          </MDButton>
        ),
      },
      {
        equipment: "Gas Detection Monitor (Unit 5, 8)",
        type: "Corrective",
        date: "2024-11-19",
        technician: "Tech Team B",
        priority: (
          <MDBox bgColor="error" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              High
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox bgColor="success" color="white" borderRadius="md" px={1} py={0.5} display="inline-block">
            <MDTypography variant="caption" color="white" fontWeight="medium">
              In Progress
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDButton variant="text" color="info" size="small">
            View
          </MDButton>
        ),
      },
    ],
  };

  const utilizationChartData = {
    labels: ["Available", "In Use", "Under Maintenance"],
    datasets: {
      label: "Equipment Status",
      backgroundColors: ["success", "info", "warning"],
      data: [availableEquipment, inUse, underMaintenance],
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
            Equipment Manager Dashboard - Inventory & Maintenance Management
          </MDTypography>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="inventory"
              title="Total Equipment"
              count={totalEquipment}
              percentage={{
                color: "success",
                amount: availableEquipment.toString(),
                label: "available",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="settings"
              title="In Use"
              count={inUse}
              percentage={{
                color: "info",
                amount: `${Math.round((inUse / totalEquipment) * 100)}%`,
                label: "utilization",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="build"
              title="Under Maintenance"
              count={underMaintenance}
              percentage={{
                color: "warning",
                amount: "2",
                label: "urgent repairs",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="check_circle"
              title="Good Condition"
              count={inventory.filter((i) => i.status === "Good").length}
              percentage={{
                color: "success",
                amount: `${Math.round((inventory.filter((i) => i.status === "Good").length / inventory.length) * 100)}%`,
                label: "of total",
              }}
            />
          </Grid>
        </Grid>

        {/* Equipment Utilization Chart & Quick Actions */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Equipment Utilization
                </MDTypography>
                <DefaultDoughnutChart chart={utilizationChartData} />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Quick Actions
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
                        Add Equipment
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
                        assignment
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Allocate
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
                        build
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Schedule Service
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
                        download
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Export Report
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="error"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        warning
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        View Alerts
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="primary"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        qr_code_scanner
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Scan QR
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <MDBox
                      p={2}
                      bgColor="secondary"
                      borderRadius="lg"
                      textAlign="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Icon fontSize="large" color="white">
                        shopping_cart
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Procurement
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
                        history
                      </Icon>
                      <MDTypography variant="button" color="white" display="block" mt={1}>
                        Usage History
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Equipment Inventory Table */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Equipment Inventory
                  </MDTypography>
                  <MDButton variant="gradient" color="success" size="small">
                    <Icon sx={{ mr: 1 }}>add</Icon>
                    Add New Equipment
                  </MDButton>
                </MDBox>
                <DataTable table={inventoryTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Maintenance Schedule */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Maintenance Schedule
                  </MDTypography>
                  <MDButton variant="outlined" color="warning" size="small">
                    <Icon sx={{ mr: 1 }}>event</Icon>
                    Schedule Maintenance
                  </MDButton>
                </MDBox>
                <DataTable table={maintenanceTableData} canSearch />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Category-wise Inventory & Alerts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Category-wise Distribution
                </MDTypography>
                {Object.entries(
                  inventory.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + item.quantity;
                    return acc;
                  }, {})
                ).map(([category, count], index) => (
                  <MDBox key={index} mb={2}>
                    <MDBox display="flex" justifyContent="space-between" mb={0.5}>
                      <MDTypography variant="button" fontWeight="medium">
                        {category}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="bold">
                        {count}
                      </MDTypography>
                    </MDBox>
                    <LinearProgress
                      variant="determinate"
                      value={(count / totalEquipment) * 100}
                      color="info"
                    />
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Equipment Alerts
                </MDTypography>
                <MDBox>
                  <MDBox mb={2} p={2} bgColor="error.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        error
                      </Icon>
                      2 Gas Detectors require immediate calibration
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2} p={2} bgColor="warning.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        warning
                      </Icon>
                      3 VR Headsets scheduled for maintenance this week
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2} p={2} bgColor="info.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        info
                      </Icon>
                      5 CBRN suits need replacement within 6 months
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2} bgColor="success.light" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      <Icon fontSize="small" sx={{ mr: 1 }}>
                        check_circle
                      </Icon>
                      All decontamination units operational
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EquipmentDashboard;
