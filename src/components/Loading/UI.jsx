/**
 * @file Loading UI
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Styles from './UI.module.less';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Loading extends PureComponent {
    constructor(props) {
        super(props);
        this.domNode = document.createElement('div');
        this.isExistNode = false;
    }

    createNode() {
        const node = (
            <Spin indicator={antIcon} delay={500} />
        );
        return node;
    }

    render(visible) {
        if (!this.isExistNode && visible) {
            document.body.appendChild(this.domNode);
            ReactDOM.render(this.createNode(), this.domNode);
            this.isExistNode = true;
        }
        this.domNode.className = visible ? Styles.aiLoading : [Styles.aiLoading, Styles.hide].join(' ');
        return '';
    }

    show() {
        this.render(true);
    }

    hide() {
        this.render(false);
    }
}

export default new Loading();
