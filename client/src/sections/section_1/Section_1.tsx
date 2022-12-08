import React from "react";
import ade from "../../assets/ade_2.png";
import Hand_sym from "../../assets/SVG_COMPS/Hand_sym";
import "./Section1.css";
import { PopUpPackage } from "../../assets/exportables";

function Section_1({popUpPackage}:any) {
  
  const {togglePopUp}:PopUpPackage = popUpPackage

  const ROW3_TEXT: JSX.Element = (
    <>
      Creating 
      smart designs for an
      <br />
      effortless user experience.
    </>
  );

  const BTN_TEXT: JSX.Element = (
    <>
      Hollar at me
      <Hand_sym color='white'/>
    </>
  );

  return (
    <section className="section-1" id="1">
      <img style={{ width: 650 }} src={ade} alt="self portrait" />
      <div className="sec-1-text-stack">
        <h1 className="main-text">
          Software<br/>Engineer
        </h1>
        <h2 className="row-2">Full-stack web developer</h2>
        <p className="row-3">{ROW3_TEXT}</p>
        <button onClick={()=>togglePopUp()} className="hollar-btn">{BTN_TEXT}</button>
      </div>
    </section>
  );
}

export default Section_1;
