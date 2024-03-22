import { useEffect, useState } from "react";
import "../styles/feedcontentheader.css";

const FeedContentHeader = () => {
  let [sliderElement, setSliderElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // this format is to store the slider in the useSate of slider element so that i can change the position later on
    let slider = document.getElementById("feed-content-header");
    sliderElement = slider;
    setSliderElement(sliderElement);

    // this format below is to make the slider be directly under the featured button when the page loads
    let firstbutton = document.getElementById("feed-content-header")
      ?.children[1];
    if (sliderElement && firstbutton) {
      (sliderElement.lastElementChild as HTMLElement).style.left =
        (firstbutton as HTMLElement).offsetLeft + "px";
      (sliderElement.lastElementChild as HTMLElement).style.width =
        (firstbutton as HTMLElement).offsetWidth + "px";
    }
  },[]);

  const changeSliderPosition = (e: any) => {
    if (sliderElement) {
      // e.target.style.color = "#543ee0";
      // (sliderElement as HTMLElement).forEach((e:any) => {});
      (sliderElement.lastElementChild as HTMLElement).style.left =
        e.target.offsetLeft + "px";
      (sliderElement.lastElementChild as HTMLElement).style.width =
        e.target.offsetWidth + "px";
    }
  };
  return (
    <section id="feed-content-header">
      <button onClick={changeSliderPosition}>For You </button>
      <button onClick={changeSliderPosition}>Featured</button>
      <button onClick={changeSliderPosition}>Recent</button>
      <span></span>
    </section>
  );
};

export default FeedContentHeader;
