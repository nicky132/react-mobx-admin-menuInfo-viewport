import React from "react";
import debounce from "lodash-es/debounce";
// import { observer } from "mobx-react-lite";

const { useState, useEffect } = React;

// export enum AdaptMode {
//   全屏 = "full-screen",
//   宽度铺满 = "overspread-x",
//   高度铺满 = "overspread-y",
// }

// interface IProps {
//   /** 子节点 */
//   children: React.ReactNode;
//   /** id */
//   id?: string;
//   /** 宽度
//    * @default 1920
//    */
//   width?: number;
//   /** 高度
//    *  @default 1080
//    */
//   height?: number;
//   /** 背景颜色
//    * @default transparent
//    */
//   backgroundColor?: string;
//   /** 背景图片 */
//   backgroundImage?: string;
//   /**  模式 默认宽度铺满 */
//   mode?: AdaptMode;
//   /** 反向缩放 */
//   reverse?: boolean;
//   /** 内联样式 */
//   style?: React.CSSProperties;
//   /** 获取缩放系数 */
//   getScale?: (value: { scaleX: number; scaleY: number }) => void;
// }
export const AdaptMode = {
  全屏: "full-screen",
  宽度铺满: "overspread-x",
  高度铺满: "overspread-y",
};
function getSize() {
  console.log(
    "getSize",
    window.innerHeight,
    window.innerWidth,
    window.outerHeight,
    window.outerWidth
  );
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  };
}

const DEFAULT_PROPS = {
  width: 1920,
  height: 1080,
  backgroundColor: "transparent",
  mode: AdaptMode.宽度铺满,
  reverse: false,
};

const PageWrapper = (props) => {
  const { style, getScale, className } = props;

  const newProps = { ...DEFAULT_PROPS, ...props };
  const {
    id = "",
    width,
    height,
    backgroundColor,
    backgroundImage,
    mode,
    children,
  } = newProps;

  const propsRef = React.useRef(newProps);
  const [wrpStyle, setWrpStyle] = useState({
    position: "absolute",
    width: width + "px",
    height: height + "px",
    transformOrigin: "0 0",
    // pointerEvents: 'none',
    backgroundColor,
    backgroundImage: `url(${backgroundImage || ""})`,
    overflow: "hidden",
    // perspective: '1px',
  });
  const [init, setInit] = useState(false);

  // 计算缩放系数
  const computeScale = (w, h, winW, winH, mode) => {
    // 默认全屏
    let scaleX = winW / w;
    let scaleY = winH / h;
    if (mode === AdaptMode.宽度铺满) {
      scaleY = scaleX;
    } else if (mode === AdaptMode.高度铺满) {
      scaleX = scaleY;
    }
    return { scaleX, scaleY };
  };

  const updateLayout = React.useCallback(
    debounce(() => {
      console.log("updateLayout");
      const { innerWidth: winW, innerHeight: winH } = getSize();
      const {
        width: w,
        height: h,
        mode: _mode,
        reverse: _reverse,
      } = propsRef.current;
      let transform = "";
      let top = "0px";
      let left = "0px";

      if (winW === w && winH === h) {
        setWrpStyle({
          ...wrpStyle,
          width: "100%",
          height: "100%",
          transform,
          top,
          left,
        });
        getScale && getScale({ scaleX: 1, scaleY: 1 });
        return;
      }

      let { scaleX, scaleY } = computeScale(w, h, winW, winH, _mode);
      let _width = w;
      let _height = h;

      if (_reverse) {
        scaleX = 1 / scaleX;
        scaleY = 1 / scaleY;
        _width = winW * scaleX;
        _height = winH * scaleY;
      } else {
        transform = `scale(${scaleX},${scaleY}) translateZ(0px)`;
        if (mode === AdaptMode.宽度铺满 || mode === AdaptMode.高度铺满) {
          top = "50%";
          left = "50%";
          transform = `scale(${scaleX},${scaleY}) translateZ(0px) translate(-50%, -50%)`;
        }
      }

      setWrpStyle({
        ...wrpStyle,
        width: _width + "px",
        height: _height + "px",
        top,
        left,
        transform,
      });
      getScale && getScale({ scaleX, scaleY });
    }, 60),
    [width, height, mode]
  );

  useEffect(() => {
    propsRef.current = newProps;
  });

  useEffect(() => {
    updateLayout();
    setInit(true);
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  useEffect(() => {
    updateLayout();
  }, [updateLayout]);

  return (
    <div className={className} id={id} style={{ ...wrpStyle, ...style }}>
      {init && children}
    </div>
  );
};

export default PageWrapper;
