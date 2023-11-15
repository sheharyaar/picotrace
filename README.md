# To run the app

- Make sure you are using React 18
- Run a mqtt broker with ws support on port 8884, in your mqtt broker config file add the following lines and restart the broker. This will configure the broker to listen on port 8884 for websocket connections.
```config
listener 1883
allow_anonymous true

listener 8884
protocol websockets
allow_anonymous true
```
- Run `npm install` to install all the dependencies
- Run `npm run start` to start the app
