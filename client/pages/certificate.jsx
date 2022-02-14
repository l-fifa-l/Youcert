import React from 'react';

export default function Certificate() {
  return (
    <div className="App">
      <Icon />
      <p className="byline">Certificate of completion</p>

      <div className="content">
        <p>Awarded to</p>
        <h1>fifa</h1>
        <p>for completing:</p>
        <h2>web dev</h2>
      </div>

      {1 && (
        <p className="date">
          Issued on <span className="bold">0/0/0</span>
        </p>
      )}
      <style jsx>{`
        .App {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
          color: var(--light-blue);
          background-color: var(--blue);
          background-image: url('data:image/svg+xml;utf8,<svg width="55" height="45" viewBox="0 0 55 45" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5.49121 44.2515C5.49121 40.4116 7.02223 36.7289 9.74745 34.0137C12.4727 31.2985 16.1689 29.7731 20.0229 29.7731C23.877 29.7731 27.5732 31.2985 30.2984 34.0137C33.0236 36.7289 34.5546 40.4116 34.5546 44.2515M20.0229 20.724C20.0229 16.8841 21.5539 13.2014 24.2791 10.4862C27.0044 7.77095 30.7006 6.24554 34.5546 6.24554C38.4087 6.24554 42.1049 7.77095 44.8301 10.4862C47.5553 13.2014 49.0863 16.8841 49.0863 20.724V44.2515" stroke="%230261CC50" stroke-width="11"/></svg>');
          background-size: 160%;
          background-position: 90% 150%;
          background-repeat: no-repeat;
          padding: 2.5rem;
        }

        svg {
          position: absolute;
          top: 0;
        }

        .content {
          position: absolute;
          top: 12rem;
          right: 2.5rem;
          width: 65%;
        }

        .content * {
          margin-bottom: 1rem;
        }

        .content h1 {
          font-family: 'Poppins', sans-serif;
          color: var(--white);
          font-size: 3rem !important;
          line-height: 1;
          margin-bottom: 2rem;
        }

        .content h2 {
          font-size: 2rem !important;
          font-weight: 500;
          line-height: 1;
        }

        .byline {
          position: absolute;
          right: 2.5rem;
        }

        .date {
          position: absolute;
          bottom: 2.5rem;
          font-size: 0.75rem;
        }

        .bold {
          font-weight: 500;
        }
      `}</style>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=Poppins:wght@800&display=swap');
        :root {
          --blue: #0379ff;
          --light-blue: #9ac9ff;
          --dark-blue: #0261cc;
          --white: #fff;
        }

        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'IBM Plex Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}
const Icon = () => (
  <svg
    width="99"
    height="139"
    viewBox="0 0 99 139"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H99V138.406L52.1955 118.324L0 138.406V0Z" fill="white" />
    <path
      d="M25.4912 83.2515C25.4912 79.4116 27.0222 75.7289 29.7474 73.0137C32.4727 70.2985 36.1689 68.7731 40.0229 68.7731C43.877 68.7731 47.5732 70.2985 50.2984 73.0137C53.0236 75.7289 54.5546 79.4116 54.5546 83.2515M40.0229 59.724C40.0229 55.8841 41.5539 52.2014 44.2791 49.4862C47.0044 46.7709 50.7006 45.2455 54.5546 45.2455C58.4087 45.2455 62.1049 46.7709 64.8301 49.4862C67.5553 52.2014 69.0863 55.8841 69.0863 59.724V83.2515"
      stroke="#0379FF"
      strokeWidth="10.6193"
    />
  </svg>
);
