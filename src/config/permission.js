export const ALL_PERMISSIONS = {
    STUDENT: {
        GET_PAGINATE: { method: "GET", apiPath: '/students', module: "STUDENT" },
        CREATE: { method: "POST", apiPath: '/students', module: "STUDENT" },
        UPDATE: { method: "PUT", apiPath: '/students', module: "STUDENT" },
        DELETE: { method: "DELETE", apiPath: '/students/{id}', module: "STUDENT" },
    },
    PARENT: {
        GET_PAGINATE: { method: "GET", apiPath: '/parents', module: "PARENT" },
        CREATE: { method: "POST", apiPath: '/parents', module: "PARENT" },
        UPDATE: { method: "PUT", apiPath: '/parents', module: "PARENT" },
        DELETE: { method: "DELETE", apiPath: '/parents/{id}', module: "PARENT" },
    },
    TEACHER: {
        GET_PAGINATE: { method: "GET", apiPath: '/teachers', module: "TEACHER" },
        CREATE: { method: "POST", apiPath: '/teachers', module: "TEACHER" },
        UPDATE: { method: "PUT", apiPath: '/teachers', module: "TEACHER" },
        DELETE: { method: "DELETE", apiPath: '/teachers/{id}', module: "TEACHER" },
    },
    SUBJECT: {
        GET_PAGINATE: { method: "GET", apiPath: '/subjects', module: "SUBJECT" },
        CREATE: { method: "POST", apiPath: '/subjects', module: "SUBJECT" },
        UPDATE: { method: "PUT", apiPath: '/subjects', module: "SUBJECT" },
        DELETE: { method: "DELETE", apiPath: '/subjects/{id}', module: "SUBJECT" },
    },
    CAMPUS: {
        GET_PAGINATE: { method: "GET", apiPath: '/campus', module: "CAMPUS" },
        CREATE: { method: "POST", apiPath: '/campus', module: "CAMPUS" },
        UPDATE: { method: "PUT", apiPath: '/campus', module: "CAMPUS" },
        DELETE: { method: "DELETE", apiPath: '/campus/{id}', module: "CAMPUS" },
    },
    CLASS: {
        GET_PAGINATE: { method: "GET", apiPath: '/classes', module: "CLASS" },
        CREATE: { method: "POST", apiPath: '/classes', module: "CLASS" },
        UPDATE: { method: "PUT", apiPath: '/classes', module: "CLASS" },
        DELETE: { method: "DELETE", apiPath: '/classes/{id}', module: "CLASS" },
    },
    SCHEDULE: {
        GET_PAGINATE: { method: "GET", apiPath: '/schedules', module: "SCHEDULE" },
        CREATE: { method: "POST", apiPath: '/schedules', module: "SCHEDULE" },
        UPDATE: { method: "PUT", apiPath: '/schedules', module: "SCHEDULE" },
        DELETE: { method: "DELETE", apiPath: '/schedules/{id}', module: "SCHEDULE" },
    },
    FACILITY: {
        GET_PAGINATE: { method: "GET", apiPath: '/facilities', module: "FACILITY" },
        CREATE: { method: "POST", apiPath: '/facilities', module: "FACILITY" },
        UPDATE: { method: "PUT", apiPath: '/facilities', module: "FACILITY" },
        DELETE: { method: "DELETE", apiPath: '/facilities/{id}', module: "FACILITY" },
    },
    ROLE: {
        GET_PAGINATE: { method: "GET", apiPath: '/roles', module: "ROLE" },
        CREATE: { method: "POST", apiPath: '/roles', module: "ROLE" },
        UPDATE: { method: "PUT", apiPath: '/roles', module: "ROLE" },
        DELETE: { method: "DELETE", apiPath: '/roles/{id}', module: "ROLE" },
    },
    PERMISSION: {
        GET_PAGINATE: { method: "GET", apiPath: '/permissions', module: "PERMISSION" },
        CREATE: { method: "POST", apiPath: '/permissions', module: "PERMISSION" },
        UPDATE: { method: "PUT", apiPath: '/permissions', module: "PERMISSION" },
        DELETE: { method: "DELETE", apiPath: '/permissions/{id}', module: "PERMISSION" },
    },
}