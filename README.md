# Doctor Case Label

<img src="https://raw.githubusercontent.com/silvae86/doctor-case-label/master/public/images/doctor-case-label-ui.png?token=AATJSEYM2DTKXBQ7E4NPUGS7GQGIM" alt="doctor-case-label-ui" style="width:100%;"/>

A simple app for doctors to label medical cases with a specific condition.

## Technology stack used

- NodeJS v10
- IBM Loopback 4
- Express 4
- jQuery 3.5.1
- MongoDB 3.6.0

## Install and run "in the metal"

```bash
# install NodeJS 10 (I suggest using NVM)
nvm install 10
nvm use 10
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
- The demo is created on first startup, using migrations. 
    - To re-create everything, press the red button at the bottom of the labeling UI.
    
- Code-related tasks
    - `npm run test` 
        - Only tests the creation of the main page 😱
        - Demonstrates integration with `mocha` 
        - Demonstrates code quality enforcement, as tests do not pass if the lint operation returns any error.
    - `npm run lint:fix`
        - Checks for code standard consistency and fixes code automatically using `eslint` whenever possible.
## Demo Credentials

- Doctor João Silva
    - Username: joao
    - Password: joaopassword
    
- Doctor Joe Smith
    - Username: joe
    - Password: joepassword 

## License (The 3-Clause BSD License)

Copyright 2020 João Rocha da Silva

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
