# Doctor Case Label



A simple app for doctors to label medical cases with a specific condition.

## Technology stack used

- NodeJS v10
- Loopback 4 Framework
- Express 4
- jQuery

## Install and run "in the metal"

```bash
git clone https://github.com/silvae86/doctor-case-label.git
cd doctor-case-label
docker-compose start mongo # to start MongoDB container (or run MongoDB 3.6 on 127.0.0.1:27019)
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
    
## Demo Credentials

- Doctor João Silva
    - Username: joao
    - Password: joaopassword
    
- Doctor Joe Smith
    - Username: joe
    - Password: joepassword 


