import React from "react";
import "./Portfolio.css";

const portfolioItems = [
  { id: 1, title: "Pointer Pointer", author: "", img: "/images/pointer pointer.jpg"},
  { id: 2, title: "Neal.fun", author: "", img: "/images/Neal-fun.jpg" },
  { id: 3, title: "AutoDraw", author: "", img: "/images/Auto Draw.jpg" },
  { id: 4, title: "Patatap", author: "", img: "/images/patatap.jpg" },
  { id: 5, title: "2048 Game", author: "", img: "/images/2048 Game.jpg" },
  { id: 6, title: "FutureMe", author: "", img: "/images/Futureme.jpg"},
  { id: 7, title: "Omni Calculator", author: "", img: "/images/omnicalculator.jpg"},
  { id: 8, title: "Adobe Portfolio", author: "", img: "images/Adobeportfolio.jpg"},
  { id: 9, title: "Behance", author: "", img: "images/Behance.jpg"},
  { id: 10, title: "Carbonmade", author: "", img: "images/Carbonmade.jpg"},
  { id: 11, title: "Dribble", author: "", img: "images/Dribble.jpg" },
  { id: 12, title: "Zoom Quilt", author: "", img: "images/portfolio.jpg" },
  
];

function Portfolio() {
  return (
    <div className="portfolio">
      <h1>Portfolio Websites</h1>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div className="portfolio-card" key={item.id}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.img} alt={item.title} />
            </a>
            <div className="portfolio-info">
              <h3>{item.title}</h3>
              {item.author && <p>{item.author}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
