import React, { useState } from 'react';
import { Direction, FormattedTime, Slider } from 'react-player-controls';
import pause from '../../icons/pause.svg';
import play from '../../icons/play.svg';
import repeatOff from '../../icons/repeat-off.svg';
import repeat from '../../icons/repeat.svg';
import skipNext from '../../icons/skip-next.svg';
import skipPrevious from '../../icons/skip-previous.svg';
import s from './style.css';

// A colored bar that will represent the current value
const SliderBar = ({ value, style }: any) => (
  <div
    style={Object.assign(
      {},
      {
        position: 'absolute',
        background: 'gray',
        borderRadius: 4,
      },
      {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`,
      },
      style
    )}
  />
);

// A handle to indicate the current value
const SliderHandle = ({ value, style }: any) => (
  <div
    style={Object.assign(
      {},
      {
        position: 'absolute',
        width: 16,
        height: 16,
        background: 'green',
        borderRadius: '100%',
        transform: 'scale(1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.3)',
        },
      },
      {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -4,
        marginLeft: -8,
      },
      style
    )}
  />
);

const Player = (props: any) => {
  const {
    isPlaying,
    onPlaybackChange,
    hasPrevious,
    onPrevious,
    hasNext,
    onNext,
    currentTime,
    totalTime,
    onChange,
    isEnabled,
    rate,
    onRate,
    loop,
    onLoop,
  } = props;

  const [lastIntent, onChangeIntent] = useState(0);

  return (
    <div className={s.player}>
      <div className={s.playerControls}>
        <button onClick={onRate}>{rate}</button>
        <button disabled={!hasPrevious} onClick={onPrevious}>
          <img src={skipPrevious} />
        </button>

        <button onClick={() => onPlaybackChange(!isPlaying)}>
          <img src={isPlaying ? play : pause} />
        </button>

        <button disabled={!hasNext} onClick={onNext}>
          <img src={skipNext} />
        </button>

        <button onClick={onLoop}>
          <img src={loop ? repeat : repeatOff} />
        </button>
      </div>
      <div className={s.slider}>
        <FormattedTime numSeconds={currentTime} />
        <Slider
          direction={Direction.HORIZONTAL}
          style={{
            width: 200,
            height: 8,
            borderRadius: 4,
            background: 'whitesmoke',
            transition: 'width 0.1s',
            cursor: isEnabled === true ? 'pointer' : 'default',
          }}
          onChange={onChange}
          onIntent={(intent: any) => onChangeIntent(intent)}
        >
          <SliderBar
            value={currentTime / totalTime}
            style={{ background: isEnabled ? 'green' : 'gray' }}
          />
          <SliderBar
            value={lastIntent}
            style={{ background: 'rgba(0, 0, 0, 0.05)' }}
          />
          <SliderHandle
            value={currentTime / totalTime}
            style={{ background: isEnabled ? 'green' : 'gray' }}
          />
        </Slider>
        <FormattedTime numSeconds={totalTime} />
      </div>
    </div>
  );
};

export default Player;
