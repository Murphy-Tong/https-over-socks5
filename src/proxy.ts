import * as fs from "fs";
import * as http from "http";
import * as net from "net";
import * as URL from "url";
import * as crypto from "crypto";

const fsPromise = fs.promises;

const establishedSockets = {};

const downloadWithSocket = async (
  socket: net.Socket,
  urlString: string,
  name: string,
  dir?: string
) => {
  const url = URL.parse(urlString);
  const isHttps = url.protocol === "https:";
  socket.write(`GET ${url.pathname}\r\n`);
  socket.write(`Host:${url.hostname}:${url.port||(isHttps?443:80)}\r\n`);
  socket.write(`Accept-Encoding: gzip, deflate, br\r\n`);
  socket.write(`Connection: keep-alive\r\n`);
  socket.write(`User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\r\n`);
  socket.write(`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\n`);
  console.log(`GET ${url.pathname}\r\n`)
  console.log(`Host:${url.hostname}:${url.port||(isHttps?443:80)}\r\n`)
  socket.write("Connection: Keep-Alive\r\n");
  socket.setEncoding("binary");
  const parser = new ResponseParser();
  const fileDir = `./cache/${dir || "default"}`;
  if ((await isFileExist(fileDir)) != 2) {
    await fs.promises.mkdir(fileDir, { recursive: true });
  }
  let fileWriter = null;
  socket.on("readable", () => {
    const data = socket.read();
    console.log(data)
    if (!parser.needUpdate) {
      socket.removeListener("readable", console.log);
      if (data) {
        fileWriter.write(data, "binary", console.log);
      }
      socket.pipe(fileWriter);
    } else {
      if (parser.update(data)) {
        console.log(parser.headers);
        fileWriter = fs.createWriteStream(
          `./cache/${dir || "default"}/${name}.${resolveFileType(
            parser.headers,
            urlString
          )}`,
          { encoding: "binary", autoClose: true, emitClose: true }
        );
        if (parser.leftBody) {
          fileWriter.write(parser.leftBody, "binary", console.log);
        }
      }
    }
  });
  socket.write("\r\n");
};

const load = (urlString: string, name: string, dir: string) => {
  const url = URL.parse(urlString);
  const socketKey = `${url.protocol}${url.host}${url.port}`;
  const establishedSocket: net.Socket | null = establishedSockets[socketKey];
  if (establishedSocket) {
    if (establishedSocket.destroyed) {
      console.log("downloadWithSocket destroyed:", socketKey);
      establishedSockets[socketKey] = null;
    } else {
      console.log("downloadWithSocket:", socketKey);
      downloadWithSocket(establishedSocket, urlString, name, dir);
    }
  }
  const isHttps = url.protocol === "https:";
  const options = {
    port: 1087,
    host: "127.0.0.1",
    method: "CONNECT",
    path: `${url.hostname}:${80}`,
  };
  console.log(options)
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
        socket.on("end", () => {
          console.log("end");
          // socket.end();
        });
        socket.on('error',console.log)
        socket.on('data',buf=>console.log(buf.toString()))
        socket.on("close", () => {
          console.log("close");
          establishedSockets[`${url.protocol}${url.host}${url.port}`] = null;
        });
        establishedSockets[`${url.protocol}${url.host}${url.port}`] = socket;
        downloadWithSocket(socket, urlString, name, dir);
      }
    }
  );
};

load("https://kdxbtrj.deqfzhjekpdx.hath.network:6789/h/b666e27894daa532da04785c14606b21dcd1e09a-206025-748-1080-jpg/keystamp=1603714200-410875e597;fileindex=85786487;xres=org/003.jpg", "name", "iamge");

//0 nodir 1 file 2 dir
const isFileExist = async (dir: string) => {
  const exist = fs.existsSync(dir);
  if (!exist) {
    return 0;
  }
  const fileStat = await fs.promises.stat(dir).catch(console.log);
  if (!fileStat) {
    return 0;
  }
  return fileStat.isFile() ? 1 : 2;
};

class ResponseParser {
  data = new String();
  headers = {};
  leftBody: string;
  needUpdate = true;
  constructor() {}

  parseHeaderAndBody = (splits) => {
    const headerStr = splits[0];
    const headerSplits = headerStr.split("\r\n");
    if (headerSplits && headerSplits.length > 0) {
      for (let index in headerSplits) {
        const line = headerSplits[index];
        const splitIndex = line.indexOf(":");
        if (splitIndex > 0) {
          this.headers[
            (line.substring(0, splitIndex) as string).toLowerCase()
          ] = line.substring(splitIndex + 1).replace(/(^\s*)|(\s*$)/g, "");
        }
      }
    }
    this.leftBody = this.data.substring(headerStr.length + "\r\n\r\n".length);
  };

  update = (buf: any) => {
    this.data = this.data.concat(buf);
    const splits = this.data.split("\r\n\r\n");
    if (splits && splits.length >= 2) {
      this.needUpdate = false;
      this.parseHeaderAndBody(splits);
      return true;
    }
    return false;
  };
}

const resolveFileType = (headers, url: string) => {
  if (headers) {
    const contentTypeStr: string = headers["content-type"];
    if (contentTypeStr) {
      const matches = contentTypeStr.match(/\w*\/[(\w)(\*)]*/);
      if (matches && matches.length > 0) {
        const contentType = matches[0];
        if (contentType) {
          const splts = contentType.split("/");
          if (splts && splts.length == 2) {
            const typeInServer = splts[1];
            if (typeInServer != "*") {
              return typeInServer;
            }
          }
        }
      }
    }
  }

  if (url) {
    return url.substring(url.lastIndexOf(".") + 1) || undefined;
  }
};
