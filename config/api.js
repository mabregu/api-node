module.exports = {
    guardian: {
        server: process.env.GUARDIAN_URL || 'http://localhost:8001',
        newguardian: {
            method: 'POST',
            url: '/guardian'
        },
        getguardian: {
            method: 'GET',
            url: '/guardian'
        },
        setguardian: {
            method: 'PUT',
            url: '/guardian'
        }
    },
    student: {
        server: process.env.GUARDIAN_URL || 'http://localhost:8001',
        getstudent: {
            method: 'GET',
            url: '/student'
        },
        newstudent: {
            method: 'POST',
            url: '/student'
        },
        setstudent: {
            method: 'PUT',
            url: '/student'
        }
    },
    system: {
        server: process.env.SYSTEM_URL || 'http://localhost:8004',
        saveerror: {
            method: 'PUT',
            url: '/saveerror'
        },
    },
}