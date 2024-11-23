import PropTypes from "prop-types";

const TitleandSub = ({ children, title, subTitle }) => {
  return (
    <div>
      <div className="border border-gray-400 bg-gray-100 rounded-lg p-6 mb-6 ">

      {title && <h3 className="text-3xl text-black">{title}</h3>}
      {subTitle && <p className="mt-3 text-gray-500">{subTitle}</p>}
      </div>
      <div className="">

      {children}
      </div>
    </div>
  );
};

TitleandSub.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
};

TitleandSub.defaultProps = {
  title: "",
  subTitle: "",
  children: null,
};

export default TitleandSub;
