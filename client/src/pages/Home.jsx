import axios from "axios";
import { useEffect, useState } from "react";
import CreateTeam from "../components/CreateTeam";
import AddMembers from "../components/AddMembers";

function Home() {
  const [data, setData] = useState([]);
  const [orgClick, setOrgClick] = useState(null);
  const [teamClick, setTeamClick] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [orgId, setOrgId] = useState(null);
  const [teamId, setTeamId] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setOrgId(null);
    setTeamId(null);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/organization`
        );
        setData(res.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, [isModalOpen]);

  const handleTeam = (id) => {
    setOrgId(id);
    setModalType("createTeam");
    setModalOpen(true);
  };

  const handleMember = (orgId, teamId) => {
    setOrgId(orgId);
    setTeamId(teamId);
    setModalType("addMembers");
    setModalOpen(true);
  };

  return (
    <>
      {isModalOpen && modalType === "createTeam" && (
        <CreateTeam onClose={closeModal} data={orgId} />
      )}
      {isModalOpen && modalType === "addMembers" && orgId && teamId && (
        <AddMembers onClose={closeModal} org={orgId} team={teamId} />
      )}
      <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-indigo-600 to-purple-600 pb-16">
        <div className="flex justify-center px-4 text-white overflow-y-scroll h-full w-full">
          {data.length > 0 ? (
            <ul className="space-y-6 w-full max-w-screen-lg">
              {data.map((org) => (
                <li key={org._id} className="w-full">
                  <div
                    className="flex gap-5 items-center justify-between border-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors duration-300 px-5 py-4 shadow-lg cursor-pointer"
                    onClick={() =>
                      setOrgClick(orgClick === org._id ? null : org._id)
                    }
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-semibold">{org.name}</p>
                      <p className="text-xs">{org.email}</p>
                      <p className="text-xs">{org.location}</p>
                    </div>
                    <p className="text-lg font-semibold">
                      {org.teams?.length || 0} team
                      {org.teams?.length !== 1 ? "s" : ""}
                    </p>
                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTeam(org._id);
                      }}
                    >
                      Create Team
                    </button>
                  </div>
                  {orgClick === org._id && (
                    <ul className="ml-8 mt-4 space-y-4">
                      {org.teams?.map((team, j) => (
                        <li key={team._id} className="w-full">
                          <div
                            className="flex gap-5 items-center justify-between border-2 w-full rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors duration-300 px-5 py-3 shadow-lg cursor-pointer"
                            onClick={() =>
                              setTeamClick(teamClick === j ? null : j)
                            }
                          >
                            <div className="flex flex-col gap-1">
                              <p className="text-lg font-semibold">
                                {team.name}
                              </p>
                              <p className="text-xs">{team.email}</p>
                            </div>
                            <p className="text-lg font-semibold">
                              {team.members?.length || 0} member
                              {team.members?.length !== 1 ? "s" : ""}
                            </p>
                            <button
                              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMember(org._id, team._id);
                              }}
                            >
                              Add Members
                            </button>
                          </div>
                          {teamClick === j && (
                            <ul className="ml-8 mt-2 space-y-2">
                              {team.members?.map((mem, k) => (
                                <li key={mem._id} className="w-full">
                                  <div className="flex gap-5 items-center justify-between border-2 w-full rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300 px-5 py-3 shadow-lg">
                                    <p>{k + 1}</p>
                                    <div className="flex flex-col gap-1">
                                      <p className="text-sm font-medium">
                                        {mem.name}
                                      </p>
                                      <p className="text-xs">{mem.email}</p>
                                    </div>
                                    <div
                                      className={`w-4 h-4 rounded-full ${
                                        mem.status
                                          ? "bg-green-500"
                                          : "bg-red-600"
                                      }`}
                                    ></div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl font-semibold">Data is not available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
