import {Dimensions} from 'react-native';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;

/**
 * @description This is a helper constant to get the width of the screen in percentage
 */
export const vw = entireScreenWidth * 0.01;
/**
 * @description This is a helper constant to get the height of the screen in percentage
 */
export const vh = entireScreenHeight * 0.01;
