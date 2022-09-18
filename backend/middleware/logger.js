// https://codesource.io/creating-a-logging-middleware-in-expressjs/


const getRequestDurationMilliseconds = start => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0]*NS_PER_SEC+diff[1])/NS_TO_MS
}

let logger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date = 
    current_datetime.getFullYear() +
    "-"+
    (current_datetime.getMonth()+1)+
    "-"+
    current_datetime.getDate()+
    " "+
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes()+
    ":"+
    current_datetime.getSeconds();

    let method = req.method;
    let url = req.url;
    const start = process.hrtime();
    const durationInMilliseconds = getRequestDurationMilliseconds();
    res.on('finish',function() {
        let log = `[${formatted_date}] ${method}:${url} STATUS: [${this.statusCode}]  duration: ${durationInMilliseconds.toLocaleString()} ms`;
    
        console.log(log);
    })

    next();
}

module.exports = logger;