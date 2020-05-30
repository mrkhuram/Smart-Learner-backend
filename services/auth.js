const AdminService = require('./admin');
const InstituteService = require('./institute');
const InstructorService = require('./instructor');
const FreelancerService = require('./freelancer');
const CutomerService = require('./customer');


class AuthService {

    async getUser(request, type) {
        switch (type) {

            case 1:
                return AdminService.getAdmin(request);
            case 2:
                return FreelancerService.getFreelancer(request);
            case 3:
                return InstructorService.getInstructor(request);
            case 4:
                return InstituteService.getInstitute(request);
            case 5:
                return CutomerService.getCustomer(request);
            default:
                return null; 
        }
    }

    async createUser(details, type) {

        switch (type) {

            case 1:
                return AdminService.createAdmin(details);
            case 2:
                return FreelancerService.createFreelancer(details);
            case 3:
                return InstructorService.createInstructor(details);
            case 4:
                return InstituteService.createInstitute(details);  
            case 5:
                return CutomerService.createCustomer(details);
            default:
                return null;
        }

    }

    async updateUser(newData, criteria, type) {
        switch (type) {
            case 1:
                return null
            case 2:
                return FreelancerService.updateFreelancer(newData, criteria);
            case 3:
                return InstructorService.updateInstructor(newData, criteria);
            case 4:
                return InstituteService.updateInstitute(newData, criteria);
            case 5:
                return CutomerService.updateCutomer(newData, criteria);
            default:
                return null;
        }
    }

    async deleteUser(criteria, type) {
        switch (type) {
            case 1:
                return null;
            case 2:
                return FreelancerService.deleteFreelancer(criteria);
            case 3:
                return InstructorService.deleteInstructor(criteria);
            case 4:
                return InstituteService.deleteInstitute(criteria);
            case 5:
                return CutomerService.deleteCutomer(criteria);
            default:
                return null;
        }
    }
}


module.exports = new AuthService();