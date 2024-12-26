import { useParams } from "react-router-dom";
import { useGetInvitationInfoQuery } from "../../redux/api/projectsApi";
import JoinProject_ERR_int from "../../components/HomeLayout/JoinProject/JoinProject_ERR_int";
import JoinProject_with_INV from "../../components/HomeLayout/JoinProject/JoinProject_with_INV";

const JoinProject_with_Invitation = () => {
  const _id = useParams().token.split("=")[1];

  const { data, isLoading, isError } = useGetInvitationInfoQuery(_id);

  console.log(data);

  return (
    <div className="w-screen h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : isError ? (
        <JoinProject_ERR_int />
      ) : (
        <JoinProject_with_INV data={data} />
      )}
    </div>
  );
};

export default JoinProject_with_Invitation;
