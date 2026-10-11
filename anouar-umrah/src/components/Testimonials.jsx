import { useEffect, useRef, useState } from 'react';
import { videoTestimonials, audioTestimonials } from '../data/testimonials.js';
import { Play, Pause, Mic } from './Icons.jsx';

const fmt = (s) => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};

// مشغّل فيسبوك الرسمي: يقبل رابط الفيديو أو الريلز كما هو
const facebookEmbed = (url) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=360`;

function VideoCard({ item }) {
  const ready = item.src || item.youtubeId || item.facebook;
  return (
    <figure className={`video-card ${ready ? '' : 'is-empty'}`}>
      <div className="video-frame">
        {item.facebook ? (
          <iframe
            src={facebookEmbed(item.facebook)}
            title={item.name || 'شهادة معتمر'}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : item.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}`}
            title={item.name || 'شهادة معتمر'}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : item.src ? (
          <video src={item.src} poster={item.poster || undefined} controls preload="metadata" playsInline />
        ) : (
          <div className="video-placeholder">
            <span className="play-circle"><Play /></span>
            <small>فيديو شهادة معتمر – قريباً</small>
          </div>
        )}
      </div>
      {(item.name || item.trip) && (
        <figcaption>
          <strong>{item.name}</strong>
          {item.trip && <small>{item.trip}</small>}
        </figcaption>
      )}
    </figure>
  );
}

function AudioCard({ item, activeId, setActiveId }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  // إيقاف التسجيل عند تشغيل تسجيل آخر
  useEffect(() => {
    if (activeId !== item.id && ref.current && !ref.current.paused) ref.current.pause();
  }, [activeId, item.id]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) { setActiveId(item.id); a.play(); } else a.pause();
  };

  const seek = (e) => {
    const a = ref.current;
    if (!a || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (rect.right - e.clientX) / rect.width; // RTL
    a.currentTime = Math.max(0, Math.min(1, ratio)) * dur;
  };

  const pct = dur ? (time / dur) * 100 : 0;

  if (!item.src) {
    return (
      <div className="audio-card is-empty">
        <span className="audio-btn"><Mic /></span>
        <div className="audio-meta">
          <strong>تسجيل صوتي – قريباً</strong>
          <div className="wave" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ height: `${20 + ((i * 37) % 70)}%` }} />)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`audio-card ${playing ? 'is-playing' : ''}`}>
      <button className="audio-btn" onClick={toggle} aria-label={playing ? 'إيقاف' : 'تشغيل'}>
        {playing ? <Pause /> : <Play />}
      </button>
      <div className="audio-meta">
        <strong>{item.name || 'شهادة معتمر'}</strong>
        {item.trip && <small>{item.trip}</small>}
        <div className="audio-bar" onClick={seek} role="slider" aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)} tabIndex={0}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <span className="audio-time">{fmt(time)} / {fmt(dur)}</span>
      </div>
      <audio
        ref={ref}
        src={item.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
    </div>
  );
}

export default function Testimonials() {
  const [activeId, setActiveId] = useState(null);
  const [tab, setTab] = useState('video');

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <header className="section-head light reveal">
          <span className="eyebrow">آراء المعتمرين</span>
          <h2>شهادات من عاشوا التجربة معنا</h2>
          <p>استمع وشاهد ما يقوله ضيوف الرحمن الذين سافروا مع أنوار الصباح – فرع الرغاية.</p>
        </header>

        <div className="tabs reveal" role="tablist">
          <button role="tab" aria-selected={tab === 'video'} className={tab === 'video' ? 'active' : ''} onClick={() => setTab('video')}>
            <Play width="16" height="16" /> فيديوهات
          </button>
          <button role="tab" aria-selected={tab === 'audio'} className={tab === 'audio' ? 'active' : ''} onClick={() => setTab('audio')}>
            <Mic width="16" height="16" /> تسجيلات صوتية
          </button>
        </div>

        {tab === 'video' ? (
          <div className="videos-grid">
            {videoTestimonials.map((v, i) => <div className="reveal" style={{ '--i': i }} key={v.id}><VideoCard item={v} /></div>)}
          </div>
        ) : (
          <div className="audios-grid">
            {audioTestimonials.map((a, i) => <div className="reveal" style={{ '--i': i }} key={a.id}><AudioCard item={a} activeId={activeId} setActiveId={setActiveId} /></div>)}
          </div>
        )}
      </div>
    </section>
  );
}
