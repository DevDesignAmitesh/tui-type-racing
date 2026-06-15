import { JSX } from "react";

const links = {
  npm: "https://www.npmjs.com/package/tui-typer",
  github: "https://github.com/DevDesignAmitesh/tui-type-racing",
  site: "https://amitesh.work",
  authorGithub: "https://github.com/devDesignAmitesh/",
  linkedin: "https://www.linkedin.com/in/amitesh-singh-504b2b281/",
  twitter: "https://x.com/amitesh48256/",
  email: "mailto:amiteshsingh252@gmail.com",
};

const steps = ["Create a room", "Share the code", "Start typing"];
const stack = ["TypeScript", "Ink", "WebSockets", "React"];

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col  px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-5 text-sm">
          <a className="font-medium tracking-tight" href="#">
            tui-typer
          </a>
          <div className="flex items-center gap-5 text-muted">
            <a className="transition hover:text-ink" href={links.github}>
              github
            </a>
            <a className="transition hover:text-ink" href={links.npm}>
              npm
            </a>
          </div>
        </nav>

        <section className="grid items-start gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              terminal typing race
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Race friends from the command line.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              tui-typer is a multiplayer terminal app for creating rooms, sharing
              a code, and competing in focused typing races with live progress.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-11 items-center justify-center border border-ink bg-ink px-5 text-sm font-medium text-white transition hover:bg-black"
                href={links.npm}
              >
                Install package
              </a>
              <a
                className="inline-flex h-11 items-center justify-center border border-line bg-white/60 px-5 text-sm font-medium text-ink transition hover:border-ink"
                href={links.github}
              >
                View source
              </a>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              <Command label="Install" command="npm install -g tui-typer" />
              <Command label="Run" command="tui-typer" />
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="border border-line bg-[#111111] text-white shadow-soft">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-mono text-xs text-white/45">tui-typer</span>
                <span className="font-mono text-xs text-white/35">room #482915</span>
              </div>
              <div className="space-y-5 p-5 font-mono text-sm">
                <div>
                  <p className="text-white/45">Create or join a race</p>
                  <p className="mt-2 text-white">Amitesh created room: terminal-laps</p>
                </div>
                <div className="space-y-2">
                  <Progress name="Amitesh" value="72%" width="72%" />
                  <Progress name="Friend" value="58%" width="58%" />
                  <Progress name="You" value="81%" width="81%" active />
                </div>
                <div className="border border-white/10 bg-white/[0.03] p-4 leading-7 text-white/72">
                  Open source software allows developers from around the world
                  to collaborate and build better tools together.
                </div>
                <p className="text-white/40">Accuracy 96% / keep typing...</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div className="border border-line bg-white/60 p-4" key={step}>
                  <p className="font-mono text-xs text-muted">0{index + 1}</p>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="grid gap-5 border-t border-line pt-5 text-xs text-muted lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="flex flex-wrap gap-2 lg:justify-center">
            {stack.map((item) => (
              <span className="border border-line bg-white/60 px-3 py-1 font-mono text-xs" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-4 lg:justify-end text-xs">
            <a className="hover:text-ink" href={links.authorGithub}>
              github
            </a>
            <a className="hover:text-ink" href={links.linkedin}>
              linkedIn
            </a>
            <a className="hover:text-ink" href={links.twitter}>
              twitter
            </a>
            <a className="hover:text-ink" href={links.email}>
              email
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Command({ label, command }: { label: string; command: string }): JSX.Element {
  return (
    <div className="border border-line bg-white/70 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <code className="mt-2 block overflow-x-auto whitespace-nowrap font-mono text-sm text-ink">
        {command}
      </code>
    </div>
  );
}

function Progress({
  name,
  value,
  width,
  active,
}: {
  name: string;
  value: string;
  width: string;
  active?: boolean;
}): JSX.Element {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/50">
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-white/10">
        <div
          className={active ? "h-full bg-white" : "h-full bg-white/45"}
          style={{ width }}
        />
      </div>
    </div>
  );
}
