const monthArray = [
    "Jan", "Feb", "Mar",
    "Apr", "Mei", "Jun",
    "Jul", "Ags", "Sep",
    "Okt", "Nov", "Des",
]

export function formatDate(createdAt) {
    var t = createdAt.split(/[- :]/);
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    var convertedDate = new Date(d);

    const createdDate = new Date(convertedDate);
    const date = createdDate.getDate();
    const monthIndex = createdDate.getMonth();
    const month = monthArray[monthIndex];
    const year = createdDate.getFullYear();
    const hour = createdDate.getHours();
    let minute = createdDate.getMinutes();
    if (Number(minute) < 10) {
        minute = '0' + minute;
    }
    const dateString = `${date} ${month} ${year} ${hour}:${minute} WIB`;
    return dateString;
}