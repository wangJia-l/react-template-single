import React, { useState, useEffect, useRef } from 'react';
import Styles from './UI.module.less';
import * as $echarts from 'echarts';




const BrokenLine = props => {
    const { options } = props;
    const brokenRef = useRef(null);
    useEffect(() => {
        if (brokenRef && brokenRef.current) {
            const echartsInstance = $echarts.init(brokenRef.current);
            echartsInstance.setOption(options);

        }
    }, []);
    useEffect(() => {
        if (brokenRef && brokenRef.current) {
            const echartsInstance = $echarts.init(brokenRef.current);
            echartsInstance.setOption(options);

        }
    }, [options]);
    return (
        <div className={Styles.echartsBox} ref={brokenRef}>
        </div>
    );
};
export default React.memo(BrokenLine);
