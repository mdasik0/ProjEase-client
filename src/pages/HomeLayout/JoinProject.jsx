import { useState } from "react";

const JoinProject = () => {
    const [info, setInfo] = useState({projectId:"",password:""})
    const handleSubmit = (e) => {
e.preventDefault();


console.log(info);
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form className="border border-[#1d1d1d] shadow-lg shadow-[#c4c3c3] p-8 rounded-[10px] w-[350px]" onSubmit={handleSubmit}>
                <h3 className="text-3xl font-semibold mb-3">Join Project</h3>
                <div className="flex flex-col mb-4">
                    <label className="text-sm text-gray-500" htmlFor="projectId">Project Id</label>
                    <input className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5 w-full" onChange={(e)=>{setInfo({...info,projectId:e.target.value})}} type="text" name="projectId" placeholder="Enter your project id" />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm text-gray-500" htmlFor="password">Password</label>
                    <input className="border border-gray-400 mt-1 rounded-[5px] px-2 py-1.5" onChange={(e)=>{setInfo({...info,password:e.target.value})}} type="password" name="password" placeholder="Enter your project password" />
                </div>
                
                <button className="mt-4 text-center rounded-[5px] px-2 py-1.5 bg-[#222222] hover:bg-[#2e2e2e] duration-300  w-full text-white" type="submit">Join</button>
            </form>
        </div>
    );
};

export default JoinProject;