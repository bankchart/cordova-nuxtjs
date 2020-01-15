const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 8080;

const userDetail = [
  {
    username: 'xplink',
    password: 'xplink',
    firstName: 'fname-xplink',
    lastName: 'lname-xplink',
    displayName: 'displayName-xplink'
  },
  {
    username: 'xplink2',
    password: 'xplink2',
    firstName: 'fname-xplink2',
    lastName: 'lname-xplink2',
    displayName: 'displayName-xplink2'
  },
  {
    username: 'xplink3',
    password: 'xplink3',
    firstName: 'fname-xplink3',
    lastName: 'lname-xplink3',
    displayName: 'displayName-xplink3'
  },
  {
    username: 'xplink4',
    password: 'xplink4',
    firstName: 'fname-xplink4',
    lastName: 'lname-xplink4',
    displayName: 'displayName-xplink4'
  },
  {
    username: 'xplink5',
    password: 'xplink5',
    firstName: 'fname-xplink5',
    lastName: 'lname-xplink5',
    displayName: 'displayName-xplink5'
  }
];
const permissions = [
  '10001', '10002', '10003', '10004', '10005',
  '10006', '10007', '10008', '10009', '10010'
];

const  errorStatus = {
  PERMISSION_DENIED: {
    success: false,
    error: {
      errorCode: 'B0000',
      errorDesc: 'Permission denied'
    }
  },
  UNAUTHORIZED: {
    success: false,
    error: {
      errorCode: 'B0001',
      errorDesc: 'Unauthorized'
    }
  },
  INVALID_INPUT: {
    success: false,
    error: {
      code: 'B0002',
      desc: 'Invalid input' 
    }
  },
  NOT_FOUND_USER: {
    success: false,
    error: {
      code: 'B0003',
      desc: 'Not found user' 
    }
  }
}

app.get('/', (req, res) => res.json(process.versions));

app.post('/login', (req, res) => {
  let response = null;
  const user = req.body.data.user;
  for (let u of userDetail) {
    const userTmp = {
      username: u.username,
      password: u.password
    };
    if (JSON.stringify(userTmp) === JSON.stringify(user)) {
      const userEncrypt = encrypt(JSON.stringify(userTmp));
      const encryptTxtBase64 = Buffer.from(JSON.stringify(userEncrypt)).toString('base64');
      const tmp = Object.assign({}, u);
      tmp.password = undefined;
      response = {
        success: true,
        data: {
          token: encryptTxtBase64,
          user: tmp
        }
      };
      break;
    }
  }
  if (response) {
    res.json(response);
  } else {
    res.status(401).json(errorStatus.NOT_FOUND_USER);
  }
});

app.post('/auth', (req, res) => {
  tokenReq = req.headers.token;
  versionReq = req.headers.version;
  res.header('token', tokenReq);
  res.header('version', versionReq);
  let response = errorStatus.PERMISSION_DENIED;

  if (!tokenReq) {
    return res.status(401).json(errorStatus.UNAUTHORIZED);
  }

  try {
    const encryptTxtBase64 = decodeBase64(tokenReq);
    const encryptTxt = JSON.parse(encryptTxtBase64);
    const user = decrypt(encryptTxt);
    for (let u of userDetail) {
      const userTmp = {
        username: u.username,
        password: u.password
      };
      if (JSON.stringify(userTmp) === user) {
        let tmp = Object.assign({}, u);
        tmp.password = undefined;
        response = {
          success: true,
          data: {
            permissions,
            user: tmp
          }
        };
        break;
      }
    }
    return res.json(response);
  } catch (err) {
    return res.status(403).json(response);
  }
});

// const key = crypto.randomBytes(32);
// const accessToken = 'eyJpdiI6IjZlYTRiYjgwNDk3NDNiNTZkYmYwYzcyYjRiNmQzMGYxIiwiZW5jcnlwdGVkRGF0YSI6IjllNTA4MzAwNTE1NGMxNzIzM2JkMDk0YmY1MDI3N2JmZmExMjlkNjNkYTk5OTk1MjY2Zjc2YTM1MzIzMWNlODNjZGMxN2JlN2U5ZjI2Y2U3MWYwMGNiY2EzNGRhNzlmMiJ9'

const keyBase64 = 'eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEyOSw1NSwyMjUsNDYsMjM5LDEwOCwyMjgsMTY1LDgzLDE1MiwxNjUsMTcwLDIzOCwxMTUsMTk0LDE5Niw1MCwxODIsMTYwLDEwMywyMDgsMjQ4LDEzNiw5OCwyNDMsMTg1LDIxMSwxNTIsMTM3LDQ2LDAsMTYxXX0=';
const key =  JSON.parse(decodeBase64(keyBase64));

function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function encodeBase64(text) {
  return Buffer.from(JSON.stringify(text)).toString('base64');
}

function decodeBase64(base64Text) {
  return Buffer.from(base64Text, 'base64').toString('utf-8');
}

// const encryptTxt = encrypt(JSON.stringify(userDetail));
// console.log('===============================');
// console.log(`input=${JSON.stringify(userDetail)}`);
// const encryptTxtBase64 = Buffer.from(JSON.stringify(encryptTxt)).toString('base64');
// console.log(`encryptTxtBase64=${encryptTxtBase64}`);

// const decryptTxtBase64 = Buffer.from(encryptTxtBase64, 'base64').toString('utf-8');
// console.log(`decryptTxtBase64=${decryptTxtBase64}`);
// console.log(`output=${decrypt(JSON.parse(decryptTxtBase64))}`);

app.listen(port, () => console.log(`Listening on port ${port}`));
