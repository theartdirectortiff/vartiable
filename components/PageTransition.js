import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100vh" }}
      exit={{ y: 0 }}
      transition={{
        duration: 1,
        delay: 1,
      }}
      className="w-screen h-screen fixed top-0 left-0 bg-red-200 flex flex-col gap-8 items-center justify-center z-40"
    >
      <p className="text-white">Page transition</p>
    </motion.div>
  );
}
