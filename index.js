const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname, "client")))

// add bodyparser middle ware
app.use(bodyParser.json());

const publicVapidKeys = 'BL0fGj1E6jenCMrGveDfuA-_xACla-rA5XKnb8xvaoCGYLyl03QX2Mrl5nr_mccMR1e3yj2kLDkeA-1GVMckEZE';
const privateVapidKey = 'x6hP2-9gBb0jNTSGSY2iZK6AbyQ_y8MHraXEkw-pZBo';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKeys, privateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
    // get pushSubscription object
    const subscription = req.body;

    // sent 201 - resource created
    res.status(201).json({});

    // create payload
    const payload = JSON.stringify({ title: 'Smart Biogas'});

    // pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));