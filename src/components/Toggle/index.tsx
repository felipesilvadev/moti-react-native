import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

import { AnimatePresence, MotiView, useAnimationState } from 'moti';

import { styles } from './styles';
import { theme } from '../../styles/theme';

export function Toggle() {
  const [toggleIsOpened, setToggleIsOpened] = useState(false);

  const toggleAnimationState = useAnimationState({
    closed: {
      height: 70,
    },
    opened: {
      height: 170,
    }
  });

  function handleOpenToggle() {
    toggleAnimationState.transitionTo('opened');
    setToggleIsOpened(prevState => !prevState);
  }
  
  function handleCloseToggle() {
    toggleAnimationState.transitionTo('closed');
    setToggleIsOpened(prevState => !prevState);
  }

  return (
    <MotiView 
      style={styles.container}
      state={toggleAnimationState}
    >
      <Pressable
        onPressIn={handleOpenToggle}
        onPressOut={handleCloseToggle}
      >
        {toggleIsOpened ? (
          <AnimatePresence>
            <MotiView
              from={{
                rotate: '0deg',
                opacity: 0,
              }}
              animate={{
                rotate: '90deg',
                opacity: 1,
              }}
              transition={{
                type: 'timing',
              }}
            >
              <Feather
                name="x"
                color={theme.colors.white}
                size={24}
              />
            </MotiView>
          </AnimatePresence>
        ) : (
          <MotiView
            from={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [
                { value: 0, type: 'timing' },
                { value: 1.1, type: 'spring' },
                { value: 1, type: 'timing' },
              ],
              opacity: 1
            }}
          >
            <Feather
              name="tag"
              color={theme.colors.white}
              size={24}
            />
          </MotiView>
        )}  
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.label}>
          Calories
        </Text>

        <Text style={styles.value}>
          150
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>
          Weight
        </Text>

        <Text style={styles.value}>
          190g
        </Text>
      </View>
    </MotiView >
  );
}