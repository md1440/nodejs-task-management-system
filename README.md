## Info

- requires a local mongodb instance for dev: docker run --name mongodb -p 27017:27017 -d mongo
- .env file has been checked-in for your convenience for the coding-challenge feedback
- the included docker-compose is for production, container deployed on heroku with mongo atlas cloud db
- postman.collections are provided, with global variables and tests for a smooth experience, requires a postman environment for updating the vars after api calls
- Api documentation available: https://rest-api-task-mgt.herokuapp.com/docs/ 
  -> for dev: http://localhost:3000/docs/
- Metrics server running on http://localhost:7777/metrics (dev only due to heroku randomly generating port, not possible to expose 2 ports via to app instances)
- node v17.8.0
