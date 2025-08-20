import React from 'react';

export const Playlist = ({ playlist }) => {
  return (
    <div className="mt-5">
      <h3>Your Playlist</h3>
      
        <ul className="list-group">
          {playlist.map((song) => (
            <li  className="list-group-item d-flex align-items-center">
              <img
                src={song.thumbnail}
                alt={song.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
              />
              <div>
                <strong>{song.name}</strong> by {song.artist}
              </div>
              {/* <div>
                <button value={""}>remove</button>
              </div> */}
            </li>
            
          ))}
        </ul>
      
    </div>
  );
};
