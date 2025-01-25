import PropTypes from "prop-types";
const FeatureCard = ({title,subTitle,children}) => {
  return (
    <div className="feature-card w-80 h-60  p-6 rounded-xl border hover:border-red-300 hover:bg-red-100 hover:scale-105 cursor-pointer duration-500">
      <div className="icon bg-gray-100 w-14 h-14 rounded-lg">
        {children}
      </div>
      <h1 className="feature-card-title text-xl font-[500] mt-6">
        {title}
      </h1>
      <p className="feature-card-subtitle mt-4 text-sm">
        {subTitle}
      </p>
    </div>
  );
};

FeatureCard.propTypes = {title: PropTypes.string, subTitle: PropTypes.string, children: PropTypes.node}

export default FeatureCard;
