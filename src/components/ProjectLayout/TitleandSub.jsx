import PropTypes from "prop-types";

const TitleandSub = ({ children, title, subTitle }) => {
  return (
    <div>
      {title && <h3 className="text-3xl mt-4">{title}</h3>}
      {subTitle && <p className="mt-3 text-gray-500">{subTitle}</p>}
      <hr className="my-6 border-gray-600" />
      {children}
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
