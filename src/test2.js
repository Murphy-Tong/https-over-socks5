let hostname = function (buf) {
	let hostName = '';
	if (buf.length === 4) {
		for (let i = 0; i < buf.length; i++) {
			hostName += parseInt(buf[i], 10);
			if (i !== 3)
				hostName += '.';
		}
	} else if (buf.length == 16) {
		for (let i = 0; i < 16; i += 2) {
			let part = buf.slice(i, i + 2).readUInt16BE(0).toString(16);
			hostName += part;
			if (i != 14)
				hostName += ':';
		}
	}
	return hostName;
}
console.log(hostname(Buffer.from([0xb4,0x65,0x31,0x0b])))