import PDMembersCard from "./PDMembersCard";

const PDAllMembers = () => {
    return (
        <div className="border border-gray-300 rounded-lg py-3 ps-3 pe-2 w-2/5">
              <h3 className="font-[500] mb-2 text-lg">Members</h3>
              <div className="flex flex-col gap-3 h-[275px] overflow-y-auto pr-2">
                {/* Mambers Card */}
                <PDMembersCard />
                
                
              </div>
            </div>
    );
};

export default PDAllMembers;