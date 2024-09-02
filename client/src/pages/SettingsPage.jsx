import { CiUser } from "react-icons/ci";
import { useAppContext } from "../context/AppContext";
import PersonalData from "../components/settings/PersonalData";
import ImageSection from "../components/settings/ImageSection";
import AddressSection from "../components/settings/AddressSection";

function SettingsPage() {
  const { user } = useAppContext();

  return (
    <div className="py-2 px-2 md:py-16 md:px-20">
      <div className="flex gap-2 items-center">
        <CiUser size={25} />
        <h2 className="font-semibold text-2xl">{user?.firstName}</h2>
      </div>
      <div className="mt-5 border-2 border-black p-2 rounded bg-white">
        <h1 className="font-semibold text-2xl">Biodata Diri</h1>
        <div className="p-5 grid grid-cols-[1fr_3fr] max-w-4xl gap-4">
          <ImageSection />
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-xl">Ubah Biodata DIri</h1>
            <PersonalData />
            <h1 className="font-semibold text-xl">Alamat</h1>
            <AddressSection />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
