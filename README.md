# Classroom
CS 130 Project.

## Getting Started
Installing dependencies
```
git clone https://github.com/yifei-fu/classroom.git
cd classroom/backend
npm i
```
Running development server
```
cd backend
npm run dev
```

## Todo
* [ ] Name
* [ ] [SRS](https://docs.google.com/document/d/1ZrXsY_le5oime8KeewqWVokLBwkKAcA4H4CdF8Wg2PU/edit?usp=sharing)
* [ ] API documentation with swagger
* [ ] Set up backend dependencies and file structure
  * [x] server.ts
  * [ ] persistence with MongoDB and TypeORM
  * [ ] API endpoints
* [ ] Set up frontend dependencies and file structures
  * [ ] create-react-app with TypeScript
  * [ ] Add a UI component library
* [ ] Files for development
  * [ ] Vagrant
  * [ ] Docker Compose file for development
* [ ] Backend
  * [ ] Models
  * [ ] Controllers
  * [ ] API endpoints
  * [ ] Job queue for sending notification
  * [ ] WebSocket API endpoints for listening to quiz results
* [ ] Frontend
  * [ ] Welcome view
  * [ ] Sign in/up view
  * [ ] Homescreen view (displays all classes, button to create a new class)
  * [ ] New class view
  * [ ] Joining a class view
  * [ ] Class view
  * [ ] Quiz view
  * [ ] Create a quiz view
  * [ ] Posts list view
  * [ ] Post Detail view (view and publish comments)
  * [ ] PWA config
  * [ ] WebWorker for receiving notifications
* [ ] Deployment
  * [ ] Dockerfile
  * [ ] Docker Compose file for deployment (replicas)
  * [ ] Nginx config for load balancing
  * [ ] Deploy backend to EC2
  * [ ] Deploy frontend to GitHub Pages
