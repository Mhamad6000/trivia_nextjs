import { Link } from "@/i18n/routing";
import { Brain, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <Brain className="w-8 h-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-foreground">
              TriviaWorld
            </span>
          </Link>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link
              href="https://mhamad6000.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Created by Mhamad Othman
            </Link>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Mhamad6000"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mhamad-othman-797976267"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/Mhamad_6000"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TriviaWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
