import aboutIMge from '../assats/about-img.png';

const About=()=>{
    return(<>

<div className="about-wrap-content">
    <div className='left-side'>

  
<h1>About Hospital</h1>
<div className="p">
    <p>
    has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors has a more-or-less normal distribution of letters, as o
    </p>
<button className=''>Read More</button>
</div>
</div>
<div className='about-image-wrap'>
<img src={aboutIMge} alt="About Image" />
</div>
</div>


    </>)
}
export default About;