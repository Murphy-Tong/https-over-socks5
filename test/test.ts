// new Promise((resolve, reject) => {
//   resolve("1");
//   resolve("2");
//   resolve("3");
// })
//   .catch(console.log)
//   .then((res) => {
//     console.log("fun1 ", res);
//     return Promise.reject(3);
//   }, console.log)
//   .then((res) => {
//     console.log("fun2 ", res);
//     return Promise.reject(3);
//   })
//   .then((res) => console.log("fun3 ", res))
//   .catch(console.log);
// const process = require("process");

import * as http from "http";
import * as https from "https";
import * as Axios from "axios";
// Axios.default
//   .get("https://www.baidu.com", {
//     proxy: { host: "localhost", port: 1086, protocol: "https:" },
//   })
//   .then((res) => console.log(res.headers))
//   .catch(console.log);

// https
//   .request("https://www.google.com", (res) => {
//     console.log(res.headers);
//   })
//   .on("error", console.log)
//   .end();
http.get(
  "http://souche-devqa.oss-cn-hangzhou.aliyuncs.com/FAIL20201028140118.xls?Expires=1604287952&OSSAccessKeyId=STS.NTjrJHCnGvNjfufRwk418FJFv&Signature=UoRBgb5sqJUiTQYt%2Bg9KLFlLgU4%3D&security-token=CAIS4wJ1q6Ft5B2yfSjIr5ffOfD8rrFmwYyBZFPXtnc%2BOL4UqY%2FtlDz2IHlLdHFtCe8ZsPk%2BnGxS6PcSlqNyTpZKSFfYatF9tnOKa9MRJdivgde8yJBZolXMewHKeeySvqL7Z%2BH%2BU6mqGJOEYEzFkSle2KbzcS7YMXWuLZyOj%2BwIDLkQRRLqL0BeZrFsKxBltdUROFbIKP%2BpKWSKuGfLC1dysQcOtQEN4K%2BkkMqH8Uic3h%2Bo0egIrIT8Z5SpcdBle9UdId6%2Bx75xbbGTknwSuQNN6ax2gelI9Cnet5bfYStY6A7UNPHPoJ89bl1iYbUxG6MBoPXijPQ%2F%2BM6rztuskEkTY7sID3qEGdj6nvGpQr35aowLEp%2FgIGnI39y1MZ34jhgpe3pzNnkRIoVxciIgVkNyF2CCdvX5qQDQKRykVqOF3eQ63IRsxhDz4cGDP0CUX66Q1SIAIJ4ibkclOBMNzZZZ9grwgO4nGoABRQZ%2Fz1oEP%2FLZIOF04MK2MICAnR0qMqdiwNZhM9IyzUNBHbUl6NxrRX6xZct5%2BhDomyep3rZQk45a9wOB2YRPVOUftiL8X9joY229aQrslRjQUoVDyywePU2FoNIWQd9R0sK7asaHPHs%2BPd6AEravuhqf8T1dDr015Ac1vHk%2FwQI%3D",
  (res) => {
    console.log(res.headers);
    res.on("data", (buf: Buffer) => {
      console.log(buf.toString("ascii"));
    });
  }
);
