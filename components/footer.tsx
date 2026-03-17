import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <a
          href="/"
          className="flex items-center gap-2"
          aria-label="MediConnect Home"
        >
          <img
            src="/images/logos.png"
            alt="MediConnect Logo"
            className="w-24 h-16"
          />
        </a>
        </div>
        <p className="text-sm text-muted-foreground">
          2026 MediConnect. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
