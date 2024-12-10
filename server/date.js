
// function getISTDate() {
//     return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
// }

function getISTDate() {
    // Convert current UTC time to IST
    const now = new Date();
    return now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

// function getISTDate() {
//     const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//     const now = new Date();
//     console.log(now.getTime() + istOffset - now.getTimezoneOffset() * 60 * 1000);
//     return new Date(now.getTime() + istOffset - now.getTimezoneOffset() * 60 * 1000);
// }


module.exports = getISTDate;