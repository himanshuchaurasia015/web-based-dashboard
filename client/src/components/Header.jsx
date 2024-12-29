import { useState } from "react";
import AddOrganizationModal from "./AddOrganizationModal.jsx";
import CreateTeam from "./CreateTeam.jsx";
import AddMember from "./Addmember.jsx";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isModalOpen, setModal] = useState(false);
  const [isMemberModalOpen, setMemberModal] = useState(false);
  const [isTeamModalOpen, setTeamModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeModal = () => setModal(false);
  const closeMemberModal = () => setMemberModal(false);
  const closeTeamModal = () => setTeamModal(false);

  return (
    <>
      {isModalOpen && <AddOrganizationModal onClose={closeModal} />}
      {isMemberModalOpen && <AddMember onClose={closeMemberModal} />}
      {isTeamModalOpen && <CreateTeam onClose={closeTeamModal} />}

      <header className="flex fixed justify-between items-center w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-400 shadow-lg z-50">
        <h1 className="text-white text-4xl font-bold tracking-wider">
          Dashboard
        </h1>

        <div className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
          <GiHamburgerMenu className="text-white text-2xl cursor-pointer" />
        </div>

        <div className="hidden md:flex gap-4">
          <button
            onClick={() => setModal(true)}
            className="bg-green-500 hover:bg-green-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Add Organization
          </button>
          <button
            onClick={() => setTeamModal(true)}
            className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Create Team
          </button>
          <button
            onClick={() => setMemberModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Add Member
          </button>
        </div>
      </header>

      {/* Responsive Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center gap-4 py-4 bg-gradient-to-r from-blue-600 to-teal-400 shadow-lg fixed top-16 left-0 right-0 z-40 md:hidden">
          <button
            onClick={() => setModal(true)}
            className="bg-green-500 hover:bg-green-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Add Organization
          </button>
          <button
            onClick={() => setTeamModal(true)}
            className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Create Team
          </button>
          <button
            onClick={() => setMemberModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 px-5 py-3 rounded-md text-white font-semibold shadow-md"
          >
            Add Member
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
