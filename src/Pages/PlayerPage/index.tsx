import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import FileContext from '../../utils/file-context';
import Player from '../../Components/Player';
import Text from '../../Components/Text';
import useInterval from '../../utils/useInterval';
import useFile from '../../utils/useFile';

import s from './style.css';
import { Howl } from 'howler';
import { randomBytes } from 'crypto';
import { workerData } from 'worker_threads';

const PlayerPage = () => {
  const history = useHistory();
  const { file, setFile } = useContext(FileContext);
  const [isPlaying, onPlaying] = useState(true);
  const [soundId, setSoundId] = useState(-1);
  const [seek, setSeek] = useState<any>(0);
  const [rate, setRate] = useState(1);
  const [loop, setLoop] = useState(false);
  const {
    title,
    text,
    file: { path },
  } = file;

  const [wordsList, updateWords, deleteWords] = useFile(title);
  const firstUpdate = useRef(true);
  const [sound, _] = useState(new Howl({ src: [path] }));

  useInterval(
    () => {
      setSeek(sound.seek());
    },
    !isPlaying && !firstUpdate.current ? 100 : null
  );

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (isPlaying) {
      sound.pause(soundId);
    } else {
      if (soundId === -1) {
        const id = sound.play();
        setSoundId(id);
      } else {
        sound.play(soundId);
      }
    }
  }, [isPlaying]);

  const onNext = () => {
    let closestWordPosition = 0;
    let closestInterval = 1e10;
    for (const i in wordsList) {
      if (
        seek < wordsList[i].start &&
        wordsList[i].start - seek < closestInterval &&
        wordsList[i].start - seek > 0.5
      ) {
        closestInterval = wordsList[i].start - seek;
        closestWordPosition = wordsList[i].start;
      }
    }

    if (closestInterval === 1e10) {
      closestWordPosition = sound.duration();
    }
    sound.seek(closestWordPosition);
  };

  const onPrev = () => {
    let closestWordPosition = 0;
    let closestInterval = 1e10;
    for (const i in wordsList) {
      if (
        seek > wordsList[i].start &&
        seek - wordsList[i].start < closestInterval &&
        seek - wordsList[i].start > 1
      ) {
        closestInterval = seek - wordsList[i].start;
        closestWordPosition = wordsList[i].start;
      }
    }

    if (closestInterval === 1e10) {
      closestWordPosition = 0;
    }
    sound.seek(closestWordPosition);
  };

  const changeSeek = (seek: any) => {
    const newSeek = seek * sound.duration();
    sound.seek(newSeek);
    setSeek(newSeek);
  };

  const changeRate = (newRate: any) => {
    sound.rate(newRate, soundId);
    setRate(newRate);
  };

  const changeLoop = (newLoop: any) => {
    sound.loop(newLoop);
    setLoop(newLoop);
  };

  return (
    <div className={s.playerPage}>
      <h2 className={s.title}>{title}</h2>
      <button className={s.backButton} onClick={() => history.push('/')}>
        back
      </button>
      <Text
        text={text}
        currentTime={seek}
        title={title}
        wordsList={wordsList}
        updateWords={updateWords}
        deleteWords={deleteWords}
      />
      <div className={s.playerWrapper}>
        <Player
          isPlaying={isPlaying}
          onPlaybackChange={onPlaying}
          hasPrevious={true}
          onPrevious={onPrev}
          hasNext={true}
          onNext={onNext}
          currentTime={seek}
          totalTime={sound.duration()}
          onChange={changeSeek}
          isEnabled={true}
          rate={rate}
          onRate={() => changeRate(rate === 1 ? 0.8 : 1)}
          loop={loop}
          onLoop={() => changeLoop(!loop)}
        />
      </div>
    </div>
  );
};

export default PlayerPage;
