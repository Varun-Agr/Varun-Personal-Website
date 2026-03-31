const BroadsheetFooter = () => {
  return (
    <footer className="colophon">
      <hr className="bs-double-rule" />
      <div className="colophon__grid">
        {/* Column 1: Nameplate */}
        <div>
          <div className="colophon__title">The Agrawal Dispatch</div>
          <div className="colophon__since">Published since 2018</div>
          <div className="colophon__tagline">
            New Delhi &middot; Singapore
            <br />
            Technical Recruiting &amp; Talent Infrastructure
          </div>
        </div>

        <div className="bs-column-rule" />

        {/* Column 2: Index */}
        <div>
          <div className="colophon__index-title">This Edition Contains</div>
          <ul className="colophon__index-list">
            <li>
              <span>Front Page</span>
              <span>&sect;1</span>
            </li>
            <li>
              <span>Special Reports</span>
              <span>&sect;2</span>
            </li>
            <li>
              <span>Letters to the Editor</span>
              <span>&sect;3</span>
            </li>
          </ul>
        </div>

        <div className="bs-column-rule" />

        {/* Column 3: Printing Notice */}
        <div className="colophon__notice">
          <div>
            Find the author on{" "}
            <a
              href="https://github.com/Varun-Agr"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {" "}&middot;{" "}
            <a
              href="https://www.linkedin.com/in/varun-agrawal-b3367a31/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {" "}&middot;{" "}
            <a
              href="https://x.com/Vaz_varun"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter/X
            </a>
          </div>
          <div style={{ marginTop: 12 }}>
            This site was typeset in Playfair Display, EB Garamond, and Oswald.
            No candidates were harmed in the making of this portfolio.
          </div>
        </div>
      </div>

      <div className="colophon__bar">
        &copy; 2026 &middot; All Rights Reserved &middot; Printed on Recycled
        Electrons
      </div>
    </footer>
  );
};

export default BroadsheetFooter;
