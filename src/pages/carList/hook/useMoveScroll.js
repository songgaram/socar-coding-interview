import { useRef } from "react";

function useMoveScroll() {
  const target = useRef(null);
  const onMoveToElement = () => {
    target.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return { target, onMoveToElement };
}

export default useMoveScroll;
