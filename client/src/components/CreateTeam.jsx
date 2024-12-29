import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function CreateTeam({ onClose, data }) {
  const [Team, setTeam] = useState({
    name: "",
    description: "",
    organization: "",
  });
  const handleSubmit = async (e) => {
    try {
      if (data) {
        Team.organization = data;
      }
      e.preventDefault();
      await axios
        .post("http://localhost:3245/api/team", Team)
        .then(() => alert("Team is created"));
    } catch (error) {
      console.log(error);
      alert("something went wrong", error.message);
    }
  };
  return (
    <div
      className={`flex fixed justify-center items-center w-screen h-screen bg-opacity-50 bg-black`}
    >
      <div className="bg-white bg-opacity-100 px-20 py-10 relative rounded-md hover:border-2 border-green-700 bg-gradient-to-b from-blue-200 to-purple-500">
        <button
          className="absolute right-5 top-2 text-black font-[700] text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h1 className="text-green-900 text-center text-3xl mb-10 font-[700]">
          Create Team
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8  ">
          <input
            className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700 "
            placeholder="Name"
            type="text"
            value={Team.name}
            onChange={(e) => setTeam({ ...Team, name: e.target.value })}
          />
          <input
            className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700 "
            placeholder="Description"
            type="text"
            value={Team.description}
            onChange={(e) => setTeam({ ...Team, description: e.target.value })}
          />
          {!data ? (
            <input
              className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700 "
              placeholder="Organization Id"
              type="text"
              value={Team.organization}
              onChange={(e) =>
                setTeam({ ...Team, description: e.target.value })
              }
            />
          ) : (
            <></>
          )}
          <button
            type="submit"
            className="bg-green-900 text-white outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 flex items-center justify-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;
