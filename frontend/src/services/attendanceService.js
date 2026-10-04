import api from './api';
import { MOCK_REGISTRATIONS, MOCK_CERTIFICATES } from './mockData';

export const attendanceService = {
  checkInStudent: async (qrCodeData, eventId) => {
    try {
      const response = await api.post('/attendance/check-in', { qrCodeData, eventId });
      return response.data || response;
    } catch (err) {
      let regId = qrCodeData;
      if (qrCodeData.includes('registrationId":"')) {
        const match = qrCodeData.match(/registrationId":"([^"]+)"/);
        if (match) regId = match[1];
      }

      const reg = MOCK_REGISTRATIONS.find(r => r.registrationId === regId || r.qrCodeData.includes(regId));
      if (!reg) {
        throw new Error(`Invalid QR code or ticket ID: ${qrCodeData}`);
      }
      if (reg.status === 'ATTENDED') {
        throw new Error(`Attendance already marked for student: ${reg.studentName}`);
      }

      reg.status = 'ATTENDED';
      reg.checkInTime = new Date().toISOString();

      // Create Certificate
      const certId = `CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      MOCK_CERTIFICATES.push({
        id: `cert-${Date.now()}`,
        certificateId: certId,
        eventId: reg.eventId,
        eventTitle: reg.eventTitle,
        studentId: reg.studentId,
        studentName: reg.studentName,
        collegeId: reg.collegeId,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        signatureUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString()
      });

      return {
        id: `att-${Date.now()}`,
        eventId: reg.eventId,
        studentId: reg.studentId,
        registrationId: reg.registrationId,
        studentName: reg.studentName,
        collegeId: reg.collegeId,
        checkInTime: new Date().toISOString()
      };
    }
  },

  getEventAttendance: async (eventId) => {
    try {
      const response = await api.get(`/attendance/event/${eventId}`);
      return response.data || response;
    } catch (err) {
      return MOCK_REGISTRATIONS.filter(r => r.eventId === eventId && r.status === 'ATTENDED');
    }
  }
};
