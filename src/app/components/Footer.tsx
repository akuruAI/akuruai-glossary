import { FooterLogo } from "@app/app/components/FooterLogo";
import { GithubIcon } from "@modules/shared/icons/GithubIcon";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t mt-20 border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <FooterLogo></FooterLogo>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Bridging languages, connecting cultures through technology and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://www.languagesdept.gov.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
              >
                <span className="relative">
                  Department of Official Languages
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-200" />
                </span>
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
              </Link>
              <Link
                href="https://github.com/akuruAI/akuruai-glossary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
              >
                <GithubIcon className="w-4 h-4 -mt-0.5 mr-2 dark:fill-white" />
                <span className="relative">
                  GitHub
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-200" />
                </span>
              </Link>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Languages</h4>
            <div className="flex space-x-4">
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">සිංහල</span>
              <span className="text-sm px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">தமிழ்</span>
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">English</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy;
            {" "}
            {currentYear}
            {" "}
            AkuruAI. Made with ❤️ in Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
}
