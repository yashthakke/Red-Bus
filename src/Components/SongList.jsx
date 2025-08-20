import React, { useContext } from 'react';
import { SongContext } from './SongContext';

export const SongList = () => {
  const { songs, addToPlaylist } = useContext(SongContext);

  return (
    <div className="row">
      {songs.map((track) => (
        <div className="col-md-4 col-lg-3 mb-4" key={track.id}>
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <img
              src={track.thumbnail}
              alt="Not available right now"
              className="card-img-top rounded-top-4"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{track.name}</h5>
              <p className="card-text text-muted">by {track.artist}</p>
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={() => addToPlaylist(track)}
              >
                ➕ Add to Playlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
