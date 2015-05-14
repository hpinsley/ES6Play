Array.prototype.remove = function(i) {
    let copy = this.slice(0);
    copy.splice(i,1);
    return copy;
}

export function getOrder(orderId) {
    return Promise.resolve({userId: 35});
}

export function getUser(userId) {
    return Promise.resolve({companyId: 18});
}

export function getCompany(companyId) {
    return Promise.resolve({name: "Pluralsight"});
}

export function getCourse(courseId) {
    var courses = {
        1: { name: 'Course 1'},
        2: { name: 'Course 2'},
        3: { name: 'Course 3'}
    };

    return Promise.resolve(courses[courseId]);
}
