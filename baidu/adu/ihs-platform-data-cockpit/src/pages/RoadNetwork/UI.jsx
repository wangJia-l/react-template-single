import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from 'antd';
import { breadList } from './config';
import ChartAnalysis from '@/pages/ChartAnalysis';
import SmartReports from '@/pages/SmartReports/UI';
import RankLinkageQuery from './components/RankLinkageQuery/UI';
import Continuity from './components/DrillChart/UI';

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
        {
            type: 'RANK_LINKAGE',
            name: '排名与联动查询',
        },
        {
            type: 'RANK_CONTINUITY',
            name: '多维度连续钻取',
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
                nav === 'SMART_REPOERTS' && (<SmartReports history={history} subjectIndex={1} />)
            }
            {
                nav === 'CHART_ANALYSIS' && (<ChartAnalysis history={history} subjectIndex={1} />)
            }
            {
                nav === 'RANK_LINKAGE' && (<RankLinkageQuery history={history} />)
            }
            {
                nav === 'RANK_CONTINUITY' && (<Continuity history={history} />)
            }
        </div>
    );
};

export default React.memo(RoadNetwork);
