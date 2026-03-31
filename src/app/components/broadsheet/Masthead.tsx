"use client";

const Masthead = () => {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="masthead">
      <hr className="bs-double-rule" />
      <div className="masthead__dateline" style={{ marginTop: 12 }}>
        New Delhi &middot; Singapore &middot; {formatted} &middot; Vol. VII
        &middot; No. 247 &middot; &ldquo;All the talent that&rsquo;s fit to
        ship&rdquo;
      </div>
      <h1 className="masthead__name">The Agrawal Dispatch</h1>
      <div className="masthead__tagline">
        Technical Recruiter &middot; Tool Builder &middot; AI Governance
      </div>
      <hr className="bs-double-rule" style={{ marginTop: 12 }} />
      <nav className="masthead__nav">
        <a href="#front-page">Front Page</a>
        <a href="#projects">Projects</a>
        <a href="#connect">Connect</a>
        <a href="https://secureaifutureslab.com">SAFL</a>
        <a href="https://indiaaitracker.com">India AI Tracker</a>
      </nav>
      <hr className="bs-thin-rule" />
    </header>
  );
};

export default Masthead;
