import { useReducedMotion } from "framer-motion";

export default function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  return reduce ?? false;
}
