export default function BootScreen() {
  return (
    <div className="boot-screen">
      <div className="boot-card">
        <h1>HyperOS</h1>
        <p>Starting browser operating system...</p>
        <div className="loader">
          <div></div>
        </div>
      </div>
    </div>
  );
}