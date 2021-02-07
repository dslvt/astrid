import React, { useEffect, useState, useRef } from 'react';
import { usePopper } from 'react-popper';

import s from './style.css';

const Text = (props: any) => {
  const {
    title,
    text,
    currentTime,
    wordsList,
    updateWords,
    deleteWords,
  } = props;
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const [arrowElement, setArrowElement] = useState<any>(null);
  const [visible, setVisibility] = useState(false);
  const [activeElement, setActiveElement] = useState<any>();
  const [additionalUpdate, setAdditionalUpdate] = useState(false);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event: any): any => {
    if (
      referenceElement.current === null ||
      referenceElement.current!.contains(event.target)
    ) {
      return;
    }
    setVisibility(false);
  };

  console.log('reference', referenceElement.current, activeElement);

  const removePunctuation = (removeText: any) => {
    return removeText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()?:]/g, '');
  };

  const saveWord = () => {
    updateWords({ id: activeElement, start: currentTime, end: -1 });
  };

  return (
    <div className={s.text}>
      {text.split(/[\s]/i).map((s: any, index: any): any => {
        const clearWord = removePunctuation(s);
        const id = `${clearWord}$${index}`;
        let color = '';
        if (activeElement === id && visible) {
          color = '#9b51e0';
        } else if (
          id in wordsList &&
          wordsList[id].start <= currentTime &&
          (wordsList[id].end === -1
            ? wordsList[id].start + 0.5 >= currentTime
            : wordsList[id].end)
        ) {
          color = '#2779a7';
        } else {
          color = '#0a171c';
        }
        return (
          <span
            key={`${id}-word`}
            style={{
              color: color,
              fontWeight: id in wordsList ? 'bold' : 'normal',
            }}
            ref={activeElement === id ? referenceElement : null}
            onClick={(e: any) => {
              setVisibility(true);
              setActiveElement(id);
            }}
          >
            {`${s.endsWith(':') && index !== 0 ? '\n' : ''}${s} `}
          </span>
        );
      })}
      <div
        ref={popperElement}
        style={{ ...styles.popper, display: visible ? 'block' : 'none' }}
        // style={styles.popper}
        {...attributes.popper}
      >
        <div className="popper-wrapper">
          <button
            onClick={
              activeElement in wordsList
                ? () => deleteWords(activeElement)
                : saveWord
            }
          >
            {activeElement in wordsList ? 'Delete?' : 'Save?'}
          </button>
        </div>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
};

export default Text;
