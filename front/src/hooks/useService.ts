import React from 'react';
import { getService } from '../services';

export const useService = <T extends any>(Service: new () => T) => {
  const { current } = React.useRef(getService(Service));
  return current;
};