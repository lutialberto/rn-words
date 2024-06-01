import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextApp from '~/components/texts/text/TextApp';

interface Props {
  initialTimeInSeconds: number;
  onTimeEnd: () => void;
}

const TabooCounter = ({onTimeEnd, initialTimeInSeconds}: Props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(initialTimeInSeconds);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
  const formattedTime = `${minutesString}:${secondsString}`;

  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeInSeconds === 0) {
        onTimeEnd();
        clearInterval(interval);
      } else {
        setTimeInSeconds(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeEnd, timeInSeconds]);

  return (
    <>
      <TextApp
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {timeInSeconds !== 0 ? formattedTime : 'Se acabó el tiempo!'}
      </TextApp>
    </>
  );
};

export default TabooCounter;

const styles = StyleSheet.create({});
