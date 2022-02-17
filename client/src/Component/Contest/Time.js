function secondToHumanReadable(sec) {
    let seconds = (sec / 1).toFixed(1);
    let minutes = (sec / (60)).toFixed(1);
    let hours = (sec / (60 * 60)).toFixed(1);
    let days = (sec / (60 * 60 * 24)).toFixed(1);
    let years = (sec / (60 * 60 * 24 * 365)).toFixed(1);

    if (seconds < 60) {
        return `${seconds} Sec`;
    } else if (minutes < 60) {
        return `${minutes} Min`;
    } else if (hours < 24) {
        return `${hours} Hrs`;
    } else if (days < 365) {
        return `${days} Day`;
    } else {
        return `${years} Yrs`;
    }
}

function dateToHumanReadable(date) {
    date = new Date(date);

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;

    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    let hour = date.getHours();
    hour = hour < 10 ? `0${hour}` : hour;

    let minute = date.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;

    return `${day}-${month}-${year} at ${hour}:${minute}`;
}

function getCalendarLink(data) {
    const normalizeDate = (date) => { return date.split('-').join('').split(':').join('').split('.').join(''); };
    const stime = normalizeDate(data.start_time);
    const etime = normalizeDate(data.end_time);

    let res = 'https://calendar.google.com/event?action=TEMPLATE';
    res += `&dates=${stime}/${etime}`;
    res += `&text=${encodeURIComponent(data.name)}`;
    res += `&location=${data.url}`;
    return res;
  }

export {dateToHumanReadable,secondToHumanReadable,getCalendarLink} ;