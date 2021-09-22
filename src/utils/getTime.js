const getTrueTime = (time) => {
    let date1 = new Date(time * 1000 - 28800000);
    let y = date1.getFullYear();
    let m = date1.getMonth() + 1;
    let d = date1.getDate();
    let h = date1.getHours();
    let min = date1.getMinutes();
    let s = date1.getSeconds();
    m <= 9 ? (m = "0" + m) : m;
    d <= 9 ? (d = "0" + d) : d;
    h <= 9 ? (h = "0" + h) : h;
    min <= 9 ? (min = "0" + min) : min;
    s <= 9 ? (s = "0" + s) : s;
    return y + "-" + m + "-" + d + " ";
}
export default getTrueTime

// export default {
//     getTrueTime(time) {
//         let date1 = new Date(time * 1000 - 28800000);
//         let y = date1.getFullYear();
//         let m = date1.getMonth() + 1;
//         let d = date1.getDate();
//         let h = date1.getHours();
//         let min = date1.getMinutes();
//         let s = date1.getSeconds();
//         m <= 9 ? (m = "0" + m) : m;
//         d <= 9 ? (d = "0" + d) : d;
//         h <= 9 ? (h = "0" + h) : h;
//         min <= 9 ? (min = "0" + min) : min;
//         s <= 9 ? (s = "0" + s) : s;
//         return y + "-" + m + "-" + d + " ";
//     },
//     filter(value, type) {
//         value = (value + "").replace(/(^\s*)|(\s*$)/g, ""); // 先去除前后空格，排除都是空格的情况
//         switch (type) {
//             case "number":
//                 value = value || value === 0 ? Number(value) : "";
//                 break;
//         }
//         return value;
//     }
// }