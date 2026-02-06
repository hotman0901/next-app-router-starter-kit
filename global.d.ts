// 讓 TypeScript 知道所有以 .module.scss 結尾的檔案都是一個物件，且 key 是字串
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// 如果你也會用到 .module.css
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// 如果你有使用不帶 .module 的純 scss (全域引入)
declare module '*.scss';
