import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const FaqAccordion = ({ faqList = [] }) => {
  // console.log(faqList)
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    setOpen(open === id ? undefined : id);
  };

  const defaultFaqs = [
    {
      title: "What types of memorials do you provide?",
      description: "We offer a wide range of memorial headstone designs such as Ogee Memorials, Angel Memorials Bench Memorials, Children Memorials, Heart shaped memorials, Kerb sets,  Cremation Urns, and Vases. All our products are made from the finest quality Indian granite and are available in different colors and finishes to choose from.",
    },
    {
      title: "Where are your memorials manufactured?",
      description: "All our memorial tombstones are expertly designed and crafted by our skilled professionals in India. The raw granite is first sourced from trusted quarries and then cut, designed, and engraved in our factories. We use both traditional and modern machinery for custom design and development.",
    },
    {
      title: "Who can buy from Us?",
      description: "We mostly sell headstone grave markers and bespoke memorial plaques to wholesalers, dealers, and importers. We do bulk orders at competitive prices, all over the UK. However, we also serve end customers or retailers, depending on the location and order quantity.",
    },
    {
      title: "What materials do you use for your memorial stone?",
      description: "We use premium quality Granite, sourced from the finest quarries of India for the industrial production of memorial tombstones and headstones grave markers. However, we can also accommodate special requests for other materials like marble, sandstone, and limestone, based on availability and order size.",
    },
    {
      title: "Can you customize memorials according to our specifications?",
      description: "Absolutely! We offer customization options, including sizes, shapes, engravings, and finishes. Please contact us with your detailed requirements, and we’ll work closely with you to meet your preferences.",
    },
    {
      title: "What is the minimum order quantity (MOQ)?",
      description: "Our minimum order quantity varies depending on the type of memorial stone and customization required. We’ll provide free delivery on ordering a minimum of 5 Sets of Ogees, Mapples, and Kerbsets. Please contact us with your specific needs, for a detailed quote and MOQ.",
    },

  ];

  const validFaqList = faqList?.filter(
    item => item.title?.trim() && item.description?.trim()
  );

  const items = validFaqList && validFaqList.length > 0 ? validFaqList : defaultFaqs;

  return (
    <div className="form-left">
      <div className="accordion-one">
        <Accordion open={open} toggle={toggle}>
          {items.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader targetId={`${index + 1}`}>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h3>{item.title}</h3>
                </div>
              </AccordionHeader>
              <AccordionBody accordionId={`${index + 1}`}>
                <p>{item.description}</p>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* <div className="text-right-row">
        <a href="/" className="btn btn-four m-t-30">
          Read More
        </a>
      </div> */}
    </div>
  );
};

export default FaqAccordion;
