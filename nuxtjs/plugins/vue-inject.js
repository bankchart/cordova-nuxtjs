const utilities = {
  isEmailPattern: (val) => {
    return (val || '')
      .trim()
      .match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      );
  },
  getQueryStringByName: (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  getCookie: (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
  setCookie: (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  },
  deleteCookie: (name, path, domain) => {
    if (name) {
      document.cookie =
        name +
        '=' +
        (path ? ';path=' + path : '') +
        (domain ? ';domain=' + domain : '') +
        ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  },
  setStyleAttribute: (vueComp, refName, attrName, value) => {
    const refElm = vueComp.$refs[refName];
    if (refElm) {
      refElm.style[attrName] = value;
    }
  },
  addClass: (ref, className) => {
    if (!ref.classList.contains(className)) {
      ref.classList.add(className);
      return true;
    }
    return false;
  },
  removeClass: (ref, className) => {
    if (ref.classList.contains(className)) {
      ref.classList.remove(className);
      return true;
    }
    return false;
  }
};

export default (ctx, inject) => {
  inject('utilities', utilities);
};
