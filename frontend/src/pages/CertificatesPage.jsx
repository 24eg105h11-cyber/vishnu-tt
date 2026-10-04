import React, { useEffect, useState } from 'react';
import { registrationService } from '../services/registrationService';
import CertificateCard from '../components/common/CertificateCard';
import { Award, Sparkles } from 'lucide-react';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCerts() {
      setLoading(true);
      const certs = await registrationService.getCertificates();
      setCertificates(certs);
      setLoading(false);
    }
    loadCerts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-heading">Earned Certificates</h1>
        <p className="text-xs text-slate-400">Certificates of participation unlocked automatically after event attendance</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 max-w-md mx-auto my-8 border border-white/10">
          <Award className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-400">Attend registered events and get your QR code scanned by organizers to unlock verified certificates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
}
