import React, { useState } from 'react';
import { SongContext } from './SongContext';
import { SongList } from './songList';
import { Playlist } from './Playlist';
import { useFieldArray, useForm } from 'react-hook-form'


export const Song = () => {
    const { control } = useForm({
    defaultValues: { play: [] }
  });

   const {fields,append,remove} = useFieldArray({
        control,
        name:"play"
    })
 const [songs] = useState([
   {
    id: 1,
    name: 'Bad Habits',
    artist: 'Ed Sheeran',
    thumbnail: 'https://hips.hearstapps.com/hmg-prod/images/ed-sheeran-GettyImages-494227430_1600.jpg?resize=1200:*',
  },
  {
    id: 2,
    name: 'Levitating',
    artist: 'Dua Lipa',
    thumbnail: 'https://th.bing.com/th/id/OIP.Wvi2jaYu6mf-gBNX5d6UYQHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
 {
    id: 3,
    name: 'MONTERO (Call Me By Your Name)',
    artist: 'Lil Nas X',
    thumbnail: 'https://th.bing.com/th/id/OIP.mVoGKuuPuX5v7vCwOflhrAHaE8?w=300&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
   {
    id: 4,
    name: 'Drivers License',
    artist: 'Olivia Rodrigo',
    thumbnail: 'https://th.bing.com/th/id/OIP.Wr7AAun4jIjCA1mUMORsmgHaHZ?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 5,
    name: 'Peaches',
    artist: 'Justin Bieber',
    thumbnail: 'https://th.bing.com/th/id/OIP.DFg78lTA42WaGioVqtvhnAHaE7?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 6,
    name: 'Save Your Tears',
    artist: 'The Weeknd',
    thumbnail: 'https://th.bing.com/th/id/OIP.yvJ2ZvCAnRWihHDos-xeQgHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 7,
    name: 'As It Was',
    artist: 'Harry Styles',
    thumbnail: 'https://th.bing.com/th/id/OIP.KfIp9KHQfuQBJhmP1YjU1AHaEK?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
 
]);


  const addToPlaylist = (song) => {
  append(song);
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">🎵 Top Songs</h2>
      <SongContext.Provider value={{ songs, addToPlaylist }}>
        <SongList />
        <hr className="my-4" />
        <Playlist playlist={fields} />
      </SongContext.Provider>
    </div>
  );
};