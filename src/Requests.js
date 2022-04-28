import axios from "axios";

let host = "http://localhost:10001/admin/";

let url = {
    student: host + 'student',
    teacher: host + 'teacher',
    homework: host + 'homework',
    source_download_history: host + 'source_download_history',
    visit_history: host + 'visit_history',
    subject: host + 'subject',
    homework_submit_history: host + 'homework_submit_history',
    login_history: host + 'login_history',
    university: host + 'university',
}

let Request = {
    student: {
        get: (body) => {
            return request('get', url.student, body);
        },
        post: (body) => {
            return request('post', url.student, body);
        },
        put: (body) => {
            return request('put', url.student, body);
        },
        delete: (body) => {
            return request('delete', url.student, body);
        }
    },
    teacher: {
        get: (body) => {
            return request('get', url.teacher, body);
        },
        post: (body) => {
            return request('post', url.teacher, body);
        },
        put: (body) => {
            return request('put', url.teacher, body);
        },
        delete: (body) => {
            return request('delete', url.teacher, body);
        }
    },
    homework: {
        get: (body) => {
            return request('get', url.homework, body);
        },
        post: (body) => {
            return request('post', url.homework, body);
        },
        put: (body) => {
            return request('put', url.homework, body);
        },
        delete: (body) => {
            return request('delete', url.homework, body);
        }
    },
    source_download_history: {
        get: (body) => {
            return request('get', url.source_download_history, body);
        },
        post: (body) => {
            return request('post', url.source_download_history, body);
        },
        put: (body) => {
            return request('put', url.source_download_history, body);
        },
        delete: (body) => {
            return request('delete', url.source_download_history, body);
        }
    },
    visit_history: {
        get: (body) => {
            return request('get', url.visit_history, body);
        },
        post: (body) => {
            return request('post', url.visit_history, body);
        },
        put: (body) => {
            return request('put', url.visit_history, body);
        },
        delete: (body) => {
            return request('delete', url.visit_history, body);
        }
    },
    subject: {
        get: (body) => {
            return request('get', url.subject, body);
        },
        post: (body) => {
            return request('post', url.subject, body);
        },
        put: (body) => {
            return request('put', url.subject, body);
        },
        delete: (body) => {
            return request('delete', url.subject, body);
        }
    },
    homework_submit_history: {
        get: (body) => {
            return request('get', url.homework_submit_history, body);
        },
        post: (body) => {
            return request('post', url.homework_submit_history, body);
        },
        put: (body) => {
            return request('put', url.homework_submit_history, body);
        },
        delete: (body) => {
            return request('delete', url.homework_submit_history, body);
        }
    },
    login_history: {
        get: (body) => {
            return request('get', url.login_history, body);
        },
        post: (body) => {
            return request('post', url.login_history, body);
        },
        put: (body) => {
            return request('put', url.login_history, body);
        },
        delete: (body) => {
            return request('delete', url.login_history, body);
        }
    },
    university: {
        get: (body) => {
            return request('get', url.university, body);
        },
        post: (body) => {
            return request('post', url.university, body);
        },
        put: (body) => {
            return request('put', url.university, body);
        },
        delete: (body) => {
            return request('delete', url.university, body);
        }
    }
};

const request = (method, url, data) => {

    let options = {
        url,
        method,
        timeout: 10000,
        headers: {
            "content-type": "application/json"
        },
    }

    if (localStorage.getItem("token")) {
        options.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }

    if (method == "get") {
        options.params = data;
    } else {
        options.data = data;
    }

    return axios(options).catch((error) => {
        throw new Error(error.response.data);
    });

};

export default Request;