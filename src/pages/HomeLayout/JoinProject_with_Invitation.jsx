import { useParams } from "react-router-dom";
import { useGetInvitationInfoQuery } from "../../redux/api/projectsApi";
import JoinProject_ERR_int from "../../components/HomeLayout/JoinProject/JoinProject_ERR_int";
import JoinProject_with_INV from "../../components/HomeLayout/JoinProject/JoinProject_with_INV";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const JoinProject_with_Invitation = () => {
  const _id = useParams().token.split("=")[1];

  const { email, isLoading : userLoading } = useSelector(state => state.userSlice)
  const { data, isLoading : invQueLoading, isError } = useGetInvitationInfoQuery(_id);

  useEffect(() => {
    sessionStorage.setItem("JoinProject_with_invitation", JSON.stringify(_id))
  })


  return (
    <div className="w-screen h-screen">
      {invQueLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : isError ? (
        <JoinProject_ERR_int />
      ) : (
        <JoinProject_with_INV data={data} email={email} userLoading={userLoading} />
      )}
    </div>
  );
};

export default JoinProject_with_Invitation;
