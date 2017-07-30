let mongoose = require('mongoose');

let AppointmentSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    complaint:{
        type: String,
        required: [true, "Complaint is required"],
        min_length:[10, "Complaint must be at least 10 characters"]
    },
}, { timestamps: true });

mongoose.model('Appointment', AppointmentSchema);
