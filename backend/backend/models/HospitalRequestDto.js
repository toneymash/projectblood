export default class HospitalRequestDTO {
    constructor({ hospitalName, bloodType, quantity, contactPerson, urgency }) {
        if (!hospitalName || !bloodType || !quantity || !contactPerson || !urgency) {
            throw new Error("All fields are required.");
        }

        this.hospitalName = hospitalName;
        this.bloodGroup = bloodType;        // map to internal naming
        this.unitsNeeded = quantity;
        this.contact = contactPerson;
        this.urgencyLevel = urgency;
    }
}
