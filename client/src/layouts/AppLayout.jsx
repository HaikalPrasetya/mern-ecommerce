import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

function AppLayout({ children }) {
  const { user } = useAppContext();
  const [displayNotification, setDisplayNotification] = useState(false);

  useEffect(() => {
    if (user) {
      const { addressDetails } = user;
      const isComplete = addressDetails === "";
      setDisplayNotification(isComplete);
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {displayNotification && (
        <div className="sticky top-0 right-0 bg-red-500 text-white p-3 mt-16 flex justify-between">
          Profile and belum lengkap, pergi ke bagian profile untuk
          melengkapinya!
          <button onClick={() => setDisplayNotification(false)}>X</button>
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
}
export default AppLayout;
