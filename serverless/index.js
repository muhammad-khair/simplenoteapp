const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

functions.http('simplenoteserverless', (req, res) => {  
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).json();
    }

    let asianRates = [
        "BDT", "BND", "CNH", "CNY", "HKD",
        "IDR", "INR", "JPY", "KHR", "KPW",
        "KRW", "LKR", "MMK", "MYR", "NPR",
        "PHP", "SGD", "THB", "TWD",
    ];

    axios.get("https://api.exchangerate.host/latest?base=SGD")
    .then(response => {
        Object.filter = (obj, predicate) => {
            return Object.fromEntries(Object.entries(obj).filter(predicate))
        };
        let filteredRates = Object.filter(
            response.data.rates,
            ([r, v]) => asianRates.includes(r)
        );
        return res.json({
            rates: filteredRates
        });
    })
    .catch(error => {
        console.log(error);
        return res.statusCode(500).json();
    });
});
