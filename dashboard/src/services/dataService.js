// Mock data service for CBRN training system
// In production, these would be API calls

class DataService {
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Training Sessions
  async getTrainingSessions(filters = {}) {
    await this.delay(300);
    const sessions = [
      {
        id: 1,
        title: "Chemical Gas Leak Response",
        type: "Chemical",
        scenario: "Industrial gas leak simulation",
        instructor: "Dr. Meera Patel",
        scheduledDate: "2024-11-20",
        duration: "2 hours",
        participants: 25,
        maxParticipants: 30,
        status: "Scheduled",
        location: "VR Lab 1, NDRF Academy Nagpur",
      },
      {
        id: 2,
        title: "Biological Outbreak Containment",
        type: "Biological",
        scenario: "Epidemic response drill",
        instructor: "Dr. Suresh Reddy",
        scheduledDate: "2024-11-21",
        duration: "3 hours",
        participants: 18,
        maxParticipants: 20,
        status: "Scheduled",
        location: "VR Lab 2, NDRF Academy Nagpur",
      },
      {
        id: 3,
        title: "Radiological Emergency Response",
        type: "Radiological",
        scenario: "Nuclear plant incident",
        instructor: "Dr. Meera Patel",
        scheduledDate: "2024-11-19",
        duration: "2.5 hours",
        participants: 20,
        maxParticipants: 20,
        status: "Completed",
        location: "VR Lab 1, NDRF Academy Nagpur",
        averageScore: 85,
      },
      {
        id: 4,
        title: "Nuclear Disaster Management",
        type: "Nuclear",
        scenario: "Post-explosion cleanup",
        instructor: "Dr. Meera Patel",
        scheduledDate: "2024-11-18",
        duration: "4 hours",
        participants: 15,
        maxParticipants: 15,
        status: "In Progress",
        location: "VR Lab 3, NDRF Academy Nagpur",
      },
    ];
    return sessions;
  }

  // Trainees
  async getTrainees(filters = {}) {
    await this.delay(300);
    return [
      {
        id: 1,
        name: "Constable Amit Singh",
        employeeId: "NDRF-TRN-2045",
        batch: "CBRN-2024-A",
        organization: "NDRF Battalion 5",
        location: "Pune",
        joiningDate: "2024-01-15",
        completedSessions: 12,
        totalSessions: 20,
        averageScore: 88,
        certifications: ["Basic CBRN", "Chemical Response"],
        status: "Active",
      },
      {
        id: 2,
        name: "Constable Priya Verma",
        employeeId: "NDRF-TRN-2046",
        batch: "CBRN-2024-A",
        organization: "NDRF Battalion 5",
        location: "Pune",
        joiningDate: "2024-01-15",
        completedSessions: 15,
        totalSessions: 20,
        averageScore: 92,
        certifications: ["Basic CBRN", "Chemical Response", "Biological Response"],
        status: "Active",
      },
      {
        id: 3,
        name: "Constable Raj Kumar",
        employeeId: "NDRF-TRN-2047",
        batch: "CBRN-2024-B",
        organization: "SDRF Maharashtra",
        location: "Mumbai",
        joiningDate: "2024-02-01",
        completedSessions: 8,
        totalSessions: 20,
        averageScore: 75,
        certifications: ["Basic CBRN"],
        status: "Active",
      },
    ];
  }

  // Equipment Inventory
  async getEquipmentInventory() {
    await this.delay(300);
    return [
      {
        id: 1,
        name: "VR Headset - Meta Quest 3",
        category: "VR Equipment",
        quantity: 45,
        available: 32,
        inUse: 10,
        underMaintenance: 3,
        status: "Good",
        lastMaintenance: "2024-11-01",
        nextMaintenance: "2024-12-01",
        location: "Equipment Store, NDRF Academy",
      },
      {
        id: 2,
        name: "CBRN Protective Suit - Level A",
        category: "PPE",
        quantity: 120,
        available: 95,
        inUse: 20,
        underMaintenance: 5,
        status: "Good",
        lastMaintenance: "2024-10-15",
        nextMaintenance: "2024-11-25",
        location: "PPE Store, NDRF Academy",
      },
      {
        id: 3,
        name: "Gas Detection Monitor",
        category: "Detection Equipment",
        quantity: 30,
        available: 25,
        inUse: 3,
        underMaintenance: 2,
        status: "Needs Attention",
        lastMaintenance: "2024-09-10",
        nextMaintenance: "2024-11-20",
        location: "Equipment Store, NDRF Academy",
      },
      {
        id: 4,
        name: "Decontamination Shower Unit",
        category: "Decontamination",
        quantity: 8,
        available: 6,
        inUse: 2,
        underMaintenance: 0,
        status: "Good",
        lastMaintenance: "2024-10-20",
        nextMaintenance: "2024-12-20",
        location: "Decon Area, NDRF Academy",
      },
    ];
  }

  // Incidents & Scenarios Library
  async getIncidentLibrary() {
    await this.delay(300);
    return [
      {
        id: 1,
        name: "Bhopal Gas Tragedy Simulation",
        type: "Chemical",
        basedOn: "Bhopal Disaster 1984",
        difficulty: "Advanced",
        duration: "4 hours",
        objectives: [
          "Assess chemical leak severity",
          "Evacuate affected population",
          "Establish decontamination zones",
          "Coordinate with medical teams",
        ],
        description:
          "Simulation based on the 1984 Bhopal gas tragedy, focusing on rapid response to methyl isocyanate (MIC) leak.",
        relevantFor: ["Chemical", "Mass Casualty"],
      },
      {
        id: 2,
        name: "Nuclear Power Plant Emergency",
        type: "Radiological",
        basedOn: "Generic nuclear facility incident",
        difficulty: "Advanced",
        duration: "5 hours",
        objectives: [
          "Contain radiation spread",
          "Evacuate immediate area",
          "Set up exclusion zones",
          "Monitor radiation levels",
        ],
        description:
          "Response to critical incident at nuclear power facility requiring immediate containment and evacuation.",
        relevantFor: ["Nuclear", "Radiological"],
      },
      {
        id: 3,
        name: "Biological Outbreak in Urban Area",
        type: "Biological",
        basedOn: "Pandemic scenario",
        difficulty: "Intermediate",
        duration: "3 hours",
        objectives: [
          "Identify pathogen",
          "Establish quarantine",
          "Coordinate with health authorities",
          "Prevent spread",
        ],
        description:
          "Urban biological outbreak requiring rapid identification and containment measures.",
        relevantFor: ["Biological", "Epidemic Response"],
      },
      {
        id: 4,
        name: "Industrial Chemical Fire",
        type: "Chemical",
        basedOn: "Industrial accident scenario",
        difficulty: "Intermediate",
        duration: "2 hours",
        objectives: [
          "Assess hazardous materials",
          "Contain chemical fire",
          "Prevent environmental contamination",
          "Rescue trapped personnel",
        ],
        description: "Chemical fire at industrial facility with multiple hazardous materials.",
        relevantFor: ["Chemical", "Fire Response"],
      },
    ];
  }

  // Certifications
  async getCertifications(userId = null) {
    await this.delay(300);
    const allCerts = [
      {
        id: 1,
        name: "Basic CBRN Response",
        level: "Foundation",
        validityPeriod: "2 years",
        requiresRenewal: true,
        requiredSessions: 8,
      },
      {
        id: 2,
        name: "Chemical Warfare Response",
        level: "Advanced",
        validityPeriod: "1 year",
        requiresRenewal: true,
        requiredSessions: 12,
      },
      {
        id: 3,
        name: "Biological Incident Management",
        level: "Advanced",
        validityPeriod: "1 year",
        requiresRenewal: true,
        requiredSessions: 10,
      },
      {
        id: 4,
        name: "Radiological Emergency Response",
        level: "Advanced",
        validityPeriod: "1 year",
        requiresRenewal: true,
        requiredSessions: 15,
      },
    ];
    return allCerts;
  }

  // Analytics Data
  async getAnalytics(filters = {}) {
    await this.delay(300);
    return {
      totalTrainees: 350,
      activeTrainees: 105,
      totalSessions: 245,
      completedSessions: 180,
      upcomingSessions: 65,
      averagePerformance: 85.5,
      certificationRate: 78,
      equipmentUtilization: 72,
      trainingByType: {
        Chemical: 85,
        Biological: 65,
        Radiological: 55,
        Nuclear: 40,
      },
      monthlyProgress: [
        { month: "Jun", sessions: 18, performance: 82 },
        { month: "Jul", sessions: 22, performance: 84 },
        { month: "Aug", sessions: 25, performance: 86 },
        { month: "Sep", sessions: 28, performance: 85 },
        { month: "Oct", sessions: 30, performance: 87 },
        { month: "Nov", sessions: 27, performance: 88 },
      ],
    };
  }

  // Health Records
  async getHealthRecords(filters = {}) {
    await this.delay(300);
    return [
      {
        id: 1,
        traineeId: 1,
        traineeName: "Constable Amit Singh",
        lastCheckup: "2024-11-10",
        status: "Fit",
        bloodPressure: "120/80",
        heartRate: 72,
        respiratoryRate: 16,
        clearanceStatus: "Cleared for training",
        nextCheckup: "2024-12-10",
      },
      {
        id: 2,
        traineeId: 2,
        traineeName: "Constable Priya Verma",
        lastCheckup: "2024-11-12",
        status: "Fit",
        bloodPressure: "118/76",
        heartRate: 68,
        respiratoryRate: 15,
        clearanceStatus: "Cleared for training",
        nextCheckup: "2024-12-12",
      },
      {
        id: 3,
        traineeId: 3,
        traineeName: "Constable Raj Kumar",
        lastCheckup: "2024-11-08",
        status: "Under Observation",
        bloodPressure: "135/85",
        heartRate: 78,
        respiratoryRate: 18,
        clearanceStatus: "Restricted - Light duty only",
        nextCheckup: "2024-11-20",
        notes: "Elevated BP - monitoring required",
      },
    ];
  }

  // User management (Admin)
  async getAllUsers() {
    await this.delay(300);
    return [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        role: "admin",
        email: "admin@ndrf.gov.in",
        organization: "NDRF HQ",
        status: "Active",
        lastLogin: "2024-11-18 09:30",
      },
      {
        id: 2,
        name: "Commandant Priya Sharma",
        role: "commander",
        email: "commander@ndrf.gov.in",
        organization: "NDRF Battalion 5",
        status: "Active",
        lastLogin: "2024-11-18 08:15",
      },
      {
        id: 3,
        name: "Constable Amit Singh",
        role: "trainee",
        email: "trainee@ndrf.gov.in",
        organization: "NDRF Battalion 5",
        status: "Active",
        lastLogin: "2024-11-17 16:45",
      },
    ];
  }
}

export default new DataService();
