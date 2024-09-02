import LogoutButton from "./LogoutButton";

function Navbar() {
  return (
    <div className="border-b-2 border-black px-3 lg:px-0">
      <div className="container mx-auto px-2 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-700">Admin</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
export default Navbar;
