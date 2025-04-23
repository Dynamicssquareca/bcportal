import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = (scrolled / height) * 100;
      setScrollPercentage(percentage);
      setIsVisible(percentage > 10); // Show button and text when scrolled past 10% of page length
    };

    window.addEventListener('scroll', calculateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const progressBarRadius = 30; // Adjust the radius of the progress bar
  const progressBarLength = 2 * Math.PI * progressBarRadius;
  const progress = progressBarLength - (scrollPercentage * progressBarLength) / 100;

  return (
    <>
      <div
        className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
        style={{ position: 'fixed', bottom: '120px', right: '20px', zIndex: 9999, textAlign: 'center', transition: 'opacity 0.5s, transform 0.5s', opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.5)' }}
      >
        <svg width={progressBarRadius * 2} height={progressBarRadius * 2}>
          <circle
            cx={progressBarRadius}
            cy={progressBarRadius}
            r={progressBarRadius - 2} // Adjust the thickness of the progress bar
            fill="none"
            stroke="#ccc"
            strokeWidth="4"
          />
          <circle
            cx={progressBarRadius}
            cy={progressBarRadius}
            r={progressBarRadius - 2} // Adjust the thickness of the progress bar
            fill="none"
            stroke="#00a1e0" // Adjust the color of the progress bar
            strokeWidth="4"
            strokeDasharray={progressBarLength}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform={`rotate(-90 ${progressBarRadius} ${progressBarRadius})`}
          />
          <circle
            cx={progressBarRadius}
            cy={progressBarRadius}
            r={progressBarRadius - 6} // Adjust the radius of the back to top circle button
            fill="#00a1e0" // Adjust the color of the back to top circle button
            style={{ cursor: 'pointer' }}
            onClick={scrollToTop}
          />
          <text
            x={progressBarRadius}
            y={progressBarRadius}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18px" // Adjust the font size of the back to top arrow
            fill="#fff" // Adjust the color of the back to top arrow
            style={{ cursor: 'pointer' }}
            onClick={scrollToTop}
          >
            ↑
          </text>
        </svg>
        <div style={{ marginTop: '5px', fontSize: '12px', color: '#000',fontWeight:'600' }}>
          {Math.round(scrollPercentage)}%
        </div>
      </div>
    </>
  );
};

export default ScrollToTopButton;
