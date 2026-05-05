import { ArrowUpRight } from "lucide-react";
import Button from "./Button";

export default function Footer() {
  return (
    <footer id="contact" className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Button variant="primary" href="mailto:mail2tarun.30@gmail.com">
          Start a chat
        </Button>

        <div className="flex items-start gap-6">
          <ArrowUpRight className="w-5 h-5 text-[#051A24] mt-1 flex-shrink-0" />
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              <a href="#work" className="text-base text-[#051A24] hover:opacity-70 transition">
                Work
              </a>
              <a href="#about" className="text-base text-[#051A24] hover:opacity-70 transition">
                About
              </a>
              <a href="mailto:mail2tarun.30@gmail.com" className="text-base text-[#051A24] hover:opacity-70 transition">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="text-base text-[#051A24] hover:opacity-70 transition"
              >
                x.com
              </a>
              <a
                href="https://github.com/Tarun2030"
                target="_blank"
                rel="noreferrer"
                className="text-base text-[#051A24] hover:opacity-70 transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noreferrer"
                className="text-base text-[#051A24] hover:opacity-70 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
