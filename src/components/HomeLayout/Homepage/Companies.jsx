import img1 from '/company-logos/logo-one.png'
import img2 from '/company-logos/logo-two.png'
import img3 from '/company-logos/logo-three.png'
import img4 from '/company-logos/logo-four.png'
import img5 from '/company-logos/logo-five.png'
import img6 from '/company-logos/logo-six-d2.png'
const Companies = () => {
    return (
        <div style={{ '--bg-green': 'green', background: 'var(--bg-green)' }} className="py-10">
            here will be the companies
            <img src={img1} alt="company logo" />
            <img src={img2} alt="company logo" />
            <img src={img3} alt="company logo" />
            <img src={img4} alt="company logo" />
            <img src={img5} alt="company logo" />
            <img src={img6} alt="company logo" />
        </div>
    );
};

export default Companies;