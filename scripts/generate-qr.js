const QRCode = require('qrcode');

const cardUrl = 'https://efrenrodriguezrodriguez.com/card';

QRCode.toFile('./efren-rodriguez-qr.png', cardUrl, {
  width: 512,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
}, (err) => {
  if (err) throw err;
  console.log('QR code saved to efren-rodriguez-qr.png');
});
