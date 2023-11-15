import "./App.css";
import PicoTrace from "./PicoTrace";
import PicoSidebar from "./Sidebar";

function App() {
  return (
    <div className="flex justify-between flex-row flex-nowrap h-screen">
      <div className="side-bar w-[12vh]">
        <PicoSidebar />
      </div>
      <div className="map-trace w-full">
        <PicoTrace />
      </div>
    </div>
  );
}

export default App;
