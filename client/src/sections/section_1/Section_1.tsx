import React from "react";
import ade from "../../assets/ade.png";
import Hand_sym from "../../assets/SVG_COMPS/Hand_sym";
import "./Section1.css";

function Section_1() {
  const ROW3_TEXT: JSX.Element = (
    <>
      At the intersection of technology and social
      <br />
      justice where curiosity is my protest
    </>
  );

  const BTN_TEXT: JSX.Element = (
    <>
      Hollar at me
      <Hand_sym />
    </>
  );

  return (
    <section className="section-1" id="1">
      <img style={{ width: 650 }} src={ade} alt="self portrait" />
      <div className="sec-1-text-stack">
        <h1 className="main-text">
          Howdy,
          <br />
          I'm Ade
        </h1>
        <h2 className="row-2">Full-stack web developer</h2>
        <p className="row-3">{ROW3_TEXT}</p>
        <button className="hollar-btn">{BTN_TEXT}</button>
      </div>
    </section>
  );
}

export default Section_1;
