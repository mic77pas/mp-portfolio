'use client';

import { useEffect, useRef } from 'react';
import styles from './DeviceShowcase.module.css';

/**
 * DeviceShowcase
 * Renders a list of projects, each inside a device frame (laptop / phone / tablet)
 * that "powers on" and opens as it scrolls into view.
 *
 * projects: [{
 *   id, title, description, tags: string[], device: 'laptop' | 'phone' | 'tablet',
 *   media: string (path to .mp4/.mov/.gif/.png), reverse?: boolean
 * }]
 */
export default function DeviceShowcase({ projects }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll(`.${styles.project}`);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target;
          const device = section.querySelector('[data-device]');
          const led = section.querySelector('[data-led]');
          const state = section.querySelector('[data-state]');
          const isOn = entry.isIntersecting && entry.intersectionRatio > 0.35;

          device?.classList.toggle(styles.on, isOn);
          led?.classList.toggle(styles.ledOn, isOn);
          if (state) state.textContent = isOn ? 'active' : 'standby';
        });
      },
      { threshold: [0, 0.35, 0.5, 1] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {projects.map((p, i) => (
        <ProjectRow key={p.id} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}

function ProjectRow({ project, index, total }) {
  const { title, description, tags = [], device, media, reverse } = project;

  return (
    <div className={`${styles.project} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.info}>
        <div className={styles.index}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}
        <div className={styles.status}>
          <span data-led className={styles.led} />
          <span data-state>standby</span>
        </div>
      </div>

      <div className={styles.stage}>
        <DeviceFrame type={device} media={media} />
      </div>
    </div>
  );
}

function DeviceFrame({ type, media }) {
  const screen = <ScreenContent media={media} />;

  if (type === 'laptop') {
    return (
      <div data-device className={styles.laptop}>
        <div className={styles.lidWrap}>
          <div className={styles.lid}>
            <div className={styles.screen}>{screen}</div>
          </div>
        </div>
        <div className={styles.base} />
      </div>
    );
  }

  if (type === 'tablet') {
    return (
      <div data-device className={styles.tablet}>
        <div className={styles.tabletFrame}>
          <div className={styles.tabletScreen}>{screen}</div>
        </div>
      </div>
    );
  }

  // default: phone
  return (
    <div data-device className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.phoneFrame}>
        <div className={styles.phoneScreen}>{screen}</div>
      </div>
    </div>
  );
}

function ScreenContent({ media }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(media || '');

  if (isVideo) {
    return (
      <video
        className={styles.media}
        src={media}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return <img className={styles.media} src={media} alt="" />;
}
