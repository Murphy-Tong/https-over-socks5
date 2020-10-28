import * as Net from "net";
import * as tls from "tls";
import * as https from "https";

export type Option = {
  proxyHost: string;
  proxyPort: number;
  host: string;
  port: number;
  https?: boolean;
};

export type ConnectCallback = (err: Error, socket: Net.Socket) => void;

const defaultCallback = (err: Error, _: Net.Socket) => {
  console.log(err);
};

class ProxySocket {
  onConnect: ConnectCallback;
  options: Option;
  socket: Net.Socket;

  constructor(options: Option, onConnect: ConnectCallback) {
    this.onConnect = onConnect || defaultCallback;
    this.options = options;
    this.connect();
  }

  connect = () => {
    this.socket = Net.createConnection({
      host: this.options.proxyHost,
      port: this.options.proxyPort,
    });
    this.socket.on("connect", () => {
      this.sendHello();
    });
    this.socket.on("error", (err) => this.onConnect(err, this.socket));
  };

  sendHello = () => {
    this.socket.write(Buffer.from([0x05, 0x01, 0x00]));
    this.socket.once("data", (buf) => {
      if (buf[1] == 0) {
        this.sendCommand();
      } else {
        this.socket.end();
        this.onConnect(
          new Error("hello error:" + buf.toString("binary")),
          this.socket
        );
      }
    });
  };

  sendCommand = () => {
    const hostBuf = Buffer.from(this.options.host, "utf-8");
    let cmdBuf = Buffer.from([0x05, 0x01, 0x00, 0x03, hostBuf.length]);
    const port = new Uint16Array(1);
    port[0] = this.options.port;
    cmdBuf = Buffer.concat([
      cmdBuf,
      hostBuf,
      Buffer.from(port.buffer).reverse(),
    ]);
    this.socket.write(cmdBuf);
    this.socket.once("data", (buf) => {
      if (buf[1] == 0) {
        this.notifyConnected();
      } else {
        this.onConnect(
          new Error("connect error:" + buf.toString("binary")),
          this.socket
        );
      }
    });
  };

  notifyConnected = () => {
    if (this.options.https) {
      this.socket = new tls.TLSSocket(this.socket);
    }
    this.onConnect(null, this.socket);
  };
}

export const createConnection = (
  options: Option,
  onConnect: ConnectCallback
) => {
  new ProxySocket(options, onConnect);
};
