import { stdin, stdout } from "process";
import { Socket } from "dgram";
import * as net from "net";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";
import * as URL from "url";
import * as crypto from "crypto";
const fsPromise = fs.promises;

// const onSocketConnect = (socket: net.Socket) => {
//   socket.on("data", (buf: Buffer) => {
//     // const rl = readline.createInterface(process.stdin, process.stdout);
//     // console.log("S", buf.toString());
//     // rl.question("A",(aws=>{
//     //     rl.close()
//     //     console.log("aws",aws)

//     //     // socket.end()
//     //     // socket.end(aws)
//     // }))
//     // console.log(buf.toString())
//     const bufStr=buf.toString()
//     const lines=bufStr.split("\r\n")
//     console.log(lines)
//     if(lines){
//         for(let index in lines){
//             let line=lines[index]
//             if(line.toLowerCase().startsWith('content-type')){
//                 let lineValue=line.split(':')[1]
//                 if(lineValue){
//                     let lineValues=lineValue.split(';')
//                     for(let lineValueIndex in lineValues){
//                         let lineValueItem=lineValues[lineValueIndex]
//                         if(lineValueItem&&lineValueItem.startsWith('boundary=')){
//                             let boundary=lineValueItem.substring('boundary='.length)
//                             let muiltyBodys=bufStr.split('--'+boundary)
//                             if(muiltyBodys){
//                                 muiltyBodys.pop()
//                                 for(let bodyIndex in muiltyBodys){
//                                     console.log(muiltyBodys[bodyIndex])
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     socket.write("HTTP/1.1 200 OK\r\n")
//     socket.write("cache-control:no-store\r\n")
//     socket.write("content-type:text/pain\r\n")
//     socket.write("Access-Control-Allow-Origin:*\r\n")
//     // socket.write("location:https://www.baidu.com\r\n")

//     socket.write("\r\n")
//     socket.write("HAHAHA:aaa")
//     socket.end()
//   });
// };

// const server = net.createServer((socket: net.Socket) => {
//   console.log("--createServer--");
//   onSocketConnect(socket);
// });

// server.listen(3001);

// proxy server
// const server=http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{
//     const opt=url.parse(req.url)
//     if(!opt.host){
//         res.writeHead(200)
//         const readFs=fs.createReadStream("/Users/tongzhiyang/Documents/workspace/Computer-Networking-A-Top-Down-Approach-NOTES-master/计算机网络  自顶向下方法.原书第6版.pdf")
//         readFs.pipe(res)
//         return
//     }
//     req.on('data',(buf:Buffer)=>{
//         console.log('--req--')
//         console.log(buf.toString())
//     })
//     const reqOpt:http.RequestOptions={
//         protocol:opt.protocol,
//         host:opt.host,
//         hostname:opt.hostname,
//         port:opt.port?parseInt(opt.port):80,
//         method: req.method,
//         path:opt.path,
//         headers:req.headers,
//     };
//     console.log(reqOpt)
//     console.log(server.address().valueOf())
//     const pReq=http.request(reqOpt,(pRes: http.IncomingMessage)=>{
//         res.writeHead(pRes.statusCode,pRes.headers)
//         pRes.on('data',(buf:Buffer)=>{
//             console.log('---res---')
//             console.log(buf.toString())
//         })
//         pRes.pipe(res)
//     })
//     req.pipe(pReq)
// })
// server.listen(3333)

// const createConnection = (
//   options: http.ClientRequestArgs,
//   oncreate: (err: Error, socket: net.Socket) => void
// ): net.Socket => {
//   const socket = net.createConnection({ host: "127.0.0.1", port: 1087 }, () => {
//     socket.write("CONNECT www.baidu.com:80 HTTP/1.1\r\n");
//     socket.write("CONNECTION:keep-alive\r\n");
//     socket.write("\r\n");
//   });
//   //   socket.on("error", console.log);
//   socket.on("data", (buf) => {
//     console.log("socket:", buf.toString());
//   });
//   return socket;
// };

// const socket = net.createConnection({ host: "127.0.0.1", port: 1087 }, () => {
//   socket.write("CONNECT www.baidu.com:80 HTTP/1.1\r\n");
//   // socket.write("CONNECTION:keep-alive\r\n");
//   socket.write("\r\n");
// });
// //   socket.on("error", console.log);
// socket.on("data", (buf) => {
//   const str = buf.toString();
//   console.log("socket:", str);
//   if (str.indexOf('Connection established')>0) {
//     socket.write("GET / HTTP/1.1\r\n");
//     // socket.write("host:www.baidu.com:443\r\n");
//     socket.write("\r\n");
//   }
// });

// (async () => {
//   const req = https.request(
//     {
//     //   createConnection,
//     //   protocol: "https:",
//       host: "localhost",
//       port: "1087",
//       path:
//         "baidu.com",
//     },
//     async (res: http.IncomingMessage) => {
//       const fileStat = await isFileExist("./cache");
//       if (fileStat != 2) {
//         await fs.promises.mkdir("./cache").catch(console.log);
//       }
//       const imgFile = fs.createWriteStream("./cache/img.gif");
//       console.log(res.statusCode, res.statusMessage);
//       console.log(res.headers);
//       res.setEncoding("binary");
//       res.on("readable", () => {
//         console.log("readable");
//       });
//       res.on("data", (buf) => {
//         console.log("data", buf.toString());
//       });
//       res.pipe(imgFile);
//     }
//   );
// //   req.on("error", console.log);
//   req.on("response", (res) => console.log(res.headers));
//   req.end();
// })();

// const load = (urlString: string, name: string, dir?: string) => {
//   const url = URL.parse(urlString);
//   const isHttps = url.protocol === "https:";
//   const options = {
//     port: 1087,
//     host: "127.0.0.1",
//     method: "CONNECT",
//     path: `${url.host}:80`,
//   };
//   const req = http.request(options);
//   req.end();
//   req.on(
//     "connect",
//     async (
//       response: http.IncomingMessage,
//       socket: net.Socket,
//       head: Buffer
//     ) => {
//       console.log(
//         "proxy response:",
//         response.statusCode,
//         response.statusMessage
//       );
//       //200 Connection established
//       if (response.statusCode == 200) {
//         socket.write(`GET ${url.path}\r\n`);
//         socket.write(`Host:${url.host}:${isHttps ? "443" : "80"}\r\n`);
//         socket.setEncoding("binary");
//         const parser = new ResponseParser();
//         const fileDir = `./cache/${dir || "default"}`;
//         if ((await isFileExist(fileDir)) != 2) {
//           await fs.promises.mkdir(fileDir, { recursive: true });
//         }
//         const fileWriter = fs.createWriteStream(
//           `./cache/${dir || "default"}/${name}.${resolveFileType(
//             parser.headers,
//             urlString
//           )}`,
//           { encoding: "binary", autoClose: true, emitClose: true }
//         );
//         socket.on("readable", () => {
//           const data = socket.read();
//           if (!parser.needUpdate) {
//             socket.removeListener("readable", console.log);
//             if (data) {
//               fileWriter.write(data, "binary", console.log);
//             }
//             socket.pipe(fileWriter);
//           } else {
//             if (parser.update(data)) {
//               if (parser.leftBody) {
//                 fileWriter.write(parser.leftBody, "binary", console.log);
//               }
//             }
//           }
//         });
//         socket.on("end", () => {
//           console.log("end");
//           socket.end();
//         });
//         socket.write("\r\n");
//       }
//     }
//   );
// };

// load(
//   "https://www.google.com/logos/doodles/2020/farid-al-atrashs-110th-birthday-6753651837108586-2x.jpg",
//   "name",
//   "iamge"
// );

// //0 nodir 1 file 2 dir
// const isFileExist = async (dir: string) => {
//   const exist = fs.existsSync(dir);
//   if (!exist) {
//     return 0;
//   }
//   const fileStat = await fs.promises.stat(dir).catch(console.log);
//   if (!fileStat) {
//     return 0;
//   }
//   return fileStat.isFile() ? 1 : 2;
// };

// class ResponseParser {
//   data = new String();
//   headers = {};
//   leftBody: string;
//   needUpdate = true;
//   constructor() {}

//   parseHeaderAndBody = (splits) => {
//     const headerStr = splits[0];
//     const headerSplits = headerStr.split("\r\n");
//     if (headerSplits && headerSplits.length > 0) {
//       for (let index in headerSplits) {
//         const line = headerSplits[index];
//         const splitIndex = line.indexOf(":");
//         if (splitIndex > 0) {
//           this.headers[
//             (line.substring(0, splitIndex) as string).toLowerCase()
//           ] = line.substring(splitIndex + 1).replace(/(^\s*)|(\s*$)/g, "");
//         }
//       }
//     }
//     this.leftBody = this.data.substring(headerStr.length + "\r\n\r\n".length);
//   };

//   update = (buf: any) => {
//     this.data = this.data.concat(buf);
//     // console.log("data:",this.data);
//     const splits = this.data.split("\r\n\r\n");
//     // console.log(splits)
//     if (splits && splits.length >= 2) {
//       this.needUpdate = false;
//       this.parseHeaderAndBody(splits);
//       return true;
//     }
//     return false;
//   };
// }

// const resolveFileType = (headers, url: string) => {
//   if (headers) {
//     const contentType = headers["content-type"];
//     if (contentType) {
//       const splts = contentType.split("/");
//       if (splts && splts.length == 2) {
//         const typeInServer = splts[1];
//         if (typeInServer != "*") {
//           return typeInServer;
//         }
//       }
//     }
//   }

//   if (url) {
//     return url.substring(url.lastIndexOf(".") + 1) || undefined;
//   }
// };

const load = () => {
  // https://www.google.com/logos/doodles/2020/chile-national-plebiscite-2020-6753651837108742.2-2x.png
  const url = URL.parse(
    "https://kdxbtrj.deqfzhjekpdx.hath.network:6789/h/b666e27894daa532da04785c14606b21dcd1e09a-206025-748-1080-jpg/keystamp=1603714200-410875e597;fileindex=85786487;xres=org/003.jpg"
  );
  const options = {
    port: 1087,
    host: "127.0.0.1",
    method: "CONNECT",
    path: "kdxbtrj.deqfzhjekpdx.hath.network:80",
  };
  console.log(options);
  const req = http.request(options);
  req.end();
  req.on(
    "connect",
    async (
      response: http.IncomingMessage,
      socket: net.Socket,
      head: Buffer
    ) => {
      console.log(
        "proxy response:",
        response.statusCode,
        response.statusMessage
      );
      //200 Connection established
      if (response.statusCode == 200) {
        socket.write(
          `OPTION /h/b666e27894daa532da04785c14606b21dcd1e09a-206025-748-1080-jpg/keystamp=1603714200-410875e597;fileindex=85786487;xres=org/003.jpg HTTP/1.0\r\n`
        );
        socket.write(`Host:kdxbtrj.deqfzhjekpdx.hath.network:6789\r\n`);
        // socket.write(`Accept-Encoding: gzip, deflate, br\r\n`);
        // socket.write(`Connection: keep-alive\r\n`);
        // socket.write(
        //   `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\r\n`
        // );
        // socket.write(
        //   `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\n`
        // );

        socket.write("Connection: Keep-Alive\r\n");
        socket.setEncoding("binary");
        socket.on("readable", () => {
          console.log(socket.read());
        });
        socket.on('timeout',console.log)
        socket.on('connect',console.log)
        socket.on('lookup',console.log)
        socket.on("error", console.log);
        socket.write("\r\n");
      }
    }
  );
};

load();
