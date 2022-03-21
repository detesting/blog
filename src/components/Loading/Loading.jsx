import React from 'react';
import { Spin } from 'antd';

import './Loading.css';

export default function Loading() {
  return <Spin size="large" className="spinner" />;
}
