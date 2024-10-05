    import img1 from '/company-logos/logo-one.png'
    import img2 from '/company-logos/logo-two.png'
    import img3 from '/company-logos/logo-three.png'
    import img4 from '/company-logos/logo-four.png'
    import img5 from '/company-logos/logo-five.png'
    import img6 from '/company-logos/logo-six-d2.png'
    const Companies = () => {
        return (
            <section className='slider max-w-[90vw] mx-auto mb-10' style={{'--width':'100px','--height':'50px', '--quantity': '6'}}>
                <div className="list">

                <div className="item" style={{'--position': '1'}}><img src={img1} alt="" /></div>
                <div className="item" style={{'--position': '2'}}><img src={img2} alt="" /></div>
                <div className="item" style={{'--position': '3'}}><img src={img3} alt="" /></div>
                <div className="item" style={{'--position': '4'}}><img src={img4} alt="" /></div>
                <div className="item" style={{'--position': '5'}}><img src={img5} alt="" /></div>
                <div className="item" style={{'--position': '6'}}><img src={img6} alt="" /></div>
                </div>
            </section>
        );
    };

    export default Companies;