const app = require('./config/server');

app.listen(process.env.PORT || 3000, () => {
    console.log(`The app is listening on the port 3000`);
});

module.exports = app;