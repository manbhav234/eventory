import { motion } from "motion/react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useAppStore from "../store/mainStore";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import FullScreenLoaderWrapper from "@/components/FullScreenLoaderWrapper";
import LoginBtn from "@/components/LoginBtn";

const LandingPage = () => {
  const { checkLogin, isLoggedIn, isLoading } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin(); 
  }, [checkLogin]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return (
       <FullScreenLoaderWrapper>
        <Loader/>
       </FullScreenLoaderWrapper>
    );
  }
  return (
    <div className="relative mx-auto flex w-full flex-col items-center h-screen">
      <NavBar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 md:py-20 my-auto">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Manage Inventory with ease"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
        A powerful tool to track stock, manage sales, and streamline event operations—all in one place.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <LoginBtn/>
        </motion.div>

      </div>
    </div>
  );
}
 
export default LandingPage;