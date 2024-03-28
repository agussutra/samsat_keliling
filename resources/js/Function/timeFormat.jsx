export function timeFormat(time) {
    return moment(time, "HH:mm:ss").format("h:mm A");
}