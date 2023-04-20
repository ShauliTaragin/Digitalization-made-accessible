server_ip = '127.0.0.1'

function get_guide(domain_name, guide_name) {
    return new Promise((resolve, reject) => {
        const guide_url = `https://${server_ip}/guide/${domain_name}/${guide_name}`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', guide_url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data); 
                } else {
                    reject(new Error('Request failed'));
                }
            }
        };
        xhr.send();
    });
}