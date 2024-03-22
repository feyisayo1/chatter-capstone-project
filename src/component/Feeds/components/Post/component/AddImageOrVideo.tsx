import "../style/add-image-or-video.css";
import { Image, Video } from "iconsax-react";

interface props {
  renderAll: {
    getHeading: (e: any) => void;
    getParagraph: (e: any) => void;
    nullImageAndVideo: (e: any) => any;
    getVideo: (e1: any , e2 : any) => void;
    getImage: (e1: any , e2 : any) => void;
  };
}

const AddImageOrVideo: React.FC<props> = ({ renderAll }) => {
  return (
    <section id="add-file">
      <label htmlFor="images">
        <Image />
        <input
          type="file"
          alt="Add Images"
          id="images"
          accept="image/*"
          onChange={(e: any) =>
            renderAll.getImage(URL.createObjectURL(e.target.files[0]) , e.target.files && e.target.files[0])
          }
        />
      </label>

      <label htmlFor="video">
        <Video />
        <input
          type="file"
          src=""
          alt="Add Video"
          id="video"
          accept="video/*"
          onChange={(e: any) =>
            renderAll.getVideo(URL.createObjectURL(e.target.files[0]) ,  e.target.files && e.target.files[0])
          }
        />
      </label>

      <span
        className="material-symbols-outlined"
        onClick={renderAll.nullImageAndVideo}
      >
        close
      </span>
    </section>
  );
};

export default AddImageOrVideo;
