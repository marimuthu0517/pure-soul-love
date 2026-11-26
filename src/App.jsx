import React, { useEffect, useState } from "react";

const memories = [
  { src: "/images/harshiii-01.png", alt: "Harshiii smiling in a blue outfit", caption: "A smile worth saving", note: "Some moments are beautiful simply because they are yours." },
  { src: "/images/harshiii-02.png", alt: "A quiet black and white portrait of Harshiii", caption: "The quiet little moments", note: "Even the simplest memories find a special place in the heart." },
  { src: "/images/harshiii-03.png", alt: "Harshiii looking back with a pink hair bow", caption: "A little sparkle", note: "Keep being your lovely, wonderfully original self." },
  { src: "/images/harshiii-04.png", alt: "Harshiii enjoying the view outdoors", caption: "Chasing peaceful days", note: "May life always give you beautiful places to see and dreams to follow." },
  { src: "/images/harshiii-05.png", alt: "Harshiii among green tea plants", caption: "A memory in green", note: "A reminder to pause, breathe, and enjoy the little things." },
  { src: "/images/harshiii-06.png", alt: "Harshiii holding a flower", caption: "A flower for you", note: "A little reminder that you deserve kindness, always." },
];

const reasons = [
  "You make people feel seen and valued.",
  "Your kindness leaves a mark in quiet ways.",
  "You bring your own light into every room.",
  "You deserve the same care you give others.",
  "You are wonderfully, completely yourself.",
  "The world is better with you in it.",
];

function Petals() {
  return <div className="petal-field" aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => <span className="petal" key={i} style={{
      left: `${(i * 37) % 100}%`,
      animationDelay: `${(i % 9) * -1.7}s`,
      animationDuration: `${13 + (i % 6) * 2}s`,
      transform: `scale(${0.55 + (i % 4) * 0.16})`
    }} />)}
  </div>;
}

function App() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [poppingHearts, setPoppingHearts] = useState([]);

  const popHeart = (event) => {
    const id = `${Date.now()}-${Math.random()}`;
    const heart = {
      id,
      x: event.clientX,
      y: event.clientY,
      symbol: ["♥", "♡", "💗", "💕"][Math.floor(Math.random() * 4)],
      size: 18 + Math.random() * 20,
      tilt: -25 + Math.random() * 50
    };
    setPoppingHearts((current) => [...current, heart]);
    window.setTimeout(() => {
      setPoppingHearts((current) => current.filter((item) => item.id !== id));
    }, 1050);
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main onPointerDown={popHeart}>
      <Petals />
      <div className="click-heart-layer" aria-hidden="true">
        {poppingHearts.map((heart) => <span
          className="click-heart"
          key={heart.id}
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            "--heart-tilt": `${heart.tilt}deg`
          }}
        >{heart.symbol}</span>)}
      </div>
      <nav className="nav">
        <a className="brand" href="#home">pure soul <span>♡</span></a>
        <div className="nav-links">
          <a href="#memories">Memories</a>
          <a href="#letter">A letter</a>
          <a href="#reasons">Why you're special</a>
        </div>
      </nav>

      <section className="hero section" id="home">
        <div className="hero-glow" />
        <div className="eyebrow"><span /> A LITTLE SURPRISE, MADE WITH LOVE <span /></div>
        <p className="pretitle">For someone truly special</p>
        <h1>Dear <em>Hanshii,</em><br />you are a little bit of <span className="script">sunshine</span><br />in this world.</h1>
        <p className="hero-copy">A small corner of the internet, created to remind you how loved, appreciated, and important you are.</p>
        <a className="primary-button" href="#letter">There is a letter for you <span>↓</span></a>
        <div className="hero-note">made with a whole lot of love <span>♡</span></div>
        <div className="hero-flower flower-one">✿</div>
        <div className="hero-flower flower-two">✿</div>
      </section>

      <section className="intro section reveal">
        <p className="eyebrow">A gentle reminder</p>
        <h2>Some people make life<br /><em>feel a little kinder.</em></h2>
        <p className="section-copy">And you, Hanshii, are one of those people. You don't need to do anything extraordinary to be appreciated. Just being you is already something beautiful.</p>
        <div className="tiny-heart">♡</div>
      </section>

      <section className="memories section" id="memories">
        <div className="section-heading reveal">
          <p className="eyebrow">Little moments, big meaning</p>
          <h2>Things worth <em>keeping.</em></h2>
          <p className="section-copy">Not every precious memory needs a photograph. Some stay in the heart.</p>
        </div>
        <div className="photo-gallery">
          {memories.map((item, index) => <article className="photo-card reveal" key={item.src}>
            <div className="photo-frame">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="photo-index">0{index + 1}</span>
            </div>
            <div className="photo-caption">
              <h3>{item.caption}</h3>
              <p>{item.note}</p>
            </div>
          </article>)}
        </div>
        <p className="photo-note">Six little snapshots, and a thousand more memories still waiting to be made. ♡</p>
      </section>

      <section className="letter-section section" id="letter">
        <div className="letter-wrap reveal">
          <p className="eyebrow">Open when you need a reminder</p>
          <h2>A letter, <em>from the heart.</em></h2>
          <p className="section-copy">A few words that I hope you can carry with you.</p>
          <button className={`envelope ${letterOpen ? "opened" : ""}`} onClick={() => setLetterOpen(!letterOpen)} aria-expanded={letterOpen}>
            <span className="envelope-flap" />
            <span className="envelope-heart">♡</span>
            <span className="envelope-label">{letterOpen ? "With love, always" : "Tap to open your letter"}</span>
          </button>
          {letterOpen && <article className="letter-paper">
            <p className="letter-salutation">My dear Hanshii,</p>
            <p>We may not be connected by blood, but that has never made the bond we share any less real. Family can also be found in the people our hearts choose, and I am grateful that life brought you into mine.</p>
            <p>I may not say it every day, but I hope you know how much you mean to me. Your presence is a gift, your heart is precious, and you deserve to be appreciated for exactly who you are.</p>
            <p>I hope life gives you countless reasons to smile, gives you courage on difficult days, and surrounds you with people who treat your heart gently. Never feel that you have to become someone else to be valued.</p>
            <p>Thank you for being my sister in the way that matters most — through care, connection, and the bond we share. This little website is here to remind you: you matter, you are cherished, and you are loved.</p>
            <p className="letter-signoff">With all my love, <span>♡</span></p>
          </article>}
        </div>
      </section>

      <section className="reasons-section section" id="reasons">
        <div className="section-heading reveal">
          <p className="eyebrow">In case you ever forget</p>
          <h2>Reasons you are <em>special.</em></h2>
          <p className="section-copy">A little collection of reminders, just for you.</p>
        </div>
        <button className="outline-button" onClick={() => setShowReasons(!showReasons)}>
          {showReasons ? "Hide the reminders" : "Show me the reminders"} <span>♡</span>
        </button>
        {showReasons && <div className="reasons-grid">
          {reasons.map((reason, i) => <div className="reason reveal visible" key={reason}><span>♡ 0{i + 1}</span><p>{reason}</p></div>)}
        </div>}
      </section>

      <section className="final-section section reveal">
        <div className="final-orbit">♡</div>
        <p className="eyebrow">One last thing</p>
        <h2>Never forget how<br /><em>much you matter.</em></h2>
        <p className="section-copy">You are not appreciated only on special days. You deserve to feel valued on the ordinary ones, too.</p>
        <button className="primary-button" onClick={() => setShowFinal(!showFinal)}>{showFinal ? "A little more love ♡" : "A final hug in words ♡"}</button>
        {showFinal && <p className="final-message">Whatever life brings, I hope you always find your way back to your own light. Keep being beautifully you, Hanshii. You are loved more than these words can say. ♡</p>}
      </section>

      <footer className="footer">
        <div className="footer-heart">♡</div>
        <p>Made for Hanshii, with love.</p>
        <span>PURE SOUL · ALWAYS LOVED</span>
      </footer>
    </main>
  );
}

export default App;
