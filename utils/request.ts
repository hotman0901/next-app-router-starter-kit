// 之後如果要統一 base url
/** biome-ignore-all lint/complexity/noUselessUndefinedInitialization: <ingore> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <ingore> */
let baseURL =
  process?.env?.BASE_API?.indexOf('http') !== -1
    ? process?.env?.BASE_API
    : window?.location?.pathname + process.env.BASE_API;

baseURL = baseURL ? baseURL : '';

// 公用前缀 & 默认配置
const initial = {
  method: 'GET',
  params: null, // for get request
  body: null, // for post request
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // credentials: true,
  responseType: 'JSON',
  cache: 'no-cache',
};

// 校验是否为纯粹的对象
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPlainObject = function isPlainObject(obj: any) {
  let proto = undefined;
  let Ctor = undefined;
  if (!obj || typeof obj !== 'object') return false;
  proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  Ctor = Object.hasOwn(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && Ctor === Object; //构造函数是Object
};

// 发送数据请求
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = function request(url: string, config?: any) {
  // callback 用
  let onSuccess = () => {};
  let onError = () => {};

  // 合并配置项{不要去更改initial中的内容}
  // biome-ignore lint/suspicious/noAssignInExpressions: <reason for ignoring>
  config = config === null || typeof config !== 'object' ? (config = {}) : null; //确保config肯定是对象

  if (config?.onSuccess) {
    onSuccess = config?.onSuccess;
    delete config.onSuccess;
  }

  if (config?.onError) {
    onError = config?.onError;
    delete config.onError;
  }

  if (config?.headers && isPlainObject(config?.headers)) {
    // 单独的给HEADERS先进行深度合并
    config.headers = Object.assign({}, initial?.headers, config?.headers);
  }
  const { headers, cache } = Object.assign({}, initial, config); //和饼config

  let { method, body, params, responseType, credentials } = Object.assign(
    {},
    initial,
    config,
  );

  // 处理URL{格式校验 & 公共前缀 & 拼接params中的信息到URL的末尾}
  if (typeof url !== 'string') throw new TypeError(`${url} is not an string!`);
  if (!/^http(s?):\/\//i.test(url)) url = baseURL + url; //判断是不是以http或者https开头,如果不是,就用baseurl拼起来
  if (params != null) {
    //不是null和undefined,存在params
    if (isPlainObject(params)) {
      params = JSON.stringify(params);
    }
    url += `${url.includes('?') ? '&' : '?'}${params}`; //拼接
  }

  // 处理请求主体的数据格式{根据headers中的Content-Type处理成为指定的格式}
  if (body != null) {
    if (isPlainObject(body)) {
      const contentType =
        headers['Content-Type'] || 'application/json;charset=UTF-8'; //默认application/json
      if (contentType.includes('urlencoded')) body = JSON.stringify(body);
      if (contentType.includes('json')) body = JSON.stringify(body);
    }
  }

  // 处理credentials{如果传递的是true,我们让其为include,否则是same-origin}
  //include,允许跨域请求当中携带资源凭证,same-origin,允许同源性请求当中携带资源凭证
  credentials = credentials ? 'include' : 'same-origin';

  // 基于fetch请求数据
  method = method.toUpperCase();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  responseType = responseType.toUpperCase();
  config = {
    method,
    credentials,
    cache,
    headers,
  };

  if (/^(POST|PUT|PATCH)$/i.test(method)) {
    config.body = body;
  }

  console.log(`Request => [${method}]  ${url}`, config, config.body || null);

  return fetch(url, config)
    .then(async function onfulfilled(response) {
      // 走到这边不一定是成功的：
      // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
      const { status, statusText } = response;

      console.log(
        `Response => [${method}] [${status}] [${statusText}] ${response.url}`,
      );

      if (status >= 200 && status < 400) {
        // 真正成功获取数据
        // let result;
        // switch (responseType) {
        //   case 'TEXT':
        //     result = response.text();
        //     break;
        //   case 'JSON':
        //     result = response.json();
        //     break;
        //   case 'BLOB':
        //     result = response.blob();
        //     break;
        //   case 'ARRAYBUFFER':
        //     result = response.arrayBuffer();
        //     break;
        // }
        onSuccess();
        return response;
      }
      // 应该是失败的处理
      return Promise.reject({
        ...response,
        code: 'STATUS ERROR',
        status,
        statusText,
      });
    })
    .catch(function onrejected(reason) {
      onError();
      // @1:状态码失败
      if (reason && reason.code === 'STATUS ERROR') {
        switch (reason.status) {
          case 401:
            break;
          // ...
        }
      }

      // @2:断网
      if (!navigator.onLine) {
        // ...
      }

      return Promise.reject(reason);
    });
};
export default request;
