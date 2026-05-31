'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  checkAdminAuth,
  loginAdmin,
  logoutAdmin,
  fetchFaqTemplates,
  saveFaqTemplate,
  deleteFaqTemplate,
  fetchMessageLogs,
  fetchWhatsAppJobs,
  retryJobAction,
  deleteJobAction,
  fetchClassSessions,
  addClassSession,
  deleteClassSession,
  fetchWhatsAppSettings,
  saveWhatsAppSetting,
  sendManualMessageAction,
  // Certificate actions
  fetchCertificates,
  fetchCertificatePrograms,
  issueCertificate,
  revokeCertificate,
  reissueCertificate,
  getCertificateQR,
  type CertificateRecord,
  type CertificateProgram,
} from '../../actions/admin';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'status' | 'faq' | 'logs' | 'jobs' | 'manual' | 'certs'>('status');
  const [isPending, startTransition] = useTransition();

  // Status & Settings States
  const [waStatus, setWaStatus] = useState<{ connected: boolean; hostNumber?: string; error?: string } | null>(null);
  const [waSettings, setWaSettings] = useState<Record<string, any>>({});
  const [newGroupKey, setNewGroupKey] = useState('');
  const [newGroupId, setNewGroupId] = useState('');

  // FAQ States
  const [faqTemplates, setFaqTemplates] = useState<any[]>([]);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [faqForm, setFaqForm] = useState({
    key: '',
    title: '',
    category: 'general',
    keywords: '',
    response_text: '',
    enabled: true,
    priority: 0,
  });

  // Logs & Jobs States
  const [logs, setLogs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  // Class Form State
  const [classForm, setClassForm] = useState({
    title: '',
    cohortName: 'Cohort 03',
    startTime: '',
  });

  // Manual Send State
  const [manualSend, setManualSend] = useState({
    phone: '',
    text: '',
  });
  const [manualSendStatus, setManualSendStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Certificates States
  const [certs, setCerts] = useState<CertificateRecord[]>([]);
  const [certPrograms, setCertPrograms] = useState<CertificateProgram[]>([]);
  const [certFilter, setCertFilter] = useState<string>('');
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [certForm, setCertForm] = useState({
    recipient_name: '',
    recipient_email: '',
    program_id: '',
    course_title: '',
    cohort_name: '',
    level: '',
  });
  const [certFormStatus, setCertFormStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [qrModal, setQrModal] = useState<{ qrDataUri: string; verifyUrl: string; certNumber: string | null } | null>(null);
  const [revokeModal, setRevokeModal] = useState<{ id: string; name: string } | null>(null);
  const [revokeReason, setRevokeReason] = useState('');

  // Load Initial Data
  useEffect(() => {
    async function init() {
      const auth = await checkAdminAuth();
      setIsAuthenticated(auth);
      if (auth) {
        loadData();
      }
    }
    init();
  }, []);

  const loadData = async () => {
    startTransition(async () => {
      try {
        const [faqs, messageLogs, queueJobs, classSess, settings, certList, programs] = await Promise.all([
          fetchFaqTemplates(),
          fetchMessageLogs(),
          fetchWhatsAppJobs(),
          fetchClassSessions(),
          fetchWhatsAppSettings(),
          fetchCertificates(200),
          fetchCertificatePrograms(),
        ]);
        setFaqTemplates(faqs);
        setLogs(messageLogs);
        setJobs(queueJobs);
        setClasses(classSess);
        setWaSettings(settings);
        setCerts(certList);
        setCertPrograms(programs);

        // Ping WhatsApp API
        const waUrl = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || settings.api_url;
        if (waUrl) {
          const res = await fetch(`${waUrl.replace(/\/$/, '')}/getMe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': settings.api_key || '',
            },
          }).catch(() => null);
          if (res && res.ok) {
            const d = await res.json();
            setWaStatus({ connected: true, hostNumber: d.id || d.hostNumber || 'unknown' });
          } else {
            setWaStatus({ connected: false, error: 'Could not reach remote open-wa service.' });
          }
        } else {
          setWaStatus({ connected: false, error: 'WHATSAPP_API_URL settings missing.' });
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    });
  };

  // Certificate handlers
  const handleIssueCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertFormStatus(null);
    startTransition(async () => {
      try {
        const res = await issueCertificate({
          recipient_name: certForm.recipient_name,
          recipient_email: certForm.recipient_email || undefined,
          program_id: certForm.program_id,
          course_title: certForm.course_title,
          cohort_name: certForm.cohort_name || undefined,
          level: certForm.level || undefined,
        });
        if (res.success) {
          setCertFormStatus({ success: true, message: `Certificate issued! ID: ${res.record.certificate_number}` });
          setCertForm({ recipient_name: '', recipient_email: '', program_id: '', course_title: '', cohort_name: '', level: '' });
          setShowIssueForm(false);
          const updated = await fetchCertificates(200);
          setCerts(updated);
        } else {
          setCertFormStatus({ success: false, message: res.error });
        }
      } catch (err: any) {
        setCertFormStatus({ success: false, message: err.message });
      }
    });
  };

  const handleRevokeCert = async () => {
    if (!revokeModal || !revokeReason.trim()) return;
    startTransition(async () => {
      try {
        await revokeCertificate(revokeModal.id, revokeReason);
        setRevokeModal(null);
        setRevokeReason('');
        const updated = await fetchCertificates(200);
        setCerts(updated);
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  const handleReissueCert = async (id: string) => {
    if (!confirm('Create a replacement certificate? The original will be marked as "replaced".')) return;
    startTransition(async () => {
      try {
        const res = await reissueCertificate(id);
        if (res.success) {
          alert(`New certificate issued: ${res.record.certificate_number}`);
          const updated = await fetchCertificates(200);
          setCerts(updated);
        } else {
          alert('Error: ' + res.error);
        }
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  const handleShowQR = async (token: string, certNumber: string | null) => {
    try {
      const qr = await getCertificateQR(token);
      setQrModal({ ...qr, certNumber });
    } catch (err: any) {
      alert('Error generating QR: ' + err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await loginAdmin(password);
    if (res.success) {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError(res.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    router.refresh();
  };

  // FAQ Handling
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await saveFaqTemplate({
          id: editingFaq?.id,
          key: faqForm.key,
          title: faqForm.title,
          category: faqForm.category,
          keywords: faqForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
          response_text: faqForm.response_text,
          enabled: faqForm.enabled,
          priority: Number(faqForm.priority),
        });
        setEditingFaq(null);
        setFaqForm({ key: '', title: '', category: 'general', keywords: '', response_text: '', enabled: true, priority: 0 });
        const faqs = await fetchFaqTemplates();
        setFaqTemplates(faqs);
      } catch (err: any) {
        alert('Error saving FAQ: ' + err.message);
      }
    });
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ template?')) return;
    startTransition(async () => {
      try {
        await deleteFaqTemplate(id);
        const faqs = await fetchFaqTemplates();
        setFaqTemplates(faqs);
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  // Settings Handling
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = (e.target as any).apiUrl.value;
    const apiKey = (e.target as any).apiKey.value;
    startTransition(async () => {
      try {
        await saveWhatsAppSetting('api_url', apiUrl);
        await saveWhatsAppSetting('api_key', apiKey);
        alert('Settings saved successfully.');
        loadData();
      } catch (err: any) {
        alert('Error saving: ' + err.message);
      }
    });
  };

  const handleAddGroupMapping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupKey || !newGroupId) return;
    const currentMappings = waSettings.group_mappings || {};
    const updated = { ...currentMappings, [newGroupKey]: newGroupId };
    startTransition(async () => {
      try {
        await saveWhatsAppSetting('group_mappings', updated);
        setNewGroupKey('');
        setNewGroupId('');
        loadData();
      } catch (err: any) {
        alert('Error adding: ' + err.message);
      }
    });
  };

  const handleRemoveGroupMapping = async (key: string) => {
    const currentMappings = waSettings.group_mappings || {};
    delete currentMappings[key];
    startTransition(async () => {
      try {
        await saveWhatsAppSetting('group_mappings', { ...currentMappings });
        loadData();
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  // Job Handling
  const handleRetryJob = async (id: string) => {
    startTransition(async () => {
      try {
        await retryJobAction(id);
        const queueJobs = await fetchWhatsAppJobs();
        setJobs(queueJobs);
        alert('Job marked for immediate retry.');
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    startTransition(async () => {
      try {
        await deleteJobAction(id);
        const queueJobs = await fetchWhatsAppJobs();
        setJobs(queueJobs);
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  // Class Handling
  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classForm.title || !classForm.startTime) return;
    startTransition(async () => {
      try {
        await addClassSession(classForm.title, classForm.cohortName, classForm.startTime);
        setClassForm({ title: '', cohortName: 'Cohort 03', startTime: '' });
        const classSess = await fetchClassSessions();
        setClasses(classSess);
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    startTransition(async () => {
      try {
        await deleteClassSession(id);
        const classSess = await fetchClassSessions();
        setClasses(classSess);
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    });
  };

  // Manual Send Handling
  const handleManualSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualSendStatus(null);
    startTransition(async () => {
      try {
        const res = await sendManualMessageAction(manualSend.phone, manualSend.text);
        if (res.success) {
          setManualSendStatus({ success: true, message: `Message dispatched successfully! ID: ${res.messageId}` });
          setManualSend({ phone: '', text: '' });
          const messageLogs = await fetchMessageLogs();
          setLogs(messageLogs);
        } else {
          setManualSendStatus({ success: false, message: res.error || 'Failed to dispatch message.' });
        }
      } catch (err: any) {
        setManualSendStatus({ success: false, message: err.message });
      }
    });
  };

  // Render Login Card
  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', fontFamily: 'var(--font-body)' }}>
        <p style={{ color: 'var(--color-ink-500)', fontSize: 16 }}>Checking authorization status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', fontFamily: 'var(--font-body)' }}>
        <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-line)', borderRadius: 12, padding: 32, width: '100%', maxWidth: 400, boxShadow: '0 4px 20px rgba(21, 32, 51, 0.05)' }}>
          <h2 style={{ fontSize: 24, marginBottom: 8, color: 'var(--color-ink-900)' }}>Admin Access</h2>
          <p style={{ fontSize: 14, color: 'var(--color-ink-500)', marginBottom: 24 }}>Enter your system password to manage WhatsApp automation settings.</p>
          
          <form onSubmit={handleLogin}>
            {authError && (
              <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, fontSize: 13, color: '#991b1b', marginBottom: 16 }}>
                {authError}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-ink-700)' }}>System Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{ fontSize: 15, padding: '12px 14px', border: '1px solid var(--color-line)', borderRadius: 6, background: 'var(--color-sand-50)', color: 'var(--color-ink-900)' }}
              />
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '40px auto', padding: '0 var(--spacing-gutter)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-line)', paddingBottom: 24, marginBottom: 32 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Automation Hub</span>
          <h1 style={{ fontSize: 36, marginTop: 4 }}>WhatsApp Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="btn btn--ghost" style={{ padding: '8px 16px', fontSize: 14 }}>
          Logout
        </button>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }}>
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setActiveTab('status')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'status' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'status' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'status' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'status' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            ⚙️ Connection & Settings
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'faq' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'faq' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'faq' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'faq' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            📚 FAQ Matcher CRUD
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'logs' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'logs' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'logs' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'logs' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            📝 WhatsApp Message Logs
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'jobs' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'jobs' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'jobs' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'jobs' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            ⏳ Jobs Queue & Schedules
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'manual' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'manual' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'manual' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'manual' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            💬 Manual Dispatch Send
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            style={{
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: 8,
              background: activeTab === 'certs' ? 'var(--color-white)' : 'transparent',
              border: activeTab === 'certs' ? '1px solid var(--color-line)' : '1px solid transparent',
              color: activeTab === 'certs' ? 'var(--color-ink-900)' : 'var(--color-ink-700)',
              fontWeight: activeTab === 'certs' ? 600 : 500,
              cursor: 'pointer',
              fontSize: 15,
            }}
          >
            🎓 Certificates
          </button>

          <button onClick={loadData} className="btn btn--white" style={{ marginTop: 24, fontSize: 13, justifyContent: 'center' }} disabled={isPending}>
            {isPending ? 'Reloading...' : '🔄 Refresh Data'}
          </button>
        </div>

        {/* Panel Content Area */}
        <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-line)', borderRadius: 12, padding: 32, minHeight: 500 }}>
          {/* TAB 1: STATUS & CONFIG */}
          {activeTab === 'status' && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 16 }}>Easy API Connection & Config</h2>
              
              {/* WhatsApp Status Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 20px',
                borderRadius: 8,
                background: waStatus?.connected ? '#dcfce7' : '#fef2f2',
                border: waStatus?.connected ? '1px solid #bbf7d0' : '1px solid #fecaca',
                color: waStatus?.connected ? '#15803d' : '#b91c1c',
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 32
              }}>
                <span style={{ fontSize: 20 }}>{waStatus?.connected ? '✓' : '⚠️'}</span>
                <div>
                  <div>WhatsApp Connection Status: {waStatus?.connected ? 'ONLINE' : 'OFFLINE'}</div>
                  {waStatus?.hostNumber && <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.8 }}>Connected JID: {waStatus.hostNumber}</div>}
                  {waStatus?.error && <div style={{ fontSize: 13, fontWeight: 400 }}>{waStatus.error}</div>}
                </div>
              </div>

              {/* Endpoint Settings */}
              <form onSubmit={handleSaveSettings} style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16, borderBottom: '1px solid var(--color-line-soft)', paddingBottom: 8 }}>API Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-ink-700)' }}>WHATSAPP_API_URL</label>
                    <input
                      type="url"
                      name="apiUrl"
                      defaultValue={waSettings.api_url || process.env.NEXT_PUBLIC_WHATSAPP_API_URL || ''}
                      placeholder="https://kiddykode-wa.onrender.com"
                      required
                      style={{ fontSize: 14, padding: '10px 12px', border: '1px solid var(--color-line)', borderRadius: 6, background: 'var(--color-sand-50)' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-ink-700)' }}>WHATSAPP_API_KEY</label>
                    <input
                      type="password"
                      name="apiKey"
                      defaultValue={waSettings.api_key || ''}
                      placeholder="••••••••••••••••"
                      style={{ fontSize: 14, padding: '10px 12px', border: '1px solid var(--color-line)', borderRadius: 6, background: 'var(--color-sand-50)' }}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn--primary" style={{ fontSize: 14, padding: '10px 20px' }} disabled={isPending}>
                  Save API Settings
                </button>
              </form>

              {/* Group Mappings */}
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 8, borderBottom: '1px solid var(--color-line-soft)', paddingBottom: 8 }}>WhatsApp Group Mappings (Guardian Groups)</h3>
                <p style={{ fontSize: 13, color: 'var(--color-ink-500)', marginBottom: 20 }}>Define group IDs mapped to keys (e.g. <code>cohort_03</code>) for automated group assignments.</p>

                <form onSubmit={handleAddGroupMapping} style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Group Identifier Key</label>
                    <input
                      type="text"
                      value={newGroupKey}
                      onChange={(e) => setNewGroupKey(e.target.value)}
                      placeholder="e.g. cohort_03"
                      required
                      style={{ fontSize: 14, padding: '10px 12px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 2 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>WhatsApp Group JID / Link ID</label>
                    <input
                      type="text"
                      value={newGroupId}
                      onChange={(e) => setNewGroupId(e.target.value)}
                      placeholder="e.g. 12036321234567890@g.us"
                      required
                      style={{ fontSize: 14, padding: '10px 12px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                    />
                  </div>
                  <button type="submit" className="btn btn--ghost" style={{ fontSize: 14, padding: '10px 16px' }} disabled={isPending}>
                    Add Mapping
                  </button>
                </form>

                {/* Mappings Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: 'var(--color-sand-50)', textAlign: 'left', borderBottom: '1px solid var(--color-line)' }}>
                      <th style={{ padding: 12 }}>Group Key</th>
                      <th style={{ padding: 12 }}>WhatsApp JID / ID</th>
                      <th style={{ padding: 12, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(waSettings.group_mappings || {}).map(([key, id]) => (
                      <tr key={key} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                        <td style={{ padding: 12, fontFamily: 'var(--font-mono)' }}>{key}</td>
                        <td style={{ padding: 12, color: 'var(--color-ink-700)' }}>{id as string}</td>
                        <td style={{ padding: 12, textAlign: 'right' }}>
                          <button onClick={() => handleRemoveGroupMapping(key)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 13 }} disabled={isPending}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    {Object.keys(waSettings.group_mappings || {}).length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ padding: 16, textAlign: 'center', color: 'var(--color-ink-500)' }}>No group mappings defined yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FAQ CRUD */}
          {activeTab === 'faq' && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>FAQ Auto-Reply Templates</h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-500)', marginBottom: 24 }}>Manage key phrase and keyword match templates. Webhook inbound messages will trigger matches.</p>

              {/* Edit / New Form */}
              <div style={{ background: 'var(--color-sand-50)', borderRadius: 8, padding: 24, border: '1px solid var(--color-line)', marginBottom: 32 }}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>{editingFaq ? 'Edit FAQ Template' : 'Create New FAQ Template'}</h3>
                <form onSubmit={handleSaveFaq}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Unique Template Key</label>
                      <input
                        type="text"
                        value={faqForm.key}
                        onChange={(e) => setFaqForm({ ...faqForm, key: e.target.value })}
                        placeholder="e.g. schedule_info"
                        required
                        disabled={!!editingFaq}
                        style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Readable Title</label>
                      <input
                        type="text"
                        value={faqForm.title}
                        onChange={(e) => setFaqForm({ ...faqForm, title: e.target.value })}
                        placeholder="e.g. Schedule Information"
                        required
                        style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Keywords / Aliases (Comma-separated)</label>
                      <input
                        type="text"
                        value={faqForm.keywords}
                        onChange={(e) => setFaqForm({ ...faqForm, keywords: e.target.value })}
                        placeholder="schedules, schedule, timing, time, when"
                        required
                        style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Priority Weight</label>
                      <input
                        type="number"
                        value={faqForm.priority}
                        onChange={(e) => setFaqForm({ ...faqForm, priority: Number(e.target.value) })}
                        style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Status</label>
                      <select
                        value={faqForm.enabled ? 'true' : 'false'}
                        onChange={(e) => setFaqForm({ ...faqForm, enabled: e.target.value === 'true' })}
                        style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                      >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Auto-Response Text</label>
                    <textarea
                      value={faqForm.response_text}
                      onChange={(e) => setFaqForm({ ...faqForm, response_text: e.target.value })}
                      placeholder="Hi! Our classes are scheduled as follows..."
                      required
                      rows={4}
                      style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6, fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" className="btn btn--primary" style={{ fontSize: 13, padding: '8px 16px' }} disabled={isPending}>
                      {editingFaq ? 'Update FAQ Template' : 'Create FAQ Template'}
                    </button>
                    {editingFaq && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(null);
                          setFaqForm({ key: '', title: '', category: 'general', keywords: '', response_text: '', enabled: true, priority: 0 });
                        }}
                        className="btn btn--ghost"
                        style={{ fontSize: 13, padding: '8px 16px' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* FAQs Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: 'var(--color-sand-50)', textAlign: 'left', borderBottom: '1px solid var(--color-line)' }}>
                    <th style={{ padding: 12 }}>Key</th>
                    <th style={{ padding: 12 }}>Title</th>
                    <th style={{ padding: 12 }}>Keywords</th>
                    <th style={{ padding: 12 }}>Status</th>
                    <th style={{ padding: 12, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqTemplates.map((faq) => (
                    <tr key={faq.id} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                      <td style={{ padding: 12, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{faq.key}</td>
                      <td style={{ padding: 12 }}>{faq.title}</td>
                      <td style={{ padding: 12, color: 'var(--color-ink-700)', fontSize: 12 }}>
                        {faq.keywords?.map((k: string) => <span key={k} style={{ background: 'var(--color-sand-100)', padding: '2px 6px', borderRadius: 4, marginRight: 4 }}>{k}</span>)}
                      </td>
                      <td style={{ padding: 12 }}>
                        <span style={{ color: faq.enabled ? '#15803d' : '#991b1b', fontWeight: 600 }}>
                          {faq.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td style={{ padding: 12, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setFaqForm({
                              key: faq.key,
                              title: faq.title,
                              category: faq.category || 'general',
                              keywords: faq.keywords?.join(', ') || '',
                              response_text: faq.response_text,
                              enabled: faq.enabled,
                              priority: faq.priority || 0,
                            });
                          }}
                          style={{ background: 'transparent', border: 'none', color: 'var(--color-blue-600)', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {faqTemplates.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: 16, textAlign: 'center', color: 'var(--color-ink-500)' }}>No FAQ templates found. Create one above!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: MESSAGE LOGS */}
          {activeTab === 'logs' && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>WhatsApp Message Logs</h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-500)', marginBottom: 24 }}>Audit logs of all inbound messages and automated/manual outbound messages.</p>

              <div style={{ maxHeight: 600, overflowY: 'auto', border: '1px solid var(--color-line)', borderRadius: 8 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <tr style={{ background: 'var(--color-sand-50)', textAlign: 'left', borderBottom: '1px solid var(--color-line)' }}>
                      <th style={{ padding: 12 }}>Time</th>
                      <th style={{ padding: 12 }}>Direction</th>
                      <th style={{ padding: 12 }}>Sender/Recipient</th>
                      <th style={{ padding: 12 }}>Type / Template</th>
                      <th style={{ padding: 12 }}>Payload Text Snippet</th>
                      <th style={{ padding: 12 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => {
                      const dt = new Date(log.created_at).toLocaleString();
                      const payloadText = log.payload?.text || log.payload?.body || log.payload?.responseText || JSON.stringify(log.payload || {});
                      return (
                        <tr key={log.id} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                          <td style={{ padding: 12, color: 'var(--color-ink-500)', whiteSpace: 'nowrap' }}>{dt}</td>
                          <td style={{ padding: 12 }}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              background: log.direction === 'inbound' ? '#eff6ff' : '#faf5ff',
                              color: log.direction === 'inbound' ? '#1e40af' : '#6b21a8'
                            }}>
                              {log.direction.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: 12, fontFamily: 'var(--font-mono)' }}>
                            {log.normalized_phone}
                            {log.contact_identifier && <div style={{ fontSize: 11, color: 'var(--color-ink-500)' }}>({log.contact_identifier})</div>}
                          </td>
                          <td style={{ padding: 12, fontFamily: 'var(--font-mono)' }}>{log.template_key || 'incoming'}</td>
                          <td style={{ padding: 12, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payloadText}>
                            {payloadText}
                          </td>
                          <td style={{ padding: 12 }}>
                            <span style={{
                              color: log.status === 'sent' || log.status === 'received' ? '#16a34a' : log.status === 'failed' ? '#dc2626' : '#ea580c',
                              fontWeight: 600
                            }}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ padding: 16, textAlign: 'center', color: 'var(--color-ink-500)' }}>No message logs recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: JOBS & SCHEDULES */}
          {activeTab === 'jobs' && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Jobs Queue & Class Sessions</h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-500)', marginBottom: 24 }}>Manage retrying failed jobs and define upcoming class sessions for automatic reminders.</p>

              {/* Class Scheduling */}
              <div style={{ background: 'var(--color-sand-50)', borderRadius: 8, padding: 24, border: '1px solid var(--color-line)', marginBottom: 32 }}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>Schedule a Class Session (Triggers automatic 24-hr reminders)</h3>
                <form onSubmit={handleAddClass} style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 2 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Class Topic / Title</label>
                    <input
                      type="text"
                      value={classForm.title}
                      onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                      placeholder="e.g. Python Loops and Logic"
                      required
                      style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Cohort Name</label>
                    <input
                      type="text"
                      value={classForm.cohortName}
                      onChange={(e) => setClassForm({ ...classForm, cohortName: e.target.value })}
                      placeholder="Cohort 03"
                      required
                      style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1.5 }}>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={classForm.startTime}
                      onChange={(e) => setClassForm({ ...classForm, startTime: e.target.value })}
                      required
                      style={{ fontSize: 14, padding: 8, border: '1px solid var(--color-line)', borderRadius: 6 }}
                    />
                  </div>
                  <button type="submit" className="btn btn--primary" style={{ fontSize: 13, padding: '8px 16px' }} disabled={isPending}>
                    Schedule Class
                  </button>
                </form>

                {/* Scheduled Classes list */}
                <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-ink-700)', marginTop: 24, marginBottom: 8 }}>Scheduled Sessions</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#fff', borderBottom: '1px solid var(--color-line)' }}>
                      <th style={{ padding: 8, textAlign: 'left' }}>Cohort</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Topic / Title</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Start Time</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Reminders Status</th>
                      <th style={{ padding: 8, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((cls) => {
                      const dt = new Date(cls.start_time).toLocaleString();
                      return (
                        <tr key={cls.id} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                          <td style={{ padding: 8, fontFamily: 'var(--font-mono)' }}>{cls.cohort_name}</td>
                          <td style={{ padding: 8, fontWeight: 600 }}>{cls.title}</td>
                          <td style={{ padding: 8, color: 'var(--color-ink-700)' }}>{dt}</td>
                          <td style={{ padding: 8 }}>
                            <span style={{
                              color: cls.reminder_sent ? '#16a34a' : '#ea580c',
                              fontWeight: 600
                            }}>
                              {cls.reminder_sent ? '✓ Sent' : '⏳ Pending'}
                            </span>
                          </td>
                          <td style={{ padding: 8, textAlign: 'right' }}>
                            <button onClick={() => handleDeleteClass(cls.id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer' }} disabled={isPending}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {classes.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: 12, textAlign: 'center', color: 'var(--color-ink-500)' }}>No class sessions scheduled.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Jobs Queue Table */}
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Failed & Scheduled Jobs Queue</h3>
              <div style={{ maxHeight: 350, overflowY: 'auto', border: '1px solid var(--color-line)', borderRadius: 8 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: 'var(--color-sand-50)', textAlign: 'left', borderBottom: '1px solid var(--color-line)' }}>
                      <th style={{ padding: 10 }}>Job Type</th>
                      <th style={{ padding: 10 }}>Target / Payload</th>
                      <th style={{ padding: 10 }}>Attempts</th>
                      <th style={{ padding: 10 }}>Next Run At</th>
                      <th style={{ padding: 10 }}>Last Error</th>
                      <th style={{ padding: 10 }}>Status</th>
                      <th style={{ padding: 10, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => {
                      const dt = new Date(job.run_at).toLocaleString();
                      return (
                        <tr key={job.id} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                          <td style={{ padding: 10, fontWeight: 600 }}>{job.job_type}</td>
                          <td style={{ padding: 10, color: 'var(--color-ink-700)', fontSize: 11 }}>
                            {JSON.stringify(job.payload)}
                          </td>
                          <td style={{ padding: 10 }}>{job.attempts}/{job.max_attempts}</td>
                          <td style={{ padding: 10, whiteSpace: 'nowrap' }}>{dt}</td>
                          <td style={{ padding: 10, color: '#dc2626', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={job.last_error}>
                            {job.last_error || '-'}
                          </td>
                          <td style={{ padding: 10 }}>
                            <span style={{
                              color: job.status === 'completed' ? '#16a34a' : job.status === 'failed' ? '#dc2626' : '#ea580c',
                              fontWeight: 600
                            }}>
                              {job.status.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: 10, textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {job.status !== 'completed' && (
                              <button onClick={() => handleRetryJob(job.id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-blue-600)', cursor: 'pointer', marginRight: 12 }} disabled={isPending}>
                                Retry Now
                              </button>
                            )}
                            <button onClick={() => handleDeleteJob(job.id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer' }} disabled={isPending}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {jobs.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: 16, textAlign: 'center', color: 'var(--color-ink-500)' }}>No pending or failed jobs in the queue.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MANUAL DISPATCH */}
          {activeTab === 'manual' && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Manual Message Dispatch</h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-500)', marginBottom: 24 }}>Send a direct, manual WhatsApp text message to any phone number.</p>

              {manualSendStatus && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 6,
                  fontSize: 14,
                  marginBottom: 24,
                  background: manualSendStatus.success ? '#dcfce7' : '#fef2f2',
                  border: manualSendStatus.success ? '1px solid #bbf7d0' : '1px solid #fecaca',
                  color: manualSendStatus.success ? '#15803d' : '#991b1b',
                }}>
                  {manualSendStatus.message}
                </div>
              )}

              <form onSubmit={handleManualSend} style={{ maxWidth: 600 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-ink-700)' }}>Recipient Phone Number (with country code)</label>
                  <input
                    type="tel"
                    value={manualSend.phone}
                    onChange={(e) => setManualSend({ ...manualSend, phone: e.target.value })}
                    placeholder="e.g. 237677123456"
                    required
                    style={{ fontSize: 15, padding: '12px 14px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--color-ink-500)' }}>Do not include '+' or '00'. Leading digits represent the country code.</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-ink-700)' }}>Message Text</label>
                  <textarea
                    value={manualSend.text}
                    onChange={(e) => setManualSend({ ...manualSend, text: e.target.value })}
                    placeholder="Write your message here..."
                    required
                    rows={6}
                    style={{ fontSize: 15, padding: '12px 14px', border: '1px solid var(--color-line)', borderRadius: 6, fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isPending}>
                  {isPending ? 'Sending...' : 'Send WhatsApp Message ✉️'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: CERTIFICATES */}
          {activeTab === 'certs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <h2 style={{ fontSize: 22, marginBottom: 4 }}>Certificates</h2>
                  <p style={{ fontSize: 13, color: 'var(--color-ink-500)', margin: 0 }}>Issue, revoke, or reissue certificates and access verification QR codes.</p>
                </div>
                <button
                  onClick={() => { setShowIssueForm(true); setCertFormStatus(null); }}
                  className="btn btn--primary"
                  style={{ fontSize: 13, padding: '10px 18px' }}
                >
                  + Issue Certificate
                </button>
              </div>

              {/* Issue Form */}
              {showIssueForm && (
                <div style={{ background: 'var(--color-sand-50)', borderRadius: 10, padding: 24, border: '1px solid var(--color-line)', marginTop: 20, marginBottom: 28 }}>
                  <h3 style={{ fontSize: 15, marginBottom: 16 }}>Issue New Certificate</h3>
                  {certFormStatus && (
                    <div style={{ padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 16, background: certFormStatus.success ? '#dcfce7' : '#fef2f2', border: certFormStatus.success ? '1px solid #bbf7d0' : '1px solid #fecaca', color: certFormStatus.success ? '#15803d' : '#991b1b' }}>
                      {certFormStatus.message}
                    </div>
                  )}
                  <form onSubmit={handleIssueCert}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Recipient Full Name *</label>
                        <input
                          type="text"
                          value={certForm.recipient_name}
                          onChange={(e) => setCertForm({ ...certForm, recipient_name: e.target.value })}
                          placeholder="e.g. Amara Okonkwo"
                          required
                          style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Recipient Email</label>
                        <input
                          type="email"
                          value={certForm.recipient_email}
                          onChange={(e) => setCertForm({ ...certForm, recipient_email: e.target.value })}
                          placeholder="e.g. amara@example.com"
                          style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Program *</label>
                        <select
                          value={certForm.program_id}
                          onChange={(e) => {
                            const prog = certPrograms.find(p => p.id === e.target.value);
                            setCertForm({ ...certForm, program_id: e.target.value, course_title: prog?.name ?? '', level: prog?.level ?? '' });
                          }}
                          required
                          style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6, background: '#fff' }}
                        >
                          <option value="">Select a program…</option>
                          {certPrograms.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Cohort / Session</label>
                        <input
                          type="text"
                          value={certForm.cohort_name}
                          onChange={(e) => setCertForm({ ...certForm, cohort_name: e.target.value })}
                          placeholder="e.g. Cohort 03"
                          style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Level</label>
                        <input
                          type="text"
                          value={certForm.level}
                          onChange={(e) => setCertForm({ ...certForm, level: e.target.value })}
                          placeholder="e.g. Beginner"
                          style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Certificate Title (auto-filled from program, editable)</label>
                      <input
                        type="text"
                        value={certForm.course_title}
                        onChange={(e) => setCertForm({ ...certForm, course_title: e.target.value })}
                        placeholder="e.g. Explorer Live — Cohort 03"
                        required
                        style={{ fontSize: 14, padding: '8px 10px', border: '1px solid var(--color-line)', borderRadius: 6 }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button type="submit" className="btn btn--primary" style={{ fontSize: 13, padding: '8px 16px' }} disabled={isPending}>
                        {isPending ? 'Issuing…' : 'Issue Certificate'}
                      </button>
                      <button type="button" onClick={() => setShowIssueForm(false)} className="btn btn--ghost" style={{ fontSize: 13, padding: '8px 16px' }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Filter */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {['', 'valid', 'revoked', 'replaced', 'expired'].map(s => (
                  <button
                    key={s || 'all'}
                    onClick={() => setCertFilter(s)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: 100,
                      fontSize: 12.5,
                      fontWeight: certFilter === s ? 600 : 400,
                      border: certFilter === s ? '1.5px solid #152033' : '1px solid var(--color-line)',
                      background: certFilter === s ? '#152033' : '#fff',
                      color: certFilter === s ? '#F7F3EC' : 'var(--color-ink-700)',
                      cursor: 'pointer',
                    }}
                  >
                    {s || 'All'}
                  </button>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--color-ink-500)', alignSelf: 'center' }}>
                  {certs.filter(c => !certFilter || c.status === certFilter).length} certificates
                </span>
              </div>

              {/* Certs Table */}
              <div style={{ border: '1px solid var(--color-line)', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ background: 'var(--color-sand-50)', textAlign: 'left', borderBottom: '1px solid var(--color-line)' }}>
                      <th style={{ padding: '10px 14px' }}>Cert #</th>
                      <th style={{ padding: '10px 14px' }}>Recipient</th>
                      <th style={{ padding: '10px 14px' }}>Program</th>
                      <th style={{ padding: '10px 14px' }}>Issued</th>
                      <th style={{ padding: '10px 14px' }}>Status</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certs
                      .filter(c => !certFilter || c.status === certFilter)
                      .map((cert) => {
                        const statusColors: Record<string, { bg: string; color: string }> = {
                          valid:    { bg: '#dcfce7', color: '#15803d' },
                          revoked:  { bg: '#fef2f2', color: '#dc2626' },
                          replaced: { bg: '#fff7ed', color: '#c2410c' },
                          expired:  { bg: '#f5f5f5', color: '#6b7280' },
                        };
                        const sc = statusColors[cert.status] ?? statusColors.expired;
                        return (
                          <tr key={cert.id} style={{ borderBottom: '1px solid var(--color-line-soft)' }}>
                            <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                              {cert.certificate_number ?? '—'}
                            </td>
                            <td style={{ padding: '10px 14px', fontWeight: 600 }}>
                              {cert.recipient_name}
                              {cert.recipient_email && <div style={{ fontSize: 11, color: 'var(--color-ink-500)', fontWeight: 400 }}>{cert.recipient_email}</div>}
                            </td>
                            <td style={{ padding: '10px 14px', color: 'var(--color-ink-700)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {cert.course_title}
                              {cert.cohort_name && <div style={{ fontSize: 11, color: 'var(--color-ink-500)' }}>{cert.cohort_name}</div>}
                            </td>
                            <td style={{ padding: '10px 14px', color: 'var(--color-ink-500)', whiteSpace: 'nowrap' }}>
                              {new Date(cert.issued_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11.5, fontWeight: 600, background: sc.bg, color: sc.color }}>
                                {cert.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                onClick={() => handleShowQR(cert.public_token, cert.certificate_number)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--color-blue-600)', cursor: 'pointer', fontSize: 12.5, marginRight: 10 }}
                                title="View QR Code"
                              >
                                QR
                              </button>
                              <a
                                href={`/verify/${cert.public_token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--color-ink-700)', fontSize: 12.5, marginRight: 10 }}
                              >
                                Verify ↗
                              </a>
                              {cert.status === 'valid' && (
                                <button
                                  onClick={() => { setRevokeModal({ id: cert.id, name: cert.recipient_name }); setRevokeReason(''); }}
                                  style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 12.5, marginRight: 10 }}
                                  disabled={isPending}
                                >
                                  Revoke
                                </button>
                              )}
                              {(cert.status === 'revoked' || cert.status === 'replaced') && (
                                <button
                                  onClick={() => handleReissueCert(cert.id)}
                                  style={{ background: 'transparent', border: 'none', color: '#ea580c', cursor: 'pointer', fontSize: 12.5 }}
                                  disabled={isPending}
                                >
                                  Reissue
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {certs.filter(c => !certFilter || c.status === certFilter).length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ padding: 20, textAlign: 'center', color: 'var(--color-ink-500)' }}>No certificates found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {qrModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(21,32,51,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setQrModal(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 380, width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 18, marginBottom: 4 }}>Certificate QR Code</h3>
            {qrModal.certNumber && <p style={{ fontSize: 12, color: 'var(--color-ink-500)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>{qrModal.certNumber}</p>}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrModal.qrDataUri} alt="QR Code" style={{ width: 240, height: 240, margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontSize: 12, color: 'var(--color-ink-500)', wordBreak: 'break-all', marginBottom: 20 }}>{qrModal.verifyUrl}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <a
                href={qrModal.qrDataUri}
                download={`qr-${qrModal.certNumber ?? 'cert'}.png`}
                className="btn btn--primary"
                style={{ fontSize: 13, padding: '8px 16px' }}
              >
                Download PNG
              </a>
              <button onClick={() => setQrModal(null)} className="btn btn--ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Modal */}
      {revokeModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(21,32,51,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setRevokeModal(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Revoke Certificate</h3>
            <p style={{ fontSize: 14, color: 'var(--color-ink-700)', marginBottom: 20 }}>
              You are revoking the certificate for <strong>{revokeModal.name}</strong>. This action cannot be undone from the verification page, but you can reissue.
            </p>
            <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 6 }}>Reason for revocation *</label>
            <textarea
              value={revokeReason}
              onChange={e => setRevokeReason(e.target.value)}
              placeholder="e.g. Issued in error, policy violation, etc."
              rows={3}
              style={{ width: '100%', fontSize: 14, padding: '10px 12px', border: '1px solid var(--color-line)', borderRadius: 8, fontFamily: 'var(--font-body)', boxSizing: 'border-box', marginBottom: 20 }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleRevokeCert}
                disabled={!revokeReason.trim() || isPending}
                style={{ padding: '10px 18px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', opacity: !revokeReason.trim() ? 0.5 : 1 }}
              >
                Confirm Revoke
              </button>
              <button onClick={() => setRevokeModal(null)} className="btn btn--ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
