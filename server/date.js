function getISTDate() {
    const now = new Date();

    // Format the date in IST as string
    const indiaTimeString = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Parse the IST string back into date and time components
    const [datePart, timePart] = indiaTimeString.split(", ");
    const [day, month, year] = datePart.split("/");
    const [time, apm] = timePart.trim().split(" ");
    let [hours, minutes, seconds] = time.split(":");

    // Convert to 24-hour format if needed
    if (apm.toLowerCase() === "pm" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (apm.toLowerCase() === "am" && hours === "12") hours = 0;

    // Create a Date object in UTC adjusted for IST
    const indiaTimeDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

    return indiaTimeDate;
}


module.exports = getISTDate;
