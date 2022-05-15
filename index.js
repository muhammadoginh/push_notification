const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const publicVapidKeys = 'BL0fGj1E6jenCMrGveDfuA-_xACla-rA5XKnb8xvaoCGYLyl03QX2Mrl5nr_mccMR1e3yj2kLDkeA-1GVMckEZE';
const privateVapidKey = 'x6hP2-9gBb0jNTSGSY2iZK6AbyQ_y8MHraXEkw-pZBo';