const jsonServer = require('json-server')
const auth = require('json-server-auth')

const rules = auth.rewriter({
    // Permission rules
    users: 600,
    grades: 400
})

const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the middlewares in the following order
app.use(rules)
app.use(auth)

// Middleware to filter grades based on logged-in user
app.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/grades') {
        if (!req.claims || !req.claims.sub) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log(`Logged in user: ${JSON.stringify(req.claims)}`);

        const userId = Number(req.claims.sub);
        const grades = app.db
            .get('grades')
            .filter({ userId })
            .value();

        return res.json(grades);
    }
    next();
});

app.use(router)

app.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});