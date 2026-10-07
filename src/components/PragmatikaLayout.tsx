import React from 'react';
import { PragmatikaHomeUI, PragmatikaHomeUIProps } from './PragmatikaHomeUI';

export const PragmatikaLayout: React.FC<PragmatikaHomeUIProps> = (props) => {
  return <PragmatikaHomeUI {...props} />;
};

export default PragmatikaLayout;
