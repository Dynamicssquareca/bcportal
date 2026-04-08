'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const FormErpCompare = ({ onSuccess, selectedErps }) => {
    const form = useRef();
    const isSubmittingRef = useRef(false);

    const [currentPageUrl, setCurrentPageUrl] = useState('');
    const [defaultCountryName, setDefaultCountryName] = useState('');
    const [defaultCountryCode, setDefaultCountryCode] = useState('gb');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyname: '',
        currentPageUrl: '',
        selectedErps: '',
        defaultCountryName: '',
        formtag: 'ERP Compare Form'
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // ==========================
    // ✅ OPTIMIZED ERP NAMES (useMemo)
    // OLD ❌ (recalculate every render)
    // const selectedErpNames = selectedErps?.filter(Boolean).map(e => e.name).join(', ');

    // NEW ✅
    const selectedErpNames = useMemo(() => {
        return selectedErps
            ?.filter(Boolean)
            .map(e => e.name)
            .join(', ') || '';
    }, [selectedErps]);

    // ==========================
    // COUNTRY FETCH
    // ==========================
    useEffect(() => {
        fetch(`https://api.ipdata.co?api-key=00163619f1de9b2adebdc3a316b8958c4864bcc38ca547a8fd081d6e`)
            .then(res => res.json())
            .then(data => {
                setDefaultCountryCode(data.country_code.toLowerCase());
                setDefaultCountryName(data.country_name);
            })
            .catch(() => setDefaultCountryCode('gb'));
    }, []);

    // ==========================
    // PAGE + COUNTRY SET
    // ==========================
    useEffect(() => {
        setCurrentPageUrl(window.location.href);

        setFormData(prev => ({
            ...prev,
            currentPageUrl: window.location.href,
            defaultCountryName
        }));
    }, [defaultCountryName]);

    // ==========================
    // ✅ AUTO SYNC ERP → formData
    // NEW (BEST PRACTICE)
    // ==========================
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            selectedErps: selectedErpNames
        }));
    }, [selectedErpNames]);

    // ==========================
    // HANDLERS (OPTIMIZED)
    // OLD ❌ setFormData({ ...formData })
    // NEW ✅ functional update (no stale state)
    // ==========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handlePhoneChange = (phone) => {
        setFormData(prev => ({ ...prev, phone }));
        setErrors(prev => ({ ...prev, phone: '' }));
    };

    // ==========================
    // VALIDATION (NO CHANGE)
    // ==========================
    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) errors.name = 'Name is required';

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Invalid email';
        }

        if (!data.phone.trim()) errors.phone = 'Phone required';
        if (!data.companyname.trim()) errors.companyname = 'Company required';

        return errors;
    };

    // ==========================
    // SUBMIT (CLEAN + SAFE)
    // ==========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittingRef.current) return;

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        isSubmittingRef.current = true;
        setSubmitting(true);

        try {
            // ✅ EMAIL SEND
            await emailjs.sendForm(
                'service_ny5atf7',
                'template_m5cq8mp',
                form.current,
                'GOr8q7p52Z3BisMM4'
            );

            // OLD ❌ create inside fetch
            // NEW ✅ already synced in formData

            await fetch('https://blognew.dynamicssquare.com/api/formData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            onSuccess?.();

            // ==========================
            // RESET (CLEAN)
            // ==========================
            setFormData({
                name: '',
                email: '',
                phone: '',
                companyname: '',
                currentPageUrl: window.location.href,
                selectedErps: '',
                defaultCountryName,
                formtag: 'ERP Compare Form'
            });

        } catch (err) {
            console.error('Submit error:', err);
        } finally {
            setSubmitting(false);
            isSubmittingRef.current = false;
        }
    };

    // ==========================
    // UI
    // ==========================
    return (
        <div className="main-form-wrper main-form-wrper-pdd">
            <form ref={form} onSubmit={handleSubmit}>

                {/* ✅ hidden ERP field */}
                <input type="hidden" name="selectedErps" value={selectedErpNames} />

                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="*Full Name"
                        className="form-control"
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="*Work Email"
                        className="form-control"
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                        placeholder="*Company Name"
                        className="form-control"
                    />
                    {errors.companyname && <div className="text-danger">{errors.companyname}</div>}
                </div>

                <div className="mb-3">
                    <PhoneInput
                        inputStyle={{ width: '100%', paddingLeft: '50px' }}
                        country={defaultCountryCode}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                            name: 'phone',
                            required: true,
                        }}
                        countryCodeEditable={false}
                        excludeCountries={['pk']}
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>

                <button disabled={submitting} className="btn btn-new">
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default FormErpCompare;