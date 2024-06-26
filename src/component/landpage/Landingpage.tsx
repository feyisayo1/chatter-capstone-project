import "./landingpage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      // offset: 200,
      duration: 600,
      // easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])


  return (
    <div className="herosection" id="herosection">
      <div>
        <div>
          <div data-aos="fade-down" >
            <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
            <p>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
          <Link to="/feeds"  data-aos="fade-up" >Explore</Link>
        </div>
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <section className="section2" id ="about" >
      <div  data-aos="fade-right" >
        <h2>About Chatter</h2>
        <p>
          Chatter is a multi-functional platform where authors and readers can
          have access to their own content. It aims to be a traditional
          bookworm’s heaven and a blog to get access to more text based content.
          Our vision is to foster an inclusive and vibrant community where
          diversity is celebrated. We encourage open-mindedness and respect for
          all individuals, regardless of their backgrounds or beliefs. By
          promoting dialogue and understanding, we strive{" "}
        </p>
      </div>
      <div  data-aos="fade-left" ></div>
    </section>
  );
};

const Section3 = () => {
  return (
    <section className="section3" id="contact">
      <div  data-aos="fade-down" >
        <h2>Why you should join chatter</h2>
        <p>
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>
      </div>
      <div>
        <div  data-aos="flip-up" >
          <svg
            width="92"
            height="88"
            viewBox="0 0 92 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="46"
              cy="44"
              rx="46"
              ry="44"
              fill="#D6D1F8"
              fillOpacity="0.2"
            />
          </svg>
          <h3>Analytics</h3>
          <p>
            Analytics to track the number of views, likes and comment and also
            analyze the performance of your articles over a period of time
          </p>
        </div>
        <div data-aos="flip-up">
          <svg
            width="92"
            height="88"
            viewBox="0 0 92 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 39C41.0609 39 42.0783 38.5786 42.8284 37.8284C43.5786 37.0783 44 36.0609 44 35C44 33.9391 43.5786 32.9217 42.8284 32.1716C42.0783 31.4214 41.0609 31 40 31C38.9391 31 37.9217 31.4214 37.1716 32.1716C36.4214 32.9217 36 33.9391 36 35C36 36.0609 36.4214 37.0783 37.1716 37.8284C37.9217 38.5786 38.9391 39 40 39ZM32 43.5C32 42.837 32.2634 42.2011 32.7322 41.7322C33.2011 41.2634 33.837 41 34.5 41H40.875C40.6264 41.6375 40.4992 42.3158 40.5 43C40.5 44.86 41.423 46.505 42.837 47.5H40.5C39.7687 47.4999 39.0514 47.7003 38.4261 48.0793C37.8007 48.4584 37.2912 49.0016 36.953 49.65C35.037 49.157 33.811 48.198 33.054 47.11C32 45.595 32 44.026 32 43.75V43.5ZM55.047 49.65C56.963 49.157 58.189 48.198 58.946 47.11C60 45.595 60 44.025 60 43.75V43.5C60 42.837 59.7366 42.2011 59.2678 41.7322C58.7989 41.2634 58.163 41 57.5 41H51.125C51.367 41.62 51.5 42.294 51.5 43C51.5 44.86 50.577 46.505 49.163 47.5H51.5C52.2313 47.4999 52.9486 47.7003 53.5739 48.0793C54.1993 48.4584 54.7088 49.0016 55.047 49.65ZM56 35C56 36.0609 55.5786 37.0783 54.8284 37.8284C54.0783 38.5786 53.0609 39 52 39C50.9391 39 49.9217 38.5786 49.1716 37.8284C48.4214 37.0783 48 36.0609 48 35C48 33.9391 48.4214 32.9217 49.1716 32.1716C49.9217 31.4214 50.9391 31 52 31C53.0609 31 54.0783 31.4214 54.8284 32.1716C55.5786 32.9217 56 33.9391 56 35ZM38 51.5C38 50.837 38.2634 50.2011 38.7322 49.7322C39.2011 49.2634 39.837 49 40.5 49H51.5C51.8283 49 52.1534 49.0647 52.4567 49.1903C52.76 49.3159 53.0356 49.5001 53.2678 49.7322C53.4999 49.9644 53.6841 50.24 53.8097 50.5433C53.9353 50.8466 54 51.1717 54 51.5V51.75C54 52.025 54 53.595 52.946 55.11C51.846 56.691 49.756 58 46 58C42.245 58 40.154 56.691 39.054 55.11C38 53.595 38 52.026 38 51.75V51.5ZM46 47C47.0609 47 48.0783 46.5786 48.8284 45.8284C49.5786 45.0783 50 44.0609 50 43C50 41.9391 49.5786 40.9217 48.8284 40.1716C48.0783 39.4214 47.0609 39 46 39C44.9391 39 43.9217 39.4214 43.1716 40.1716C42.4214 40.9217 42 41.9391 42 43C42 44.0609 42.4214 45.0783 43.1716 45.8284C43.9217 46.5786 44.9391 47 46 47Z"
              fill="black"
            />
            <ellipse
              cx="46"
              cy="44"
              rx="46"
              ry="44"
              fill="#D6D1F8"
              fillOpacity="0.2"
            />
          </svg>
          <h3>Social interactions</h3>
          <p>
            Users on the platform can interact with posts they like, comment and
            engage in discussions
          </p>
        </div>
        <div data-aos="flip-up">
          <svg
            width="92"
            height="88"
            viewBox="0 0 92 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="46"
              cy="44"
              rx="46"
              ry="44"
              fill="#D6D1F8"
              fillOpacity="0.2"
            />
          </svg>
          <h3>Content creation</h3>
          <p>
            Write nice and appealing with our in-built markdown, a rich text
            editor
          </p>
        </div>
      </div>
    </section>
  );
};

const Section4 = () => {
  return (
    <section className="section4">
      <div data-aos="fade-right" ></div>
      <div data-aos="fade-left" >
        <div>
          <p>
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <span>
            <h4>Adebobola Muhydeen, </h4>
            <p>Software developer at Apple </p>
          </span>
        </div>
        <Link to= '/sign-up' data-aos="fade-up" >Join chatter</Link>
      </div>
    </section>
  );
};

const Section5 = () => {
  return (
    <section className="section5">
      <div data-aos="fade-right" >
        <div>
          <div data-aos="flip-left" ></div>
          <div data-aos="flip-left"></div>
        </div>
        <div data-aos="flip-left"></div>
      </div>
      <div data-aos="fade-left" >
        <div>
          <h2>Write, read and connect with great minds on chatter</h2>
          <p>
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals{" "}
          </p>
        </div>
        <Link to= "/feeds" data-aos="fade-up" >See For Your Self</Link>
      </div>
    </section>
  );
};

function Landingpage() {
  return (
    <>
      <Header />
      <div id="landingpage">
        <HeroSection />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Footer />
      </div>
    </>
  );
}

export default Landingpage;
