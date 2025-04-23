import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormCta from './FormCta';
import { useRouter } from 'next/router';

function ModelBox({ headerText, buttonText, buttonTextSpan, className = "", ...args }) {
    const [modal, setModal] = useState(false);
    const router = useRouter();
  
    const toggle = () => setModal(!modal);
  
    const handleSubmit = async () => {
      // Redirect to the thank you page after 5 seconds
      setTimeout(() => {
        setModal(false);
        router.push('/thank-you');
      }, 3000);
    };

  return (
    <div className='custom-model'>
       <Button className={`btn btn-prime ${className}`} onClick={toggle}>
       {buttonText}
      </Button>
      <Modal className='model-form'  isOpen={modal} toggle={toggle} {...args} centered 	
>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <div className='d-flex-model'>
            <div className='model-left'>
            {/* {headerText} {buttonTextSpan} */}
              <div>
              <h3>Get Your <span>Free</span><br/> Salesforce <span>Consultation</span></h3>
              <p>Transform your business with customized<br/> Salesforce Solutions</p>
              </div>
              <img src="/img/banner/hero-shape.png" alt="img" />
            </div>
            <div className='model-rigt'>
              <FormCta  onSubmit={handleSubmit}/>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModelBox;