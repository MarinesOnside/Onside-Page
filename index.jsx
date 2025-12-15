import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaCaretDown } from 'react-icons/fa';

function TopBar() {
  return (
    <div className="top-bar">
      <span>FOLLOW US</span>
      <a href="https://www.facebook.com/share/17cesvqNoP/" target="_blank" rel="noreferrer" aria-label="facebook"><FaFacebookF /></a>
      <a href="https://www.instagram.com/marinersonsideofficial" target="_blank" rel="noreferrer" aria-label="instagram"><FaInstagram /></a>
      <a href="https://whatsapp.com/channel/0029VbAaRygGpLHRbx1Oov06" target="_blank" rel="noreferrer" aria-label="whatsapp"><FaWhatsapp /></a>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="club-crest" aria-hidden="true" />
      <h1 className="club-name"><TypingText text={"MARINERS ONSIDE"} speed={60} /></h1>
      <p className="club-subtitle"><TypingText text={"Passion finds its home"} /></p>
    </header>
  );
}

function TypingText({ text, speed = 80, className = '' }) {
  const [displayed, setDisplayed] = React.useState('');
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    let i = 0;
    let mounted = true;
    function tick() {
      if (!mounted) return;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i += 1;
        setTimeout(tick, speed);
      } else {
        // mark completed to hide caret
        setCompleted(true);
      }
    }
    // reset when text changes
    setDisplayed('');
    setCompleted(false);
    tick();
    return () => { mounted = false; };
  }, [text, speed]);

  return (
    <span className={`typing ${className}`.trim()}>
      {displayed}
      <span className="typing-caret" aria-hidden="true" style={{ visibility: completed ? 'hidden' : 'visible' }}>&nbsp;</span>
    </span>
  );
}

function Dropdown({ id, label, href, items, activeId, setActiveId }) {
  const isActive = activeId === id;

  function onToggle(e) {
    // On mobile prevent navigation and toggle
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setActiveId(isActive ? null : id);
    }
  }

  return (
    <div className={`dropdown ${isActive ? 'active' : ''}`}>
      <a href={href || '#'} className="dropdown-toggle" onClick={onToggle}>
        {label} <FaCaretDown />
      </a>
      <div className="dropdown-content">
        {items && items.map((it, i) => (
          <a key={i} href={it.href || '#'}>{it.label}</a>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!e.target.closest('.dropdown')) {
        setActiveId(null);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <nav>
      <a href="contact-us.html">CONTACT US</a>

      <Dropdown
        id="fiesta"
        label="FIESTA"
        href="fiesta.html"
        items={[{ label: 'AGM', href: 'agm.html' }, { label: 'FOOTBALL FIESTA', href: 'football.html' }]}
        activeId={activeId}
        setActiveId={setActiveId}
      />

      <Dropdown
        id="memories"
        label="MEMORIES"
        href="memories.html"
        items={[{ label: 'PLAYERS MEET-UP', href: 'player.html' }, { label: 'SOCIAL WORK', href: 'social-work.html' }]}
        activeId={activeId}
        setActiveId={setActiveId}
      />

      <Dropdown
        id="admin"
        label="ADMIN PANEL"
        items={[{ label: 'CORE TEAM', href: 'core.html' }, { label: 'MEDIA TEAM', href: 'media.html' }, { label: 'FIELD TEAM', href: 'field.html' }]}
        activeId={activeId}
        setActiveId={setActiveId}
      />

      <a href="gallery.html">MINDFRAMES</a>
      <a href="test.html">TROPHY ROOM</a>
      <a href="store.html">STORE</a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="join-banner">
        <h1>JOIN WITH US</h1>
      </div>

      <div className="membership-boxes">
        <div className="box">
          <h3>LADY MARINERS</h3>
          <a href="#" className="btn btn-green">CLICK HERE</a>
          <p>FREE MEMBERSHIP</p>
        </div>
        <div className="box">
          <h3>GENERAL MEMBERSHIP</h3>
          <a href="#" className="btn btn-red">CLICK HERE</a>
          <p>YEARLY ₹149</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <TopBar />
      <Header />
      <Nav />
      <Hero />
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}

