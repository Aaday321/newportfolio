import React from 'react'
import CSS from 'csstype'

interface SectionProps{
    sectionTitle: JSX.Element;
    sectionNumber: number;
    backgroundColor?: string;
    background?: string;
    textColor?: string
}

function Section_Header({
    sectionTitle,
    sectionNumber,
    backgroundColor,
    background,
    textColor
}:SectionProps) {

    const styles:CSS.Properties = {
        backgroundColor,
        background
    }

  return (
    <div
        className="section-header"
        style={styles}    
    >
        <h1  className="section-number" style={{color:textColor || 'black', borderRight: `2px solid ${textColor || 'black'}` }}>
            {`${sectionNumber}`}
        </h1>
        <h2 className="section-title" style={{color:textColor || 'black'}}>
            {sectionTitle}
        </h2>
    </div>
  )
}

export default Section_Header