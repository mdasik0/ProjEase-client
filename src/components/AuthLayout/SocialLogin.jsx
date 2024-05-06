import googleIcon from "/public/auth/google.png"
const SocialLogin = () => {
    return (
        <>
            {/* google */}
            <div className="flex items-center gap-3 border-2 border-gray-300 p-2 rounded-full w-fit pr-6 hover:bg-gray-300 duration-500 cursor-pointer">
                <img className="w-7 h-7 object-cover" alt="google social icon" src={googleIcon} />
                <span className="text-black dark:text-white dark:hover:text-black">Login with Google</span>
            </div>
        </>
    );
};

export default SocialLogin;