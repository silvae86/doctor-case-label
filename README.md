# Doctor Case Label



A simple app for doctors to label medical cases with a specific condition.

## Technology stack used

- NodeJS v10
- Loopback 4 Framework
- Express 4
- jQuery 3.5.1
- MongoDB 3.6.0

## Install and run "in the metal"

```bash
# install NodeJS 10 (I suggest using NVM)
git clone https://github.com/silvae86/doctor-case-label.git
cd doctor-case-label
# to start MongoDB container in Docker (alternatively, run MongoDB 3.6 on 127.0.0.1:27019)
docker-compose up mongodb 
npm install
node .
```

## Build and run using Docker Compose

```bash
git clone https://github.com/silvae86/doctor-case-label.git
cd doctor-case-label
docker-compose build && docker-compose up
```

## Usage

- For the UI, Access your browser at `http://127.0.0.1:3000`

- After authenticating:
    - For the API spec (OpenAPI 3.0), access your browser at `http://127.0.0.1:3000/api/explorer`
    - For the api.json file (OpenAPI 3.0), , access your browser at `http://127.0.0.1:3000/api/explorer`
    
- Code-related tasks
    - `npm run test` (only tests the creation of the main page 😱, just to demonstrate integration with `mocha`)
    - `npm run lint:fix` (lint and fix code automatically using `eslint`)
## Demo Credentials

- Doctor João Silva
    - Username: joao
    - Password: joaopassword
    
- Doctor Joe Smith
    - Username: joe
    - Password: joepassword 


