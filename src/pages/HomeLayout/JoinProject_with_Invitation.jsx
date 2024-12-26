import { useParams } from "react-router-dom";
import { useGetInvitationInfoQuery } from "../../redux/api/projectsApi";

const JoinProject_with_Invitation = () => {

    const _id = useParams().token.split("=")[1];

    const {data,isLoading,isError} = useGetInvitationInfoQuery(_id)

    return (
        <div>
            this is a join project with invitation : {_id} 
        </div>
    );
};

export default JoinProject_with_Invitation;