import { ROLES } from "../context/AuthContext";

// Mock user database - In production, this would be replaced with actual API calls
const MOCK_USERS = [
  {
    id: 1,
    email: "admin@ndrf.gov.in",
    password: "admin123",
    name: "Dr. Rajesh Kumar",
    role: ROLES.ADMIN,
    organization: "National Disaster Response Force",
    location: "New Delhi",
    phone: "+91-9876543210",
    employeeId: "NDRF-ADM-001",
  },
  {
    id: 2,
    email: "commander@ndrf.gov.in",
    password: "commander123",
    name: "Commandant Priya Sharma",
    role: ROLES.COMMANDER,
    organization: "NDRF Battalion 5",
    location: "Pune, Maharashtra",
    phone: "+91-9876543211",
    employeeId: "NDRF-CMD-102",
    teamSize: 45,
  },
  {
    id: 3,
    email: "trainee@ndrf.gov.in",
    password: "trainee123",
    name: "Constable Amit Singh",
    role: ROLES.TRAINEE,
    organization: "NDRF Battalion 5",
    location: "Pune, Maharashtra",
    phone: "+91-9876543212",
    employeeId: "NDRF-TRN-2045",
    batchNumber: "CBRN-2024-A",
    joiningDate: "2024-01-15",
  },
  {
    id: 4,
    email: "evaluator@ndrf.gov.in",
    password: "evaluator123",
    name: "Dr. Meera Patel",
    role: ROLES.EVALUATOR,
    organization: "NDRF Training Academy",
    location: "Nagpur, Maharashtra",
    phone: "+91-9876543213",
    employeeId: "NDRF-EVL-053",
    specialization: "Chemical Warfare",
  },
  {
    id: 5,
    email: "medical@ndrf.gov.in",
    password: "medical123",
    name: "Dr. Suresh Reddy",
    role: ROLES.MEDICAL_OFFICER,
    organization: "NDRF Medical Unit",
    location: "Hyderabad, Telangana",
    phone: "+91-9876543214",
    employeeId: "NDRF-MED-028",
    qualification: "MBBS, MD Emergency Medicine",
  },
  {
    id: 6,
    email: "equipment@ndrf.gov.in",
    password: "equipment123",
    name: "Inspector Vikram Desai",
    role: ROLES.EQUIPMENT_MANAGER,
    organization: "NDRF Equipment Division",
    location: "Ghaziabad, Uttar Pradesh",
    phone: "+91-9876543215",
    employeeId: "NDRF-EQP-087",
  },
];

class AuthService {
  // Simulate API delay
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Login
  async login(email, password) {
    await this.delay(500);

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}`,
    };
  }

  // Register new user
  async register(userData) {
    await this.delay(500);

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === userData.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      employeeId: `NDRF-${userData.role.substring(0, 3).toUpperCase()}-${Math.floor(
        Math.random() * 1000
      )}`,
    };

    MOCK_USERS.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}`,
    };
  }

  // Get user by ID
  async getUserById(id) {
    await this.delay(300);

    const user = MOCK_USERS.find((u) => u.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Update user profile
  async updateProfile(userId, data) {
    await this.delay(500);

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      ...data,
    };

    const { password: _, ...userWithoutPassword } = MOCK_USERS[userIndex];
    return userWithoutPassword;
  }

  // Change password
  async changePassword(userId, oldPassword, newPassword) {
    await this.delay(500);

    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== oldPassword) {
      throw new Error("Current password is incorrect");
    }

    user.password = newPassword;

    return { success: true };
  }

  // Logout
  async logout() {
    await this.delay(200);
    return { success: true };
  }

  // Get all users (Admin only)
  async getAllUsers() {
    await this.delay(500);
    return MOCK_USERS.map(({ password: _, ...user }) => user);
  }

  // Verify token
  async verifyToken(token) {
    await this.delay(200);
    // In production, this would verify JWT token
    return token && token.startsWith("mock-jwt-token-");
  }
}

export default new AuthService();
