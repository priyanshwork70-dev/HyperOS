export default function BootScreen() {
  return (
    <main className="boot-screen">
      <section className="boot-panel">
        <div className="brand-mark">H</div>

        <h1>HyperOS</h1>
        <p>Preparing adaptive desktop environment...</p>

        <div className="boot-loader">
          <span></span>
        </div>

        <div className="boot-lines">
          <p>Loading shell interface</p>
          <p>Checking local workspace</p>
          <p>Starting mode engine</p>
        </div>
      </section>
    </main>
  );
}