import { useMemo } from "react";
import { useSelector } from "react-redux";
import PDMembersCard from "./PDMembersCard";
import { useGetMultiUserQuery } from "../../../redux/api/userApi";

const PDAllMembers = () => {
    const { projectData } = useSelector(state => state.projectSlice);

    const AllMembersUserId = useMemo(() => 
        projectData?.members?.map(m => m.userId) || [], 
        [projectData]
    );

    const { data } = useGetMultiUserQuery(AllMembersUserId);

    return (
        <div className="border border-gray-300 rounded-lg py-3 ps-3 pe-2 w-2/5">
            <h3 className="font-[500] mb-2 text-lg flex items-center gap-2">Members <span className="text-xs bg-gray-300 rounded-full px-2 py-0.5">{data?.length || 0}</span></h3>
            <div className="flex flex-col gap-3 h-[275px] overflow-y-auto pr-2">
                {/* Members Card */}
                {data?.map(({ _id, image, name, email }) => (
                    <PDMembersCard 
                        key={_id} 
                        image={image} 
                        name={`${name?.firstname} ${name?.lastname}`} 
                        email={email} 
                    />
                ))}
            </div>
        </div>
    );
};

export default PDAllMembers;
