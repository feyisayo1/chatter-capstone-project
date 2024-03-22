import "../style/article.css";

interface props {
  video: any;
  image: any;
  heading: any;
  paragraph: any;
  renderAll: {
    getHeading: (e: any) => void;
    getParagraph: (e: any) => void;
    getVideo: (e1: any, e2: any) => void;
    getImage: (e1: any, e2: any) => void;
  };
}

const Article: React.FC<props> = ({
  renderAll,
  heading,
  paragraph,
  image,
  video,
}) => {
  const ChooseOne = () => {
    if (image) {
      return (
        <div
          style={{
            background: `url(${image}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        ></div>
      );
    } else if (video) {
      return (
        <video controls>
          <source src={video} type="video/mp4" />
        </video>
      );
    }
  };

  const handleInput = (e: any) => {
    e.target.style.height = "auto"; // Reset height to auto to calculate new height
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div id="ariticle">
      <ChooseOne />
      <input
        type="text"
        id="heading"
        value={heading}
        placeholder="Title"
        onChange={(e: any) => renderAll.getHeading(e.target.value)}
      />
      <textarea
        id="text"
        value={paragraph}
        placeholder="Write a post.........."
        onInput={handleInput}
        onChange={(e: any) => renderAll.getParagraph(e.target.value)}
      />
    </div>
  );
};

export default Article;
