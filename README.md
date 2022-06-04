# Secret Santa Picker

- Micro-services architecture
- Node (ExpressJS)

## How to use

- #### Step 1
    `npm install`
- #### Step 2
    
    Start the api gateway with: `npm start`
    Start the santas service with: `npm run service-santas`

- #### Final step

    POST request this url `http://localhost:3000/santas` and provide in the body a configurations like below.

## Configurations

| Key | Values |
| -------- | -------- |
| rules | Object that can take 3 parameters **(see below)** |
| users | An array of object with all the participants : `[{id: 1}, {id: 46}, ...]` |

## Rules parameters

| Key | Values |
| -------- | -------- |
| UNAUTHORIZED_PAIR | An array of object that will define participant who wont be able to be the santa of a particular one : `[{userId: 1, ofUserId: 1}, ...]` |
| MIN_PLAYERS | A number that define the minimum of players that can participate to the secret santa |
| MAX_PLAYERS | A number that define the maximum of players that can participate to the secret santa |

## Ports used

API Gateway: **3000**
Santas Service: **3002** 