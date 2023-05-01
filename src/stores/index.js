import userStore from "./userStore";
import globalStore from "./globalStore";
// userStore是一个class类，需要new 类的实例来进行使用,暴露的也是类的实例
const obj = {
  user: new userStore(),
  global: new globalStore(),
};

export default obj;
