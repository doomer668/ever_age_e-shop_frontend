import React from "react";
import "./InfoPage.css";
import { Link } from "react-router-dom";

const InfoPage: React.FC = () => {
  return (
    <main className="info-page">
      <div className="info-left">
        <div className="gallery">
          <img src="public/info-1.jpg" alt="Info image 1" />
        </div>
      </div>

      <aside className="info-right">
        <h1>Information</h1>
        <p className="lead">
          Doing Stuff
        </p>

        <section>
          <h1>Details</h1>
          <p>
            You can order only around Czech Republic now. Delivery is done via
            Zasilkovna. For more information, please contact our
            support. 
          </p>
        </section>

        <section>
          <h1>More</h1>
          <p>
            <Link to="https://www.instagram.com/5imon.lukac">Instagram</Link>
          </p>
        </section>
      </aside>
    </main>
  );
};

export default InfoPage;