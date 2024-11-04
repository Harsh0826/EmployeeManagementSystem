require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Import routes
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const positionRoutes = require('./routes/positionRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const portalRoutes = require('./routes/portalRoutes');
const projectRoutes = require('./routes/projectRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');
const companyRoutes = require('./routes/companyRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const personalInfoRoutes = require('./routes/personalInfoRoutes');
const educationRoutes = require('./routes/educationRoutes');
const familyInfoRoutes = require('./routes/familyInfoRoutes');
const workExperienceRoutes = require('./routes/workExperienceRoutes');
const leaveApplicationRoutes = require('./routes/leaveApplicationEmpRoutes');
const leaveApplicationHRRoutes = require('./routes/leaveApplicationHRRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const mongoURI =
  process.env.DATABASEURL
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch(err => console.log(err));

autoIncrement.initialize(mongoose.connection);

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/admin/portal', portalRoutes);
app.use('/api/admin/project-bid', projectRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/family-info', familyInfoRoutes);
app.use('/api/work-experience', workExperienceRoutes);
app.use('/api/leave-application-emp', leaveApplicationRoutes);
app.use('/api/leave-application-hr', leaveApplicationHRRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
