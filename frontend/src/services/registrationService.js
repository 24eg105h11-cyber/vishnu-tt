import api from './api';
import { MOCK_REGISTRATIONS, MOCK_CERTIFICATES } from './mockData';

export const registrationService = {
  registerForEvent: async (eventId, registrationData) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, registrationData);
      return response.data || response;
    } catch (err) {
      const regId = `REG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newReg = {
        id: `reg-${Date.now()}`,
        registrationId: regId,
        eventId,
        eventTitle: registrationData.eventTitle || 'Campus Event',
        studentId: 'user-student',
        studentName: registrationData.name,
        studentEmail: registrationData.email,
        collegeId: registrationData.collegeId,
        department: registrationData.department,
        year: registrationData.year,
        phone: registrationData.phone,
        qrCodeData: JSON.stringify({ registrationId: regId, eventId, studentId: 'user-student' }),
        status: 'REGISTERED',
        createdAt: new Date().toISOString()
      };
      MOCK_REGISTRATIONS.unshift(newReg);
      return newReg;
    }
  },

  getMyRegistrations: async () => {
    try {
      const response = await api.get('/registrations/my');
      return response.data || response;
    } catch (err) {
      return MOCK_REGISTRATIONS;
    }
  },

  cancelRegistration: async (registrationId) => {
    try {
      await api.delete(`/registrations/${registrationId}`);
    } catch (err) {
      const reg = MOCK_REGISTRATIONS.find(r => r.registrationId === registrationId || r.id === registrationId);
      if (reg) reg.status = 'CANCELLED';
    }
  },

  getCertificates: async () => {
    try {
      const response = await api.get('/certificates');
      return response.data || response;
    } catch (err) {
      return MOCK_CERTIFICATES;
    }
  }
};
