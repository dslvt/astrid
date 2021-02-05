import React, { useEffect, useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import useFile from '../../utils/useFile';

const Text = (props: any) => {
  const { title, text, currentTime, wordsList, updateWords, deleteWords } = props;
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const [arrowElement, setArrowElement] = useState<any>(null);
  // const [visible, setVisibility] = useState(false);
  const [activeElement, setActiveElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const removePunctuation = (removeText: any) => {
    return removeText.replace(/[.,\/#!$%\^&\*;:{}=\_`~()?:]/g, '');
  };

  const saveWord = () => {
    updateWords({ id: activeElement, start: currentTime, end: -1 });
  };

  return (
    <div className="text">
      {text.split(/[\n\r\s]/i).map((s: any, index: any): any => {
        const clearWord = removePunctuation(s);
        const id = `${clearWord}$${index}`;
        let color = '';
        if (activeElement === id) {
          color = 'red';
        } else if (
          id in wordsList &&
          wordsList[id].start <= currentTime &&
          (wordsList[id].end === -1
            ? wordsList[id].start + 0.5 >= currentTime
            : wordsList[id].end)
        ) {
          color = 'blue';
        } else {
          color = 'black';
        }
        return (
          <span
            key={`${id}-word`}
            style={{
              color: color,
              fontWeight: id in wordsList ? 'bold' : 'normal',
            }}
            ref={activeElement === id ? setReferenceElement : null}
            onClick={(e: any) => {
              console.log(clearWord);
              // setVisibility(!visible);
              setActiveElement(id);
            }}
          >
            {`${s} ${index !== text.split(' ').lenght - 1 && ' '}`}
          </span>
        );
      })}
      <div
        ref={setPopperElement}
        style={{ ...styles.popper, display: true ? 'block' : 'none' }}
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
