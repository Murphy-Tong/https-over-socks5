import * as https from "https";
import * as ProxySocket from "../lib/index";

const HOST = "www.google.com";
const PORT = 443;
const PATH = "/";
const PROXY_HOST = "127.0.0.1";
const PROXY_PORT = 1086;

const req = https.request(
  {
    host: HOST,
    path: PATH,
    port: PORT,
    createConnection: (opt, oncreate) => {
      ProxySocket.createConnection(
        {
          proxyHost: PROXY_HOST,
          proxyPort: PROXY_PORT,
          port: PORT,
          host: HOST,
          https: true,
        },
        oncreate
      );
      return null;
    },
  },
  (res) => {
    console.log(res.headers);
    console.log(res.statusCode);
    console.log(res.statusMessage);
    res.on("data", (buf) => {
      console.log(buf.toString("utf-8"));
    });
  }
);
req.end();
