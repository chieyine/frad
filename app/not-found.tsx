import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="section-container max-w-2xl py-20 text-center">
        <p className="index-numeral text-7xl sm:text-8xl" aria-hidden="true">
          404
        </p>
        <h1 className="mt-6 text-4xl font-extrabold text-ink-950 sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-5 mb-9 max-w-md text-lg leading-8 text-ink-600">
          The page you are looking for may have been moved, renamed, or was never published.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Return Home
          </Button>
          <Button href="/what-we-do" variant="outline">
            Explore Our Work
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
