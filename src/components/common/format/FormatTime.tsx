import React from 'react';

import moment from 'moment';

interface FormatTimeProps {
  timestamp: string | number;
  formatTimestamp?: string;
}

const renderTime = (time: string | number, format?: string) => {
  const overrideFormat = format || 'DD/MM/YYYY HH:mm';
  return moment(time).format(overrideFormat);
};

const FormatTime: React.FC<FormatTimeProps> = ({ timestamp, formatTimestamp }) => {
  const invalidTimestamp = timestamp.toString().trim() === '' || timestamp === 0;
  return <>{invalidTimestamp ? '' : renderTime(timestamp, formatTimestamp)}</>;
};

export default FormatTime;
