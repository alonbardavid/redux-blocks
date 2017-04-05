
export function formatToMonth(isoDate){
    return isoDate.substr(0,10);
}
export function formatToRoundedHour(isoDate){
    return isoDate.substr(11,3) + "00";
}
export function formatToHourMinute(isoDate){
    return isoDate.substr(11,5);
}