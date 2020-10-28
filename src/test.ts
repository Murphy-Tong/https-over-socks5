// import { Socket } from 'dgram';
import https = require("https");
import ProxySocket from "./proxySocket";
// const ProxySocket=require('./proxySocket')
// const Net = require("net");
// const tls = require("tls");
// // const server = Net.createServer((socket) => {
// //   console.log("on connect", socket.remoteAddress, ";", socket.remotePort);
// //   socket.on("error", console.log);
// //   socket.once("data", (buf) => {
// //     if (buf) {
// //       console.log(buf);
// //       socket.once('data',buf2=>{
// //         console.log(buf2)
// //         buf2[1]=0x00
// //         console.log("write", socket.write(buf2));
// //         socket.once('data',buf3=>{
// //           console.log(buf3.toString('utf-8'))
// //         })
// //       })
// //       console.log("write", socket.write(Buffer.from([5, 0])));
// //     }
// //   });
// // });

// // server.listen(3000);
// // const HOST = "kffesdq.heqxwtwstwqp.hath.network";
// // const PORT = 49890;
// // const PATH='/h/6489d519633c7bc66727dffc1be4ab2204e81f22-266858-1280-1703-jpg/keystamp=1603786500-8b02468a0b;fileindex=85804414;xres=1280/scan0000a.jpg'
const HOST = "www.baidu.com";
const PORT = 443;
const PATH = "/";

// const socket = Net.createConnection({
//   host: "127.0.0.1",
//   port: 1086,
// });
// socket.on("error", (err) => console.log(err.toString("utf-8")));

// const sendRequest = (socket) => {
//   socket.on("data", (buf) => {
//     try {
//       console.log(buf);
//     } catch (e) {
//       console.log(e);
//     }
//   });
//   const req = https.request(
//     {
//       host: HOST,
//       path: PATH,
//       port: PORT,
//       createConnection: (opt, oncreate) => {
//         return new tls.TLSSocket(socket, );
//       },
//     },
//     (res) => {
//       console.log(res.headers);
//       console.log(res.statusCode);
//       console.log(res.statusMessage);
//       res.on("data", (buf) => {
//         console.log(buf.toString("utf-8"));
//         socket.end();
//       });
//     }
//   );
//   req.end();
// };
// const sendCommand = (socket) => {
//   const hostBuf = Buffer.from(HOST, "utf-8");
//   let cmdBuf = Buffer.from([0x05, 0x01, 0x00, 0x03, hostBuf.length]);
//   const port = new Uint16Array(1);
//   port[0] = PORT;

//   cmdBuf = Buffer.concat([cmdBuf, hostBuf, Buffer.from(port.buffer).reverse()]);
//   console.log(cmdBuf);
//   socket.write(cmdBuf);
//   socket.once("data", (buf) => {
//     console.log(buf);
//     if (buf[1] == 0) {
//       sendRequest(socket);
//     } else {
//       console.log("err", buf);
//       socket.end();
//     }
//   });
// };
// const sendHello = (socket) => {
//   socket.write(Buffer.from([5, 1, 0]));
//   socket.once("data", (buf) => {
//     if (buf[1] == 0) {
//       sendCommand(socket);
//     } else {
//       console.log("err", buf);
//       socket.end();
//     }
//   });
// };

// socket.on("connect", (err) => {
//   console.log("connect");
//   sendHello(socket);
// });

new ProxySocket(
  {
    proxyHost: "127.0.0.1",
    proxyPort: 1086,
    https: true,
    port: PORT,
    host: HOST,
  },
  (err, socket) => {
    const req = https.request(
      {
        host: HOST,
        path: PATH,
        port: PORT,
        createConnection: (opt, oncreate) => {
          return socket;
        },
      },
      (res) => {
        console.log(res.headers);
        console.log(res.statusCode);
        console.log(res.statusMessage);
        res.on("data", (buf) => {
          console.log(buf.toString("utf-8"));
          // socket.end();
        });
      }
    );
    req.end();
  }
);
