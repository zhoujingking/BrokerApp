import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

const getGraphUrl = (type, code, tradeCenter) => {
  return `https://image.sinajs.cn/newchart/${type}/n/${tradeCenter}${code}.gif`;
}

function EntityKGraph({type, code, tradeCenter, containerStyle}) {
  const uri = getGraphUrl(type, code, tradeCenter);
  return (
    <Image 
      style={{
        ...containerStyle
      }}
      resizeMode="stretch"
      source={{uri}} 
    />
  );
}
EntityKGraph.defaultProps={
  type: 'daily'
};
EntityKGraph.propTypes={
  type: PropTypes.oneOf(['min', 'daily', 'weekly', 'monthly']).isRequired,
  code: PropTypes.string.isRequired,
  tradeCenter: PropTypes.oneOf(['sh', 'sz']).isRequired,
  containerStyle: PropTypes.object
};
export default EntityKGraph;