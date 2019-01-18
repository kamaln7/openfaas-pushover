"use strict"

const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const readSecret = secret =>
    process.env[`secret_${secret.replace(/-/g, '_')}`] || fs.readFileSync(`/var/openfaas/secrets/${path.basename(secret)}`, 'utf8')

const user = readSecret('pushover-user');
const token = readSecret('pushover-token');
const fnPassword = readSecret('pushover-fn-password');

const Pushover = require('pushover-notifications');
const p = new Pushover({
    user,
    token,
});

module.exports = (context, callback) => {
    if (fnPassword) {
        const qs = querystring.parse(process.env.Http_Query);
        if (qs.password != fnPassword) {
            callback('unauthenticated', undefined);
            return
        }
    }

    let message;
    try {
        const input = JSON.parse(context); 

        message = {
            message: input.message || 'No message',
            title: input.title,
            url: input.url,
            url_title: input.url_title,
        };
    } catch(err) {
        message = {
            message: context,
        };
    }

    p.send(message, (err, result) => {
        if (err) {
            callback(err, undefined);
            return;
        }

        callback(undefined, result);
    });
}
