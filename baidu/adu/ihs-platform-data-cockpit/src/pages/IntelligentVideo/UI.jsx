import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from 'antd';
import { breadList } from './config';
import ChartAnalysis from '@/pages/ChartAnalysis';
import SmartReports from '@/pages/SmartReports/UI';

import Styles from './UI.module.less';

const RoadNetwork = props => {
    const { history } = props;
    const [nav, setNav] = useState('CHART_ANALYSIS');
    const MENU_LIST = [
        {
            type: 'CHART_ANALYSIS',
            name: '图表分析',
        },
        {
            type: 'SMART_REPOERTS',
            name: '智能报表',
        },
    ];

    return (
        <div className={Styles.RoadNetwork}>
            <Breadcrumb list={breadList} history={history} />
            <div className={'buttonBox'}>
                {
                    MENU_LIST.map(menu => (
                        <Button
                            key={menu.type}
                            type="primary"
                            onClick={() => {
                                setNav(menu.type);
                            }}
                        >{menu.name}
                        </Button>
                    ))
                }
            </div>
            {
                nav === 'SMART_REPOERTS' && (<SmartReports history={history} subjectIndex={2} />)
            }
            {
                nav === 'CHART_ANALYSIS' && (<ChartAnalysis history={history} subjectIndex={2} />)
            }
        </div>
    );
};

export default React.memo(RoadNetwork);
