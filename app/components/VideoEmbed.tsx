'use client';

import { useState } from 'react';
import styles from './VideoEmbed.module.css';

export function VideoEmbed({
  youtubeId,
  caption,
}: {
  /** Placeholder until a real video is recorded — swap for the real YouTube ID. */
  youtubeId: string;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.wrap}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={caption || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.facade}
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg)` }}
        onClick={() => setPlaying(true)}
        aria-label={caption ? `Play video: ${caption}` : 'Play video'}
      >
        <span className={styles.playBtn}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#0a1635" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        {caption && <span className={styles.caption}>{caption}</span>}
      </button>
    </div>
  );
}
