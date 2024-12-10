function getISTDate() {
    // Convert current UTC time to IST
    const now = new Date();
    return now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

module.exports = getISTDate;