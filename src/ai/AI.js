import React from "react";
import AIimag from "../assest/Chanakya_img.png";
import FAQPage from "../faq/FAQPage";
import './AI.css';

const Ai = () => {

    const handleExploreClick = () => {
        window.location.href = 'http://127.0.0.1:8080'; // Replace with your desired localhost link
      };
    return(


        
    <div> {/*  Parent Div  */}

        <div className="Hero-Container">
            <div className="left-container-ai">

                    <h4>Unleash Your <span>Creativity </span><br/>
                        With The Power Of </h4>
                    <h1> Chanakya AI...</h1>
                    <h5>Meet Chanakya Ai Your gateway to boundless knowledge! <br/>
                        Explore the world's wonders with our AI-powered encyclopedia,<br/> 
                        offering insightful explanations on a vast array of topics
                    </h5>

                    {/* <button className="ai-btn" onClick={handleExploreClick}>Explore</button>  */}

            </div>

            <div class="right-ai-container">
                <img src={AIimag} alt="Chanakya_img"/>
            </div>


        </div>

        {/* Mini Hero Section  */}
        <div className="mini-hero-section">

            <div className="container-ai">
                <div className="box-ai">
                    <h3>Cultivate Originality</h3>
                    <p>Unleash your creativity , Seamlessly Enhance Your Unique Knowledge , artworks using our AI and Go Beyond Possibilities in the journey of Stocks and Crypto 
                    </p>
                </div>

                <div className="box-ai box2-ai">
                    <h3>Simplified Mastery</h3>
                    <p>Easy to grasp, rewarding to perfect. Be proficient in getting best content Visualized quickly and efficiently. 
                    </p>
                </div>

                <div className="box-ai">
                    <h3>Visualize</h3>
                    <p>Effortlessly Navigate Complexity, Achieve Proficiency, and Visualize to make Informative Decisions </p>
                </div>
            </div>
        </div>


        <FAQPage/>
    </div>

        
    )
}

export  default Ai;
