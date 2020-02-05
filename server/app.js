const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csp = require('express-csp-header');
const session = require('express-session');


const app = express();

app.use(csp({
    policies: {
        'default-src': [csp.NONE],
        'img-src': [csp.SELF],
    }
}));

app.use(bodyParser.json());
app.use(cors());
app.use(session({secret: 'okmokmokm',
                 resave: true,
                 saveUninitialized: true,
                 cookie: {
                    maxAge: 24 * 60 * 60 * 1000
                  }
                }));

const courses = require('./routes/api/courses');
const users = require('./routes/api/users')

app.use('/api/courses', courses);
app.use('/api/users', users);

const port = process.env.PORT || 3200;



app.listen(port, () => console.log(`Server on port ${port}`));
