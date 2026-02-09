export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <a href="/" className="block" aria-label="Rashtan Soft">
              <img
                className="rounded-full"
                src="/images/logo-dark.png"
                width={96}
                height={96}
                alt="Rashtan Soft"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
