# 🎓 Learning Management System (LMS) Backend

A comprehensive Learning Management System backend built with NestJS, TypeScript, and PostgreSQL. This system provides complete course management, user enrollment, assessments, discussions, and administrative features.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [API Flow Guide](#-api-flow-guide)
- [Docker Support](#-docker-support)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🚀 Features

### 👤 User Management
- **Role-based Access Control**: Admin, Instructor, Student roles
- **User Authentication**: Secure password hashing with bcrypt
- **Profile Management**: Complete user profile CRUD operations
- **Soft Delete**: Safe user deletion with data preservation

### 🏢 Organization Management
- **Multi-tenant Support**: Organizations with user assignments
- **Role Management**: Organization-specific user roles
- **Scalable Architecture**: Support for multiple educational institutions

### 📚 Course Management
- **Course Creation**: Rich course content with multimedia support
- **Section Organization**: Structured course content hierarchy
- **Lecture Management**: Video lectures with duration tracking
- **Resource Attachment**: Files, PDFs, and external links
- **Instructor Assignment**: Multiple instructors per course
- **Course Status**: Published/Draft course states

### 📝 Assessment System
- **Quiz Engine**: Multiple choice questions with auto-grading
- **Assignment Management**: File submission and grading system
- **Progress Tracking**: Real-time student progress monitoring
- **Certificate Generation**: Automatic certificate issuance on completion

### 🧑‍🎓 Enrollment & Progress
- **Course Enrollment**: Student registration system
- **Progress Tracking**: Percentage-based completion tracking
- **Certificate Management**: Digital certificate generation
- **Learning Analytics**: Student performance insights

### 💬 Community Features
- **Discussion Forums**: Course-specific discussions
- **Comment System**: Threaded conversation support
- **Lecture-specific Discussions**: Context-aware conversations
- **Real-time Interactions**: Community engagement tools

### 🔔 Notification System
- **Real-time Notifications**: Instant updates for users
- **Read/Unread Status**: Message state management
- **User-specific Notifications**: Targeted messaging
- **Bulk Notifications**: System-wide announcements

### 📜 Audit & Monitoring
- **Complete Audit Trail**: All system actions logged
- **User Activity Tracking**: Detailed user behavior analytics
- **System Monitoring**: Health checks and performance metrics
- **Data Integrity**: Comprehensive logging for compliance

### 🛡️ Security & Performance
- **Input Validation**: Class-validator for request validation
- **Error Handling**: Global exception filtering
- **Response Standardization**: Consistent API responses
- **Pagination Support**: Efficient data loading
- **Soft Deletes**: Data preservation with logical deletion

## 🛠 Technology Stack

### Backend Framework
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe development
- **Express**: HTTP server foundation

### Database
- **PostgreSQL**: Primary database
- **TypeORM**: Object-Relational Mapping
- **Connection Pooling**: Efficient database connections

### Documentation & Validation
- **Swagger/OpenAPI**: Comprehensive API documentation
- **Class Validator**: Request validation
- **Class Transformer**: Data transformation

### Security
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Input Sanitization**: XSS prevention

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Docker**: Containerization

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │    │    Services     │    │   Repositories  │
│                 │────│                 │────│                 │
│ HTTP Endpoints  │    │ Business Logic  │    │ Data Access     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

### Module Structure
```
src/
├── users/              # User management module
├── organizations/      # Organization management
├── courses/           # Course content management
├── enrollments/       # Student enrollment system
├── quizzes/          # Assessment engine
├── assignments/      # Assignment management
├── discussions/      # Forum and comments
├── notifications/    # Notification system
├── audit/           # Audit logging
├── health/          # System health checks
├── common/          # Shared utilities
└── main.ts         # Application bootstrap
```

## 📥 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-repo/LMS_Nestjs.git
cd LMS_Nestjs/lms_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run start:dev
```

5. **Access the application**
- API: http://localhost:3000/api
- Documentation: http://localhost:3000/api/docs
- Health Check: http://localhost:3000/api/health

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=lms_db

# Application Configuration
NODE_ENV=development
PORT=3000

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Additional Configuration
JWT_SECRET=your_jwt_secret_key
```

## 🗄️ Database Schema

### Core Tables

#### Users & Authentication
```sql
-- User roles (admin, instructor, student)
roles (id, name)

-- User management
users (id, name, email, password_hash, role_id, created_at, is_deleted)
```

#### Organizations
```sql
-- Multi-tenant organizations
organizations (id, name, type)

-- Organization user relationships
organization_users (organization_id, user_id, role)
```

#### Course Management
```sql
-- Course catalog
courses (id, title, description, price, category, created_by, status, is_deleted)

-- Course instructors
course_instructors (course_id, user_id)

-- Course structure
sections (id, course_id, title, section_order, is_deleted)
lectures (id, section_id, title, video_url, duration, is_deleted)
resources (id, lecture_id, type, url, is_deleted)
```

#### Assessment System
```sql
-- Quizzes and questions
quizzes (id, course_id, title, is_deleted)
quiz_questions (id, quiz_id, question_text, type, options, correct_answer)
quiz_submissions (id, user_id, quiz_id, answers, score)

-- Assignments
assignments (id, course_id, title, description, due_date, is_deleted)
assignment_submissions (id, assignment_id, user_id, submission_url, grade)
```

#### Enrollment & Progress
```sql
-- Student enrollments
enrollments (user_id, course_id, enrollment_date, progress)

-- Certificates
certificates (id, user_id, course_id, issued_on, cert_url)
```

#### Community Features
```sql
-- Discussion forums
discussions (id, course_id, lecture_id, user_id, title, content, is_deleted)
comments (id, discussion_id, user_id, comment_text, created_at, is_deleted)

-- Notifications
notifications (id, user_id, message, read_flag, created_at)
```

#### System Monitoring
```sql
-- Audit trail
audit_logs (id, user_id, action_type, table_name, record_id, action_details, timestamp)
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Interactive Documentation
Access the complete Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🔄 API Flow Guide

### 1. System Setup Flow

#### Initial Setup
```bash
# 1. Health Check
GET /api/health

# 2. Create Roles
POST /api/users/roles
{
  "name": "admin"
}

# 3. Create Admin User
POST /api/users
{
  "name": "System Admin",
  "email": "admin@lms.com",
  "password": "admin123",
  "role_id": 1
}
```

### 2. Organization Setup Flow

```bash
# 1. Create Organization
POST /api/organizations
{
  "name": "Tech Academy",
  "type": "educational_institute"
}

# 2. Add Users to Organization
POST /api/organizations/1/users
{
  "user_id": 1,
  "role": "admin"
}

# 3. Get Organization Users
GET /api/organizations/1/users
```

### 3. Course Creation Flow

```bash
# 1. Create Course
POST /api/courses
{
  "title": "Web Development Fundamentals",
  "description": "Complete guide to HTML, CSS, and JavaScript",
  "price": 149.99,
  "category": "Programming",
  "created_by": 2,
  "status": "published"
}

# 2. Add Instructor
POST /api/courses/1/instructors/2

# 3. Create Section
POST /api/sections
{
  "course_id": 1,
  "title": "Introduction to HTML",
  "section_order": 1
}

# 4. Create Lecture
POST /api/lectures
{
  "section_id": 1,
  "title": "HTML Basics",
  "video_url": "https://example.com/video1.mp4",
  "duration": 1200
}

# 5. Add Resources
POST /api/resources
{
  "lecture_id": 1,
  "type": "pdf",
  "url": "https://example.com/html-guide.pdf"
}
```

### 4. Student Enrollment Flow

```bash
# 1. Enroll Student
POST /api/enrollments
{
  "user_id": 3,
  "course_id": 1
}

# 2. Update Progress
PUT /api/enrollments/progress
{
  "user_id": 3,
  "course_id": 1,
  "progress": 75.0
}

# 3. Complete Course (Auto-generate Certificate)
PUT /api/enrollments/progress
{
  "user_id": 3,
  "course_id": 1,
  "progress": 100.0
}

# 4. Get Certificates
GET /api/certificates/3
```

### 5. Assessment Flow

```bash
# 1. Create Quiz
POST /api/quizzes
{
  "course_id": 1,
  "title": "HTML Fundamentals Quiz"
}

# 2. Add Questions
POST /api/quizzes/questions
{
  "quiz_id": 1,
  "question_text": "What does HTML stand for?",
  "type": "multiple_choice",
  "options": ["HyperText Markup Language", "Home Tool Markup Language"],
  "correct_answer": "HyperText Markup Language"
}

# 3. Submit Quiz
POST /api/quizzes/1/submit
{
  "user_id": 3,
  "answers": {
    "1": "HyperText Markup Language"
  }
}

# 4. Create Assignment
POST /api/assignments
{
  "course_id": 1,
  "title": "Build a Website",
  "description": "Create a responsive website",
  "due_date": "2025-06-15"
}

# 5. Submit Assignment
POST /api/assignments/submit
{
  "assignment_id": 1,
  "user_id": 3,
  "submission_url": "https://github.com/student/project"
}

# 6. Grade Assignment
PUT /api/assignments/grade
{
  "submission_id": 1,
  "grade": 85.5
}
```

### 6. Community Interaction Flow

```bash
# 1. Create Discussion
POST /api/discussions
{
  "course_id": 1,
  "lecture_id": 1,
  "user_id": 3,
  "title": "Question about HTML",
  "content": "Need help with HTML tags"
}

# 2. Add Comment
POST /api/comments
{
  "discussion_id": 1,
  "user_id": 2,
  "comment_text": "Use semantic HTML tags for better structure"
}

# 3. Send Notification
POST /api/notifications
{
  "user_id": 3,
  "message": "Your question has been answered!"
}

# 4. Mark as Read
PUT /api/notifications/1/read
```

### 7. Monitoring & Analytics Flow

```bash
# 1. Check System Health
GET /api/health
GET /api/health/db

# 2. View Audit Logs
GET /api/audit-logs?page=1&limit=10

# 3. User-specific Logs
GET /api/audit-logs/user/3

# 4. Filter by Actions
GET /api/audit-logs?action=POST&table=courses
```

## 📚 Complete API Reference

### 👤 Users API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Soft delete user |
| POST | `/users/assign-role` | Assign role to user |
| POST | `/users/roles` | Create new role |
| GET | `/users/roles/all` | Get all roles |

### 🏢 Organizations API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/organizations` | Get all organizations |
| GET | `/organizations/:id` | Get organization by ID |
| POST | `/organizations` | Create organization |
| POST | `/organizations/:id/users` | Add user to organization |
| GET | `/organizations/:id/users` | Get organization users |

### 📚 Courses API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| POST | `/courses` | Create course |
| PATCH | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Soft delete course |
| POST | `/courses/:id/instructors/:userId` | Add instructor |
| GET | `/courses/:id/sections` | Get course sections |

### 📖 Sections & Lectures API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sections` | Create section |
| GET | `/sections/:id/lectures` | Get section lectures |
| POST | `/lectures` | Create lecture |
| GET | `/lectures/:id` | Get lecture by ID |
| POST | `/lectures/:id/resources` | Add resource to lecture |

### 📋 Resources API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resources` | Attach resource to lecture |
| GET | `/resources/lecture/:lectureId` | Get lecture resources |

### 📝 Quizzes API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/quizzes` | Create quiz |
| GET | `/quizzes/:id` | Get quiz with questions |
| POST | `/quizzes/questions` | Add question to quiz |
| GET | `/quizzes/:id/questions` | Get quiz questions |
| POST | `/quizzes/:id/submit` | Submit quiz answers |

### 🧾 Assignments API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/assignments` | Create assignment |
| GET | `/assignments/:id` | Get assignment by ID |
| POST | `/assignments/submit` | Submit assignment |
| PUT | `/assignments/grade` | Grade assignment |

### 🧑‍🎓 Enrollments API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/enrollments` | Enroll user in course |
| PUT | `/enrollments/progress` | Update progress |
| GET | `/enrollments/user/:userId` | Get user enrollments |
| GET | `/enrollments/course/:courseId` | Get course enrollments |
| GET | `/certificates/:userId` | Get user certificates |

### 💬 Discussions API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/discussions` | Create discussion |
| GET | `/discussions` | Get all discussions |
| GET | `/discussions/:id` | Get discussion by ID |
| GET | `/discussions/course/:courseId` | Get course discussions |
| POST | `/comments` | Add comment |

### 🔔 Notifications API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | List notifications |
| GET | `/notifications/user/:userId` | Get user notifications |
| GET | `/notifications/user/:userId/unread-count` | Get unread count |
| PUT | `/notifications/:id/read` | Mark as read |
| PUT | `/notifications/user/:userId/read-all` | Mark all as read |
| POST | `/notifications` | Create notification |

### 📜 Audit Logs API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/audit-logs` | Get all audit logs |
| GET | `/audit-logs/user/:userId` | Get user audit logs |
| GET | `/audit-logs/table/:tableName` | Get table audit logs |
| GET | `/audit-logs/stats` | Get audit statistics |

### 🏥 Health Check API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | System health check |
| GET | `/health/db` | Database health check |

## 🐳 Docker Support

### Development with Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: 
      context: .
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=password
      - DB_NAME=lms_db
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=lms_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:
```

### Docker Commands

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs app

# Build Docker image only
docker build -t lms-backend .

# Run container manually
docker run -p 3000:3000 lms-backend
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e

# Debug tests
npm run test:debug
```

### Test Structure

```
src/
├── users/
│   ├── users.controller.spec.ts
│   ├── users.service.spec.ts
│   └── users.module.spec.ts
├── courses/
│   ├── courses.controller.spec.ts
│   └── courses.service.spec.ts
└── ...
```

## 🚀 Deployment

### Production Environment

1. **Environment Variables**
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_USERNAME=your-db-username
DB_PASSWORD=your-secure-password
DB_NAME=lms_production
```

2. **Build for Production**
```bash
npm run build
npm run start:prod
```

3. **Database Migration**
```bash
# Run migrations
npm run migration:run

# Generate migration
npm run migration:generate
```

### Cloud Deployment Options

#### AWS Deployment
- **ECS/Fargate**: Container deployment
- **RDS**: Managed PostgreSQL
- **ALB**: Load balancing
- **CloudFront**: CDN for static assets

#### Digital Ocean
- **App Platform**: Easy deployment
- **Managed Database**: PostgreSQL cluster
- **Load Balancer**: High availability

#### Heroku
```bash
# Deploy to Heroku
heroku create lms-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## 📊 Performance & Monitoring

### Health Monitoring
- **Health checks**: `/api/health` endpoint
- **Database monitoring**: Connection pool status
- **Response time tracking**: API performance metrics

### Logging
- **Structured logging**: JSON format logs
- **Audit trail**: Complete user action history
- **Error tracking**: Comprehensive error logging

### Security Features
- **Input validation**: Request data validation
- **SQL injection prevention**: Parameterized queries
- **XSS protection**: Input sanitization
- **CORS configuration**: Cross-origin security

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
4. **Run tests**
```bash
npm run test
npm run test:e2e
```

5. **Commit your changes**
```bash
git commit -m "feat: add your feature description"
```

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**

### Code Style Guidelines

- **ESLint**: Follow the configured linting rules
- **Prettier**: Use for code formatting
- **TypeScript**: Maintain type safety
- **Documentation**: Comment complex logic

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation update
style: code style change
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS Team**: For the amazing framework
- **TypeORM**: For excellent ORM support
- **PostgreSQL**: For robust database management
- **Community Contributors**: For continuous improvements

## 📞 Support

For support and questions:

- **Email**: support@lms-backend.com
- **Issues**: [GitHub Issues](https://github.com/your-repo/LMS_Nestjs/issues)
- **Documentation**: [API Docs](http://localhost:3000/api/docs)

---

**Built with ❤️ using NestJS, TypeScript, and PostgreSQL**

*This LMS backend provides a solid foundation for building comprehensive educational platforms with modern web technologies.*