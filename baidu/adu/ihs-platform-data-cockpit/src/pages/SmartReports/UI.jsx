import React, { useState, useEffect } from 'react';
import { Button, Menu } from 'antd';
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import ReportsMain from './components/ReportsMain';
import ReportsHoliday from './components/ReportsHoliday';
import { SUBJECT_DIC } from '@/common/config';

import Styles from './UI.module.less';

const CarRoad = props => {
    const { history, subjectIndex } = props;
    const [nav, setNav] = useState('REPORTS_HOLIDAY');
    const [subject, setSubject] = useState(null);

    const handleClick = e => {
        setNav(e.key);
    };

    const goPrint = () => {
        let title = '智能报表';
        const WIDTH_PAGE = 592.28;
        const HEIGHT_PAGE = 841.89;
        const dom = document.querySelector('#pdfDom');
        const width = dom.offsetWidth;
        const height = dom.offsetHeight;
        const canvasHeight = WIDTH_PAGE / width * height;
        const pdfHeight = Math.ceil(canvasHeight / HEIGHT_PAGE) * HEIGHT_PAGE;
        const addHeight = (width / WIDTH_PAGE) * (pdfHeight - canvasHeight) - 21;
        const addDom = document.createElement('div');
        addDom.style.width = '100%';
        addDom.style.height = `${addHeight}px`;
        addDom.style.backgroundColor = 'rgba(10, 28, 53, 0.5)';
        dom.appendChild(addDom);
        html2Canvas(document.querySelector('#pdfDom'), {
            allowTaint: false,
            backgroundColor: 'rgba(12, 40, 79, 0.7)',
        }).then(function (canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let pageHeight = contentWidth / WIDTH_PAGE * HEIGHT_PAGE;
            let leftHeight = contentHeight;
            let position = 0;
            let imgWidth = 595.28;
            let imgHeight = WIDTH_PAGE / contentWidth * contentHeight;
            let pageData = canvas.toDataURL('image/jpeg', 1.0);
            let PDF = new JsPDF('', 'pt', 'a4');
            const pdfHeight = Math.ceil(imgHeight / HEIGHT_PAGE) * HEIGHT_PAGE;
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, pdfHeight);
            }
            else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= HEIGHT_PAGE;
                    if (leftHeight > 0) {
                        PDF.addPage();
                    }
                }
            }
            PDF.save(title + '.pdf');
            setTimeout(() => {
                dom.removeChild(addDom);
            }, 1000);
        }
        );
    };

    useEffect(() => {
        const _subject = SUBJECT_DIC.find(item => item.subjectIndex === Number(subjectIndex));
        if (_subject) {
            setSubject(_subject);
        }
    }, []);

    return (
        <div className={Styles.SmartReports}>
            <div className={Styles.header}>
                <Menu
                    style={{ width: '100%', lineHeight: '42px' }}
                    onClick={handleClick}
                    selectedKeys={[nav]}
                    mode="horizontal"
                >
                    <Menu.Item key="REPORTS_HOLIDAY">
                        智能报表-节假日报表
                    </Menu.Item>
                    <Menu.Item key="REPORTS_MAIN">
                        {`智能报表${subject && subject.name ? `-${subject.name}` : ''}`}
                    </Menu.Item>
                </Menu>
                {
                    nav === 'REPORTS_MAIN' && (
                        <Button type={'text'} style={{ color: '#B6D1FF' }} onClick={goPrint}>打印</Button>
                    )
                }
            </div>
            {
                nav === 'REPORTS_MAIN' && (
                    <ReportsMain history={history} subjectIndex={subjectIndex} />)
            }
            {
                nav === 'REPORTS_HOLIDAY' && (
                    <ReportsHoliday history={history} />)
            }
        </div>
    );
};

export default React.memo(CarRoad);
