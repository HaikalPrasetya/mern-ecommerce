import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";

function AppLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[250px_auto]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="min-h-screen pb-[200px] w-screen xs:w-[calc(100vw-250px)]">
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Bottombar />
      </div>
    </div>
  );
}
export default AppLayout;
