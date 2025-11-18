# Role-Based Dashboard System for Sangरक्षण CBRN Training Platform

## Overview

This document describes the comprehensive role-based dashboard system implemented for the Sangरक्षण (Sangrakshan) CBRN (Chemical, Biological, Radiological, Nuclear) Disaster Response Training Platform. The system addresses real-world problems in India's disaster management training ecosystem.

## System Architecture

### 1. Authentication & Authorization

#### Role Hierarchy
The system implements 6 distinct roles:

1. **Admin** (`admin`)
   - National/State level disaster management authority
   - Full system access and control
   - User management capabilities
   - System-wide analytics and reporting

2. **Training Commander** (`commander`)
   - NDRF/SDRF battalion commanders
   - Team management and oversight
   - Training session scheduling
   - Performance monitoring

3. **Trainee** (`trainee`)
   - NDRF/SDRF personnel undergoing training
   - Personal progress tracking
   - Training module access
   - Certification management

4. **Evaluator/Instructor** (`evaluator`)
   - Subject matter experts
   - Scenario creation and management
   - Assessment and evaluation
   - Report generation

5. **Medical Officer** (`medical_officer`)
   - Healthcare professionals
   - Health monitoring and clearance
   - Incident tracking
   - Safety protocol management

6. **Equipment Manager** (`equipment_manager`)
   - Equipment and resource management
   - Inventory tracking
   - Maintenance scheduling
   - Resource allocation

### 2. Features Addressing Indian Context

#### A. Real-World Problems Addressed

1. **Lack of Standardized Training**
   - Centralized curriculum management
   - Consistent evaluation criteria
   - Standardized certification process

2. **Limited VR/AR Infrastructure**
   - Equipment tracking and allocation
   - Maintenance scheduling
   - Utilization analytics

3. **Poor Inter-Force Coordination**
   - Unified platform for NDRF and SDRF
   - Shared training modules
   - Cross-organizational analytics

4. **Inadequate Incident Reporting**
   - Comprehensive incident library
   - Indian disaster scenario database
   - Analytics and trend analysis

5. **Limited Multilingual Support**
   - Hindi and English support (foundation laid)
   - Expandable to regional languages
   - Accessible interface design

6. **Equipment Management Gaps**
   - Real-time inventory tracking
   - Preventive maintenance scheduling
   - Resource optimization

#### B. Indian Disaster Scenarios Implemented

The system includes scenario templates based on:

1. **Bhopal Gas Tragedy (1984)**
   - Chemical leak response
   - Mass casualty management
   - Decontamination procedures

2. **Nuclear Power Plant Incidents**
   - Radiological emergency response
   - Evacuation protocols
   - Containment strategies

3. **Urban Biological Outbreaks**
   - Pandemic response
   - Quarantine management
   - Health authority coordination

4. **Industrial Chemical Fires**
   - Hazardous material handling
   - Fire response
   - Environmental protection

## Dashboard Features by Role

### Admin Dashboard
**Route:** `/admin/dashboard`

**Key Features:**
- System-wide analytics
  - Total trainees, sessions, performance metrics
  - Training distribution by CBRN type
  - Certification rates
- User management table
  - All users across roles
  - Status tracking
  - Last login information
- Training session management
  - Complete session overview
  - Status tracking
  - Location management
- System alerts
  - Equipment maintenance alerts
  - Certification expiry warnings
  - Safety protocol compliance
- Quick actions
  - Add users
  - Schedule sessions
  - Generate reports
  - System configuration

### Commander Dashboard
**Route:** `/commander/dashboard`

**Key Features:**
- Team management
  - Team member roster
  - Individual progress tracking
  - Performance metrics
- Training session coordination
  - Schedule management
  - Participant allocation
  - Session monitoring
- Performance analytics
  - Team performance trends
  - Individual trainee scores
  - Certification progress
- Top performers tracking
- Needs attention alerts
- Quick actions
  - Schedule training
  - Assign training modules
  - Export reports

### Trainee Dashboard
**Route:** `/trainee/dashboard`

**Key Features:**
- Personal progress tracking
  - Completed vs total sessions
  - Average score
  - Team ranking
- Certification progress
  - Active certifications
  - In-progress certifications
  - Renewal tracking
- Performance trends
  - Monthly score progression
  - Comparative analytics
- Learning path
  - Structured progression
  - Module completion status
  - Next steps guidance
- Upcoming sessions
  - Enrollment options
  - Session details
  - Location information
- Practice scenarios
  - Available scenarios
  - Difficulty levels
  - Time requirements

### Evaluator Dashboard
**Route:** `/evaluator/dashboard`

**Key Features:**
- Scenario management
  - Create/edit scenarios
  - Difficulty configuration
  - Usage analytics
- Assessment tools
  - Grading interface
  - Evaluation criteria
  - Performance analytics
- Trainee evaluations
  - Individual assessments
  - Batch evaluations
  - Progress tracking
- Scenario library
  - CBRN type categorization
  - Difficulty levels
  - Reusability tracking
- Quick actions
  - Create scenarios
  - Grade performances
  - Export evaluations

### Medical Officer Dashboard
**Route:** `/medical/dashboard`

**Key Features:**
- Health records management
  - Fitness status tracking
  - Medical clearances
  - Checkup scheduling
- Health monitoring
  - Blood pressure tracking
  - Heart rate monitoring
  - Respiratory assessment
- Incident tracking
  - Training incidents
  - Severity categorization
  - Treatment records
- Safety protocols
  - Active protocol monitoring
  - Compliance tracking
  - Update management
- Vaccination management
  - Schedule tracking
  - Coverage monitoring
  - Reminder system
- Urgent alerts
  - Immediate attention cases
  - Scheduled checkups
  - Record updates

### Equipment Manager Dashboard
**Route:** `/equipment/dashboard`

**Key Features:**
- Inventory management
  - Real-time stock tracking
  - Category-wise organization
  - Location management
- Equipment status
  - Available count
  - In-use tracking
  - Maintenance status
- Utilization analytics
  - Usage statistics
  - Optimization insights
  - Allocation patterns
- Maintenance scheduling
  - Preventive maintenance
  - Corrective repairs
  - Priority management
- Equipment alerts
  - Urgent repairs
  - Scheduled maintenance
  - Replacement requirements
- Quick actions
  - Add equipment
  - Allocate resources
  - Schedule service
  - QR code scanning

## Technical Implementation

### Authentication Flow

1. **Login Process**
   ```
   User enters credentials → authService.login()
   → User role identified → Redirect to role-specific dashboard
   ```

2. **Protected Routes**
   - All role-specific dashboards wrapped in `<ProtectedRoute>`
   - Role verification before rendering
   - Automatic redirect to sign-in if unauthenticated
   - Redirect to `/unauthorized` if insufficient permissions

### Data Services

**Mock Data Implementation:**
- `authService.js`: User authentication and management
- `dataService.js`: Training sessions, scenarios, equipment, health records

**Production Ready:**
- Easy migration to REST API
- Async/await pattern maintained
- Error handling implemented

### State Management

**Global State:**
- `MaterialUIControllerProvider`: UI state
- `AuthProvider`: Authentication state

**Local State:**
- Component-level state for dashboard data
- useEffect hooks for data loading

## Demo Credentials

### Admin
- Email: `admin@ndrf.gov.in`
- Password: `admin123`
- Access: All features

### Commander
- Email: `commander@ndrf.gov.in`
- Password: `commander123`
- Access: Team management features

### Trainee
- Email: `trainee@ndrf.gov.in`
- Password: `trainee123`
- Access: Personal training features

### Evaluator
- Email: `evaluator@ndrf.gov.in`
- Password: `evaluator123`
- Access: Scenario and assessment features

### Medical Officer
- Email: `medical@ndrf.gov.in`
- Password: `medical123`
- Access: Health and safety features

### Equipment Manager
- Email: `equipment@ndrf.gov.in`
- Password: `equipment123`
- Access: Inventory and maintenance features

## Installation & Setup

```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Future Enhancements

### Phase 1 (Immediate)
1. Backend API integration
2. Real-time data synchronization
3. WebSocket for live updates
4. Database integration (PostgreSQL/MongoDB)

### Phase 2 (3-6 months)
1. Full multilingual support
   - Hindi UI translation
   - Regional language support
2. Mobile application
   - React Native implementation
   - Offline mode
3. Advanced analytics
   - Machine learning predictions
   - Performance forecasting
4. Integration with existing systems
   - NDRF databases
   - State disaster management systems

### Phase 3 (6-12 months)
1. IoT integration
   - Real-time equipment monitoring
   - Automated maintenance alerts
2. AI-powered features
   - Personalized training recommendations
   - Automated scenario generation
3. Blockchain for certifications
   - Tamper-proof certificates
   - Nationwide verification
4. Advanced VR features
   - Multi-user scenarios
   - Haptic feedback integration

## Security Considerations

1. **Authentication**
   - JWT token implementation ready
   - Password hashing (bcrypt recommended)
   - Session management

2. **Authorization**
   - Role-based access control
   - Permission-level granularity
   - Route protection

3. **Data Security**
   - HTTPS enforcement
   - Input validation
   - XSS protection
   - SQL injection prevention

## Compliance & Standards

1. **Government Standards**
   - NDRF training protocols
   - MHA (Ministry of Home Affairs) guidelines
   - NDMA (National Disaster Management Authority) standards

2. **Technical Standards**
   - WCAG 2.1 accessibility guidelines
   - Responsive design principles
   - Performance optimization

## Support & Documentation

### User Guides
- Admin manual
- Commander handbook
- Trainee guide
- Evaluator documentation
- Medical officer protocols
- Equipment manager guide

### Technical Documentation
- API documentation
- Database schema
- Deployment guide
- Maintenance procedures

## Contact & Support

For technical support or queries:
- Email: support@sangrakshan.gov.in
- Helpline: 1800-XXX-XXXX
- Web: https://sangrakshan.gov.in

## License

This system is developed for the Ministry of Home Affairs, Government of India. All rights reserved.

---

**Version:** 1.0.0
**Last Updated:** November 2024
**Developed by:** Team Parallel Transcend
