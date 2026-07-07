# AI-Powered Innovation Challenge and Intelligent Idea Evaluation Platform

A comprehensive platform for managing innovation challenges, submitting project ideas, and evaluating them using AI-powered feedback.

## Architecture

The platform consists of three main components:

- **Backend**: Spring Boot (Java 21) REST API with MySQL database
- **AI Agent**: Node.js Express service for AI-powered evaluations using OpenAI API
- **Frontend**: React application with Vite, TailwindCSS, and modern UI components

## Features

- **User Management**: Role-based authentication (Student, Faculty, Admin)
- **Challenge Management**: Create and manage innovation challenges
- **Idea Submission**: Structured submission forms for project ideas
- **AI Evaluation**: Automated evaluation of ideas based on multiple criteria
- **AI Improvement**: Suggestions for improving project ideas
- **Similarity Checker**: Compare ideas for semantic similarity
- **AI Chatbot**: Interactive assistant for project guidance
- **Leaderboard**: Track top-performing ideas
- **Analytics**: Dashboard for platform insights

## Prerequisites

- Docker and Docker Compose
- OpenAI API Key (for AI features)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Powered-Innovation-Challenge-Platform
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8080
   - AI Agent: http://localhost:3001
   - MySQL: localhost:3306

## Development Setup

### Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### AI Agent (Node.js)

```bash
cd ai-agent
npm install
npm run dev
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

## Database Schema

The database schema is automatically initialized from `database/schema.sql` when the MySQL container starts.

## API Documentation

### Authentication Endpoints
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- GET `/api/auth/me` - Get current user

### Idea Endpoints
- POST `/api/ideas` - Create new idea
- GET `/api/ideas/{id}` - Get idea by ID
- GET `/api/ideas/my-ideas` - Get current user's ideas
- PUT `/api/ideas/{id}` - Update idea
- DELETE `/api/ideas/{id}` - Delete idea

### AI Endpoints
- POST `/api/ai/evaluate` - Evaluate idea with AI
- POST `/api/ai/improve` - Get improvement suggestions
- POST `/api/ai/similarity` - Check similarity between ideas
- POST `/api/ai/chatbot` - Chat with AI assistant

## Docker Services

- **mysql**: MySQL 8.0 database
- **backend**: Spring Boot application (port 8080)
- **frontend**: React application with nginx (port 80)
- **ai-agent**: Node.js AI service (port 3001)

## Security Notes

- Change the JWT secret in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting for API endpoints

## License

This project is licensed under the MIT License.
