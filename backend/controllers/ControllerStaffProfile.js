// hvnt test
const {db} = require("../firebase/firebase.js");

const getStaffProfile = async (req, res) => {
    const staffID = req.query.staffID;
    try {
        const staff = await db.collection("Staff").doc(staffID).get();
        if (!staff.exists) {
            return res.status(404).json({ code: 404, message: "Staff not found" });
        }

        const staffDetails = staff.data();
        
        return res.status(200).json({
            staffName: staffDetails.Name,
            staffPhone: staffDetails.Phone,
            staffCompany: staffDetails.CompanyName
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting staff: ${error.message}`});
    }
}

const updateStaffProfile = async (req, res) => {
    const staffID = req.query.staffID;
    const { Name, Phone, CompanyName } = req.body;

    // Correct the validation logic
    if (!Name || !Phone || !CompanyName) {
		return res.status(400).json({
			code: 400,
			message: "Staff updated name/phone/company name required",
		});
	}
    try {
        await db.collection("Staff").doc(staffID).update({
            Name: Name,
            Phone: Phone,
            CompanyName: CompanyName,
        });
        return res.status(200).json({
            code: 200,
            message: "Staff profile successfully updated.",
        });
    } catch (error) {
        console.error("Error updating staff profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error updating staff profile: ${error.message}`,
        });
    }
}


const getStaffEvent = async (req, res) => {
    const staffID = req.query.staffID;
    try {
        const staff = await db.collection("Staff").doc(staffID).get();
        if (!staff.exists) {
            return res.status(404).json({ code: 404, message: "Staff not found" });
        }
        const staffEvent = await db.collection("Staff").doc(staffID).collection("EventIC").get();
        const validStaffEvent = staffEvent.empty 
        ? [] // Return an empty array if no documents are found
        : staffEvent.docs.map(doc => doc.data().eventID);

        console.log(validStaffEvent);

        return res.status(200).json({
            validStaffEvent: validStaffEvent
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting staff: ${error} `})
    }
}

const createStaffProfile = async (req, res) => {
    const { Email, Name, Phone, CompanyName } = req.body;

    if (!Email || !Name || !Phone || !CompanyName) {
        return res.status(400).json({
            code: 400,
            message: "Email, Name, Phone and CompanyName are required to create a staff profile.",
        });
    }

    try {
        // Create a new staff document in the "Staff" collection
        const newStaffRef = await db.collection("Staff").add({
            Email,
            Name,
            Phone,
            CompanyName,
        });

        return res.status(201).json({
            code: 201,
            message: "Staff profile successfully created.",
            staffID: newStaffRef.id,
        });
    } catch (error) {
        console.error("Error creating staff profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error creating staff profile: ${error.message}`,
        });
    }
}

module.exports = {
    getStaffProfile,
    updateStaffProfile,
    getStaffEvent,
    createStaffProfile
}


