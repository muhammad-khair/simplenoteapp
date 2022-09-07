const functions = require('@google-cloud/functions-framework');

functions.http('simplenoteserverless', (req, res) => {  
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');
    }
    
    return res.send('Hello World!');
});
