import axios from "./axios.customize";

//module student api
const fetchAllStudentsAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/students?page=${page}&size=${pageSize}&filter=${filter}`
    }
    else {
        URL_BACKEND = `/students?page=${page}&size=${pageSize}`
    }

    return axios.get(URL_BACKEND)
}

const createStudentAPI = (name, gender, birthDate, height, weight, classes, parent) => {
    const URL_BACKEND = "/students"
    const data = {
        name: name,
        gender: gender,
        birthDate: birthDate,
        height: height,
        weight: weight,
        classes: classes,
        parent: parent
    }
    return axios.post(URL_BACKEND, data)
}

const updateStudentAPI = (id, name, gender, birthDate, height, weight, classes, parent) => {
    const URL_BACKEND = "/students"
    const data = {
        id: id,
        name: name,
        gender: gender,
        birthDate: birthDate,
        height: height,
        weight: weight,
        classes: classes,
        parent: parent
    }
    return axios.put(URL_BACKEND, data)
}

const deleteStudentAPI = (id) => {
    const URL_BACKEND = `/students/${id}`
    return axios.delete(URL_BACKEND)
}


//module parent api
const fetchAllParentsAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/parents?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/parents?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const createParentAPI = (name, gender, birthDate, telephone, address, zaloName, facebookName) => {
    const URL_BACKEND = "/parents"
    const data = {
        name: name,
        gender: gender,
        birthDate: birthDate,
        telephone: telephone,
        address: address,
        zaloName: zaloName,
        facebookName: facebookName
    }
    return axios.post(URL_BACKEND, data)
}

const updateParentAPI = (id, name, gender, birthDate, telephone, address, zaloName, facebookName) => {
    const URL_BACKEND = "/parents"
    const data = {
        id: id,
        name: name,
        gender: gender,
        birthDate: birthDate,
        telephone: telephone,
        address: address,
        zaloName: zaloName,
        facebookName: facebookName
    }
    return axios.put(URL_BACKEND, data)
}

const deleteParentAPI = (id) => {
    const URL_BACKEND = `/parents/${id}`
    return axios.delete(URL_BACKEND)
}

const fetchParentById = () => {

}

//module campus api
const fetchAllCampusWithoutPaginationAPI = () => {
    const URL_BACKEND = `/campus`
    return axios.get(URL_BACKEND)
}

const fetchAllCampusAPI = (page, pageSize) => {
    const URL_BACKEND = `/campus?page=${page}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createCampusAPI = (name, address) => {
    const URL_BACKEND = "/campus"
    const data = {
        name: name,
        address: address
    }
    return axios.post(URL_BACKEND, data)
}

const updateCampusAPI = (id, name, address) => {
    const URL_BACKEND = "/campus"
    const data = {
        id: id,
        name: name,
        address: address
    }
    return axios.put(URL_BACKEND, data)
}

const deleteCampusAPI = (id) => {
    const URL_BACKEND = `/campus/${id}`
    return axios.delete(URL_BACKEND)
}

//module subject api
const fetchAllSubjectsWithoutPaginationAPI = () => {
    const URL_BACKEND = `/subjects`
    return axios.get(URL_BACKEND)
}

const fetchAllSubjectsAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/subjects?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/subjects?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const createSubjectAPI = (name, pricePerDay, salaryPerDay) => {
    const URL_BACKEND = "/subjects"
    const data = {
        name: name,
        pricePerDay: pricePerDay,
        salaryPerDay: salaryPerDay
    }
    return axios.post(URL_BACKEND, data)
}

const updateSubjectAPI = (id, name, pricePerDay, salaryPerDay) => {
    const URL_BACKEND = "/subjects"
    const data = {
        id: id,
        name: name,
        pricePerDay: pricePerDay,
        salaryPerDay: salaryPerDay
    }
    return axios.put(URL_BACKEND, data)
}

const deleteSubjectAPI = (id) => {
    const URL_BACKEND = `/subjects/${id}`
    return axios.delete(URL_BACKEND)
}

//module teacher api
const fetchAllTeachersAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/teachers?page=${page}&size=${pageSize}&filter=${filter}`
    }
    else {
        URL_BACKEND = `/teachers?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const createTeacherAPI = (name, gender, birthDate, telephone, address, zaloName, facebookName, subjects) => {
    const URL_BACKEND = "/teachers"
    const data = {
        name: name,
        gender: gender,
        birthDate: birthDate,
        telephone: telephone,
        address: address,
        zaloName: zaloName,
        facebookName: facebookName,
        subjects: subjects
    }
    return axios.post(URL_BACKEND, data)
}

const updateTeacherAPI = (id, name, gender, birthDate, telephone, address, zaloName, facebookName, subjects) => {
    const URL_BACKEND = "/teachers"
    const data = {
        id: id,
        name: name,
        gender: gender,
        birthDate: birthDate,
        telephone: telephone,
        address: address,
        zaloName: zaloName,
        facebookName: facebookName,
        subjects: subjects
    }
    return axios.put(URL_BACKEND, data)
}

const deleteTeacherAPI = (id) => {
    const URL_BACKEND = `/teachers/${id}`
    return axios.delete(URL_BACKEND)
}

//module class api
const fetchAllClassesWithoutPaginationAPI = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/classes?filter=${filter}`
    }
    else {
        URL_BACKEND = `/classes`
    }
    return axios.get(URL_BACKEND)
}

const fetchAllClassesAPI = (page, pageSize) => {
    const URL_BACKEND = `/classes?page=${page}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createClassAPI = (name, subject, teacher, campus) => {
    const URL_BACKEND = "/classes"
    const data = {
        name: name,
        subject: subject,
        teacher: teacher,
        campus: campus
    }
    return axios.post(URL_BACKEND, data)
}

const updateClassAPI = (id, name, subject, teacher, campus) => {
    const URL_BACKEND = "/classes"
    const data = {
        id: id,
        name: name,
        subject: subject,
        teacher: teacher,
        campus: campus
    }
    return axios.put(URL_BACKEND, data)
}

const deleteClassAPI = (id) => {
    const URL_BACKEND = `/classes/${id}`
    return axios.delete(URL_BACKEND)
}

//module auth api
const loginAPI = (email, password) => {
    const URL_BACKEND = "/auth/login"
    const data = {
        username: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/auth/account"
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/auth/logout"
    return axios.post(URL_BACKEND)
}

const getRefreshToken = () => {
    const URL_BACKEND = "/auth/refresh"
    return axios.get(URL_BACKEND)
}

//module schedule api
const fetchScheduleInWeek = (startDate) => {
    const URL_BACKEND = `/schedule?startDate=${startDate}`
    return axios.get(URL_BACKEND)
}

const createScheduleAPI = (classInfo, slotNumber, weekdayList) => {
    const URL_BACKEND = "/schedule"
    const data = {
        classInfo: classInfo,
        slotNumber: slotNumber,
        weekdayList: weekdayList
    }
    return axios.post(URL_BACKEND, data)
}

const updateScheduleAPI = (id, name, subject, teacher, campus, openDay) => {
    const URL_BACKEND = "/schedule"
    const data = {
        id: id,
        name: name,
        subject: subject,
        teacher: teacher,
        campus: campus,
        openDay: openDay
    }
    return axios.put(URL_BACKEND, data)
}

const deleteScheduleAPI = (id) => {
    const URL_BACKEND = `/schedule/${id}`
    return axios.delete(URL_BACKEND)
}

//module role api
const fetchAllRolesAPI = (page, pageSize) => {
    const URL_BACKEND = `/roles?page=${page}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

const createRoleAPI = (name, description, active, permissions) => {
    const URL_BACKEND = "/roles"
    const data = {
        name: name,
        description: description,
        active: active,
        permissions: permissions
    }
    return axios.post(URL_BACKEND, data)
}

const updateRoleAPI = (id, name, description, active, permissions) => {
    const URL_BACKEND = "/roles"
    const data = {
        id: id,
        name: name,
        description: description,
        active: active,
        permissions: permissions
    }
    return axios.put(URL_BACKEND, data)
}

const deleteRoleAPI = (id) => {
    const URL_BACKEND = `/roles/${id}`
    return axios.delete(URL_BACKEND)
}

//module permission api
const fetchAllPermissionsAPI = (page, pageSize) => {
    const URL_BACKEND = `/permissions?page=${page}&size=${pageSize}`
    return axios.get(URL_BACKEND)
}

//module class enrollment api
const fetchAllClassEnrollmentAPIWithoutPagination = (filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/class-enrollments?filter=${filter}`
    }
    else {
        URL_BACKEND = `/class-enrollments`
    }
    return axios.get(URL_BACKEND)
}

//module user api
const fetchAllUsersAPI = (page, pageSize, filter = null) => {
    let URL_BACKEND
    if (filter) {
        URL_BACKEND = `/users?page=${page}&size=${pageSize}&filter=${filter}`
    } else {
        URL_BACKEND = `/users?page=${page}&size=${pageSize}`
    }
    return axios.get(URL_BACKEND)
}

const createUserAPI = (name, username, password, role) => {
    const URL_BACKEND = "/users"
    const data = {
        name: name,
        username: username,
        password: password,
        role: role
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (id, name, role) => {
    const URL_BACKEND = "/users"
    const data = {
        id: id,
        name: name,
        role: role
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/users/${id}`
    return axios.delete(URL_BACKEND)
}


export {
    createCampusAPI, createClassAPI, createParentAPI, createRoleAPI, createScheduleAPI, createStudentAPI, createSubjectAPI, createTeacherAPI, createUserAPI, deleteCampusAPI, deleteClassAPI, deleteParentAPI, deleteRoleAPI, deleteScheduleAPI, deleteStudentAPI, deleteSubjectAPI, deleteTeacherAPI, deleteUserAPI, fetchAllCampusAPI, fetchAllCampusWithoutPaginationAPI, fetchAllClassEnrollmentAPIWithoutPagination, fetchAllClassesAPI, fetchAllClassesWithoutPaginationAPI, fetchAllParentsAPI, fetchAllPermissionsAPI, fetchAllRolesAPI, fetchAllStudentsAPI, fetchAllSubjectsAPI, fetchAllSubjectsWithoutPaginationAPI, fetchAllTeachersAPI, fetchAllUsersAPI, fetchScheduleInWeek, getAccountAPI, getRefreshToken, loginAPI, logoutAPI, updateCampusAPI, updateClassAPI, updateParentAPI, updateRoleAPI, updateScheduleAPI, updateStudentAPI, updateSubjectAPI, updateTeacherAPI, updateUserAPI
};

