import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const FaqItem = ({ item, index }) => {
  const [activeId, setActiveId] = useState(null);
  const active = activeId === item.id;

  // Animation variants for the FAQ answer
  const answerVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Animation variants for the toggle icon
  const iconVariants = {
    inactive: { rotate: 0 },
    active: { rotate: 45, backgroundColor: "#ff6b6b" }, // Matches p1 color (adjust if needed)
  };

  // Animation variants for the background
  const backgroundVariants = {
    inactive: { opacity: 0 },
    active: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative z-2 mb-16">
      <div
        className="group relative flex cursor-pointer items-center justify-between gap-10 px-7"
        onClick={() => {
          setActiveId(activeId === item.id ? null : item.id);
        }}
      >
        <div className="flex-1">
          <div className="small-compact mb-1.5 text-p3 max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <motion.div
            className={clsx(
              "h6 text-p4 max-md:flex max-md:min-h-20 max-md:items-center",
              active && "max-lg:text-p1",
            )}
            animate={{ color: active ? "#ff6b6b" : "#d3d3d3" }} // Adjust colors to match p1/p4
            transition={{ duration: 0.5 }}
          >
            {item.question}
          </motion.div>
        </div>

        <motion.div
          className={clsx(
            "faq-icon relative flex size-12 items-center justify-center rounded-full border-2 border-s2 shadow-400",
            active && "border-s4",
          )}
          variants={iconVariants}
          animate={active ? "active" : "inactive"}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="g4 size-11/12 rounded-full shadow-300"
            animate={{ backgroundColor: active ? "#ff6b6b" : "#4b5e7e" }} // Adjust to match p1/g4
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="body-3 px-7 py-3.5"
          >
            {item.answer}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={clsx(
          "g5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl absolute",
        )}
        variants={backgroundVariants}
        animate={active ? "active" : "inactive"}
      >
        <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-p1" />
      </motion.div>
    </div>
  );
};

export default FaqItem;
