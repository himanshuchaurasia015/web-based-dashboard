import { useState } from "react";
import AddOrganizationModal from "./AddOrganizationModal";
import AddMembers from "./AddMembers";
import CreateTeam from "./CreateTeam";

function Header() {
  const [isModalOpen, setModal] = useState(false);
  const [isMemberModalOpen, setMemberModal] = useState(false);
  const [isTeamModalOpen, setTeamModal] = useState(false);

  const closeModal = () => setModal(false);
  const closeMemberModal = () => setMemberModal(false);
  const closeTeamModal = () => setTeamModal(false);

  return (
    <>
      {isModalOpen && <AddOrganizationModal onClose={closeModal} />}
      {isMemberModalOpen && <AddMembers onClose={closeMemberModal} />}
      {isTeamModalOpen && <CreateTeam onClose={closeTeamModal} />}

      <header className="flex justify-between items-center w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-400 shadow-lg">
        <h1 className="text-white text-4xl font-bold tracking-wider">
          Dashboard
        </h1>

        <div className="flex gap-4">
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
    </>
  );
}

export default Header;
