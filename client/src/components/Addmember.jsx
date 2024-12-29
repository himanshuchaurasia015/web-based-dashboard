import axios from "axios";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

function AddMember({ onClose, org, team }) {
  const [member, setmember] = useState({
    name: "",
    email: "",
    team: "",
    organization: "",
  });
  const [file, setFile] = useState(null); // State for handling file input
  const [useWebcam, setUseWebcam] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured image:", imageSrc);
      const arr = imageSrc.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], `${member.email}.png`, { type: mime });
      setFile(file);
      console.log("File created:", file);
      setUseWebcam(false); // Turn off the webcam after capturing the image
    }
  }, [webcamRef, member.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (org && team) {
      member.organization = org;
      member.team = team;
    }

    const formData = new FormData();
    formData.append("name", member.name);
    formData.append("email", member.email);
    formData.append("team", member.team);
    formData.append("organization", member.organization);

    if (file) {
      const fileExtension = file.name.split(".").pop(); // Get file extension
      const newFileName = `${member.email}.${fileExtension}`; // Rename file to email ID
      const renamedFile = new File([file], newFileName, { type: file.type });
      formData.append("image", renamedFile);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/api/member`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setmember({
        name: "",
        email: "",
        // team: "",
        // organization: "",
      });
      alert("Member is created");
    } catch (error) {
      console.error(error);
      alert("Something went wrong", error.message);
    }
  };

  return (
    <div className="flex fixed justify-center items-center w-screen h-screen bg-opacity-50 bg-black">
      <div className="bg-white bg-opacity-100 px-20 py-10 relative rounded-md hover:border-2 border-green-700 bg-gradient-to-b from-blue-200 to-yellow-500">
        <button
          className="absolute right-5 top-2 text-black font-[700] text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h1 className="text-green-900 text-center text-3xl mb-10 font-[700]">
          Create Member
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700"
            placeholder="Name"
            type="text"
            value={member.name}
            onChange={(e) => setmember({ ...member, name: e.target.value })}
          />
          <input
            className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700"
            placeholder="Email"
            type="text"
            value={member.email}
            onChange={(e) => setmember({ ...member, email: e.target.value })}
          />
          <input
            className="outline-none rounded-lg h-8 text-center px-3 hover:border-2 border-green-700"
            type="file"
            onChange={handleFileChange}
          />
          <p className="text-center">OR</p>
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              className={
                useWebcam
                  ? `hidden`
                  : `bg-blue-500 text-white outline-none rounded-lg h-8 text-center px-3 py-3 hover-border-2 flex justify-center items-center`
              }
              onClick={() => setUseWebcam(true)}
            >
              Capture Image
            </button>
            {useWebcam && (
              <div className="flex flex-col items-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="mb-4 rounded-full overflow-hidden"
                  style={{ width: 200, height: 200 }}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white outline-none rounded-lg h-8 text-center px-3 py-3 hover-border-2 flex justify-center items-center"
                  onClick={capture}
                >
                  Capture
                </button>
              </div>
            )}
          </div>
          {!org || !team ? (
            <>
              <input
                className="outline-none rounded-lg h-8 text-center px-3 py-3 hover:border-2 border-green-700"
                placeholder="Team ID"
                type="text"
                value={member.team}
                onChange={(e) => setmember({ ...member, team: e.target.value })}
              />
              <input
                className="outline-none rounded-lg h-8 text-center px-3 py-3 hover-border-2 border-green-700"
                placeholder="Organization ID"
                type="text"
                value={member.organization}
                onChange={(e) =>
                  setmember({ ...member, organization: e.target.value })
                }
              />
            </>
          ) : null}

          <button
            type="submit"
            className="bg-green-900 text-white outline-none rounded-lg h-8 text-center px-3 py-3 hover-border-2 flex items-center justify-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
