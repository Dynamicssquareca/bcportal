'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form, Accordion } from 'react-bootstrap';
import Head from "next/head";
import faqData from '../public/data/erp_faq.json';
import FormErpCompare from '../components/FormErpCompare';
const CompareErps = () => {
    const [allErps, setAllErps] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedErps, setSelectedErps] = useState([null, null, null, null]);
    const [showModal, setShowModal] = useState(false);
    const [activeBoxIndex, setActiveBoxIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formFilled, setFormFilled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [showFormModal, setShowFormModal] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const featureLabels = {
        overview: "Overview",
        deployment: "Deployment",
        costPerUser: "Cost Per User",
        priceRange: "Price Range",
        // costPerProject: "Cost Per Project",
        // minImplementationFee: "Minimum Implementation Fee",
        // pricingNotes: "Pricing Notes",
        coreModules: "Core Modules",
        scalability: "Scalability",
        customization: "Customization",
        usabilitySupportTraining: "Usability / Support / Training",
        analyticsSecurity: "Analytics & Security",
        keyMarketStrength: "Key Market Strength",
        notableContext: "Notable Context",
        customerPerceptionUpdates: "Customer Perception Updates"
    };


    // 👉 Define your desired order here
    const featureOrder = [
        "overview",
        "deployment",

        // "costPerProject",
        // "minImplementationFee",
        // "pricingNotes",
        "coreModules",
        "scalability",
        "customization",
        "usabilitySupportTraining",
        "analyticsSecurity",
        "priceRange",
        "costPerUser",
        "keyMarketStrength",
        "notableContext",
    ];


    useEffect(() => {
        fetch('https://erptoolapi.onrender.com/api/frontend/products/domain/dynamicssquare-usa')
            .then(res => res.json())
            .then(data => {
                setAllErps(data);

                if (data.length > 0) {
                    // Default ERP as the first one from API
                    const defaultErp = data[0];

                    // Put default ERP in first slot
                    setSelectedErps([defaultErp, null, null, null]);

                    const apiFeatures = Object.keys(data[0].features);

                    // Keep manual order first, then append new API keys
                    const orderedFeatures = [
                        ...featureOrder,
                        ...apiFeatures.filter(f => !featureOrder.includes(f))
                    ];

                    setFeatures(orderedFeatures);
                }
            })
            .catch(err => console.error("Error loading ERP data:", err));
    }, []);


    const compactSelections = (arr) => {
        if (!showTable) {
            const filled = [...arr];
            while (filled.length < 4) filled.push(null);
            return filled;
        } else {
            const filled = arr.filter(Boolean);
            if (filled.length < 4) filled.push(null);
            return filled;
        }
    };

    const handleSelect = (erp) => {
        // Prevent duplicate selection
        if (selectedErps.some(selected => selected && selected.name === erp.name)) return;

        // Fill the first available slot from the left
        const updated = [...selectedErps];
        const emptyIndex = updated.findIndex(item => item === null);
        if (emptyIndex !== -1) {
            updated[emptyIndex] = erp;
        }

        setSelectedErps(compactSelections(updated));
        setShowModal(false);
        setActiveBoxIndex(null); // no need to track active box anymore
    };




    const removeSelection = (index) => {
        const updated = [...selectedErps];
        updated[index] = null;
        setSelectedErps(compactSelections(updated));
    };

    const handleCompare = () => {
        setLoading(true);
        setTimeout(() => {
            setShowTable(true);
            setSelectedErps(compactSelections(selectedErps));
            setLoading(false);
        }, 600);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            setFormFilled(true);
            setShowFormModal(false);
        }
    };

    const hasEnoughToCompare = selectedErps.filter(Boolean).length >= 2;


    /*faq*/
    const [visibleCount, setVisibleCount] = useState(5);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const [pdfType, setPdfType] = useState(null);
    const handleOpenModal = (type) => {
        setPdfType(type);
        // Open modal manually (needed since you use Bootstrap)
        const modal = new bootstrap.Modal(document.getElementById('pdfModel'));
        modal.show();
    };

    return (
        <>
            <Head>
                <meta name='robots' content='noindex,nofollow' />
                <title>Compare the Top ERP Systems for Your Business in 2026</title>
                <meta
                    name="description"
                    content="Discover the best ERP systems of 2026. Compare features, pricing, and benefits to find the right ERP solution for your business growth."
                />
                <link
                    rel="canonical"
                    href="https://www.businesscentralpartners.com/top-erp-systems-comparison/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.businesscentralpartners.com/top-erp-systems-comparison/" />
                <meta property="og:title" content="Compare the Top ERP Systems for Your Business in 2026" />
                <meta property="og:description" content="Discover the best ERP systems of 2026. Compare features, pricing, and benefits to find the right ERP solution for your business growth.​" />
                <meta property="og:image" content="https://www.businesscentralpartners.com/img/erp-f-im.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.businesscentralpartners.com/top-erp-systems-comparison/" />
                <meta property="twitter:title" content="Compare the Top ERP Systems for Your Business in 2026" />
                <meta property="twitter:description" content="Discover the best ERP systems of 2026. Compare features, pricing, and benefits to find the right ERP solution for your business growth." />
                <meta property="twitter:image" content="https://www.businesscentralpartners.com/img/erp-f-im.jpg" />
            </Head>
            <div className="container py-5">
                <div className='row justify-content-center'>
                    <div className='col-lg-9'>
                        <div className='solution-new-banner'>
                            <h1>Top ERP Software 2026: Compare, Evaluate, and Decide </h1>
                            <p>Explore our ERP systems comparison 2026 tool built to help you find the best ERP software 2026 for your business. The tool presents a clean & simple UI with side-by-side view of leading platforms, covering features, pricing, and setup types.  </p>
                            <p>You can see how each enterprise resource planning software works, estimate the cost per user, and check which one suits your goals across cloud and on-site systems. Compare ERP systems for your business needs without any confusion or complex terms. Request demos or price quotes from leading brands to see real value in action. You can also browse by category to explore top industry choices and popular segments that match your scale or process.  </p>
                            <p>To make ERP selection easier, just use this tool and read through this page to get insights on how to compare ERP software for 2026 confidently. It highlights what matters when choosing among the top ERP systems so your team can pick the most efficient, reliable, and growth-ready solution. </p>
                        </div>
                    </div>

                </div>

                <div className='row pdd-100'>
                    <div className='col-lg-12'>
                        <div className="table-responsive position-relative">
                            <table className="table table-bordered text-center fixed-table">
                                <thead>
                                    <tr>
                                        {showTable && <th className='mm-s' style={{ width: "200px" }}>Feature</th>}
                                        {compactSelections(selectedErps).map((erp, index) => (
                                            <th className='mm-s' key={index} style={{ width: `${100 / 4}%` }}>
                                                {erp ? (
                                                    <div className="erp-card position-relative">
                                                        <button
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                                            onClick={() => removeSelection(index)}
                                                        >
                                                            ×
                                                        </button>
                                                        <img
                                                            className="mobile-small"
                                                            src={`https://cdn.gemsroot.com/${erp.logo}`}
                                                            alt={erp.name}
                                                            style={{ maxWidth: "200px", marginBottom: "10px" }}
                                                            onError={(e) => (e.currentTarget.src = "/img/e-r-p-logo.png")}
                                                        />
                                                        <h5 style={{ fontSize: "14px", color: "#3d3459" }}>{erp.name}</h5>

                                                    </div>
                                                ) : (
                                                    <div
                                                        className="erp-card placeholder-card"
                                                        onClick={() => { setActiveBoxIndex(index); setShowModal(true); }}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {/* 👇 Default ERP logo here */}
                                                        <img
                                                            src="/img/e-r-p-logo.png"
                                                            alt="Default ERP"
                                                            style={{ maxWidth: "80px", marginBottom: "10px" }}
                                                        />
                                                        <p className="text-muted mm-p">Select ERP</p>

                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {showTable && (
                                    <tbody>
                                        {features.map((feature, rowIndex) => {
                                            const shouldBlurRow = !formFilled && rowIndex >= Math.floor(features.length / 2);
                                            return (
                                                <tr key={feature}>
                                                    <td className="text-start tt">
                                                        <b>{featureLabels[feature] || feature}</b>
                                                    </td>
                                                    {compactSelections(selectedErps).map((erp, colIndex) => (
                                                        <td key={colIndex} className={shouldBlurRow ? "blurred-cell" : ""}>
                                                            {erp
                                                                ? Array.isArray(erp.features[feature])
                                                                    ? erp.features[feature].join(", ")
                                                                    : erp.features[feature]
                                                                : null
                                                            }
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                )}
                            </table>

                            {hasEnoughToCompare && !showTable && (
                                <div className="text-center my-3">
                                    <Button className='btn btn-new' onClick={handleCompare} variant="primary">Compare</Button>
                                </div>
                            )}

                            {loading && (
                                <div className="text-center my-4">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            )}

                            <div className='m-hidess'>
                                {!formFilled && showTable && (
                                    <div className="unlock-button-container">
                                        <Button className='btn btn-new' variant="warning" onClick={() => setShowFormModal(true)}>
                                            Unlock Full Comparison
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='d-hidess-no'>
                            {!formFilled && showTable && (
                                <div className="unlock-button-n">
                                    <Button variant="warning" className='btn-get-started brrt' onClick={() => setShowFormModal(true)}>
                                        Unlock Full Comparison
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ERP Modal */}
                <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title><div className='text-center'>Select an ERP</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            {allErps.map((erp, idx) => {
                                const isSelected = selectedErps.some(sel => sel && sel.name === erp.name);
                                return (
                                    <div
                                        key={idx}
                                        className={`col-6 col-md-4 mb-3 ${isSelected ? "opacity-50" : ""}`}
                                        onClick={() => !isSelected && handleSelect(erp)}
                                        style={{ pointerEvents: isSelected ? "none" : "auto", cursor: 'pointer' }}
                                    >
                                        <div className="border p-2 rounded bg-light text-center h-100">
                                            <img src={`https://cdn.gemsroot.com/${erp.logo}`} alt={erp.name} style={{ maxWidth: "100px", marginBottom: '15px' }} />
                                            <h5 style={{ fontSize: '13px', color: '#3d3459' }}>{erp.name}</h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Modal.Body>
                </Modal>

                {/* Form Modal */}
                <Modal className='mm-si' show={showFormModal} onHide={() => setShowFormModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Unlock Full Comparison</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormErpCompare onSuccess={() => {
                            setFormFilled(true);
                            setShowFormModal(false);
                        }} />
                    </Modal.Body>
                </Modal>



                <section className="solution-faq">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 ">
                                <div className="solution-sub-head text-center">
                                    <h2>Have you got
                                        questions about ERP Systems?</h2>
                                    <p>Click through to our FAQ for the best answers!</p>
                                </div>
                            </div>
                        </div>


                        <div className="row justify-content-center mar-top-7">
                            <div className="col-lg-8">

                                <Accordion flush>
                                    {faqData.slice(0, visibleCount).map((faq, index) => (
                                        <Accordion.Item eventKey={String(index)} key={faq.id}>

                                            <Accordion.Header>
                                                {faq.question}
                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                />
                                            </Accordion.Body>

                                        </Accordion.Item>
                                    ))}
                                </Accordion>

                                {visibleCount < faqData.length && (
                                    <div className="text-center mt-4">
                                        <button
                                            className="btn btn-new"
                                            onClick={handleLoadMore}
                                        >
                                            Load More <i className="bi bi-chevron-down"></i>
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>




                    </div>
                </section>


                <style jsx>{`
          .fixed-table {
  table-layout: fixed;
  width: 100%;
}

.fixed-table th:first-child,
.fixed-table td:first-child {
  width: 200px ;
  vertical-align: middle;
}

.fixed-table th:not(:first-child),
.fixed-table td:not(:first-child) {
  width: calc((100% - 200px) / 4) !important;
  font-size: 13px;
  padding: 15px;
}
          .erp-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 120px;
          }
            .erp-card p{
            margin-bottom:0px
            }
          .placeholder-card {
           
          }
          .blurred-cell {
            position: relative;
          }
          .blurred-cell::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(4px);
            pointer-events: none;
          }
          .unlock-button-container {
            position: absolute;
            bottom: 25%;
            left: 50%;
            transform: translate(-50%,-25%);
            z-index: 10;
          }
          .tt {
            color: #3d3459 !important;
            font-size: 15px !important;
            padding: 15px;
          }
            .pdd-100{
            padding-top:60px
            }
            .pdd-120{
            padding-top:80px
            }
            .mm-s{
            }
            .d-hidess-no{
            display:none;
            text-align: center;
    padding: 30px 0px 0px;
            }
   
            @media (max-width:768px){
              .mm-s{
             width: 200px !important;
            }
              .fixed-table th:not(:first-child),
.fixed-table td:not(:first-child) {
width: 200px !important;
}
.m-hidess{
display:none
}

.d-hidess-no{
            display:block
            }
            .mobile-small{
            width:100px
            }
            }
        `}</style>
            </div>
        </>
    );
};

export default CompareErps;
