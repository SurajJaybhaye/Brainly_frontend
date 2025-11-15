
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 overflow-hidden text-center px-6">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
      />

      {/* Animated Icons */}
      <motion.div
        className="absolute top-1/3 left-40 text-purple-400 text-4xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <YoutubeIcon />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-40 text-purple-500 text-4xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <TwitterIcon />
      </motion.div>
      

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-800 drop-shadow-lg">
          Your Second Brain for the Internet
        </h1>
        <p className="mt-4 text-lg md:text-xl text-purple-600 font-medium">
          Save, organize, and revisit your favorite ideas from YouTube, Twitter, and Docs — all in one smart place.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/signup">
            <button className="px-6 py-3 rounded-2xl text-white bg-purple-700 hover:bg-purple-800 transition-all shadow-lg">
              Get Started
            </button>
          </Link>
          <Link to="/signin">
            <button className="px-6 py-3 rounded-2xl border border-purple-700 text-purple-700 hover:bg-purple-100 transition-all shadow-md">
              Login
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Subtext */}
      <p className="mt-10 text-sm text-purple-400">
        Embed, store & recall — your personal digital mind.
      </p>
    </section>
  );
};

