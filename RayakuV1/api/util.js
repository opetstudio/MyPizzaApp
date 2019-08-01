import { proxyName } from '../conf';

export const fetchProgress = (url, uuid, onProgress) => {
    console.log('[util] fetchProgress uuid ', uuid);
    console.log('[util] fetchProgress url ', url);
    let interval = null;
    const start = () => {
        const req = new XMLHttpRequest();
        req.open('GET', url, 1);
        req.setRequestHeader('X-Progress-ID', uuid);
        req.onreadystatechange = (par1) => {
            // console.log('[util] fetchProgress onreadystatechange req.readyState=', req.readyState);
            // console.log('[util] fetchProgress onreadystatechange req=', req);
            // console.log('[util] fetchProgress req.readyState=', req.readyState);
            // console.log('[util] fetchProgress req.status=', req.status);
            if (req.readyState === 4) {
                if (req.status === 200) {
                    /* poor-man JSON parser */
                    //    var upload = eval(req.responseText);
                    try {
                        const upload = eval(req.responseText);

                        console.log('uploadss=>', req.responseText);
                    
                        //    document.getElementById('tp').innerHTML = upload.state;

                        let w = 0;
                        /* change the width if the inner progress-bar */
                        if (upload.state === 'uploading') {
                        // if (upload.state === 'done' || upload.state === 'uploading') {
                            // bar = document.getElementById('progressbar');
                            // w = 100 * (upload.received / upload.size);
                            // console.log('upload.received=', upload.received);
                            onProgress({ loaded: parseInt(upload.received, 10), total: parseInt(upload.size, 10) });
                            // bar.style.width = w + 'px';
                        }
                        /* we are done, stop the interval */
                        if (upload.state === 'done' || upload.state === 'error') {
                                // console.log('stop interval');
                                clearTimeout(interval);
                                interval = null;
                                onProgress({ loaded: 100, total: 100 });
                                // console.log('okeeee');
                        }
                    } catch (e) {
                        //
                        // console.log('errorrrr===>', e);
                    }
                    // console.log('w===>', w);
                }
            }
        };
        req.send(null);
    };

    interval = setInterval(() => {
        start();
    }, 1000);
   };

export const futch = (url, opts = {}, onProgress) => {
    const endpointProgress = 'https://api.rayaku.id/progress';
    // //console.log(url, opts)
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        if (opts.headers) {
            for(var k in (opts.headers || {})) {
                    xhr.setRequestHeader(k, opts.headers[k]);
            }
        }
        xhr.onload = (e) => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress) {
            if (proxyName !== 'nginx') xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        }
        xhr.send(opts.body);
        if (proxyName === 'nginx') fetchProgress(endpointProgress, opts.progressid, onProgress);
    });
};
