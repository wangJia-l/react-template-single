import {Message} from 'element-ui';
import axios from 'axios';

/**
 *
 * @param {请求路径，请求参数，表格名称，导出的条数} obj
 */
export const fileDownLoad = obj => {
    axios({
        method: 'post',
        url: obj.url,
        fileName: obj.name,
        data: {
            ...obj.param,
        },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            console.log(res);
            const aLink = document.createElement('a');
            try {
                var blob = new Blob([res.data], {
                    type: 'text/plain;charset=utf-8',
                });
            }
            catch (e) {
                window.BlobBuilder
                    = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                if (e.name === 'TypeError' && window.BlobBuilder) {
                    let blobbuilder = new BlobBuilder();
                    BlobBuilder.append(res.data);
                    let blobs = blobbuilder.getBlob('application/octet-stream;charset=utf-8');
                    console.log(blobs);
                }
                else {
                    Message.error('浏览器版本较低，暂不支持该文件类型下载');
                }
            }
            aLink.href = URL.createObjectURL(blob);
            aLink.download = `${obj.name}.xls`;
            aLink.click();
            document.body.appendChild(aLink);
            aLink.remove();
            Message.success('下载成功!');
        })
        .catch(error => {
            console.log(error);
        });
};
