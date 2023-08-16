import React from 'react'
import './Contact.css'
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import Container from './Container';

const Contactt = () => {
    return (
        <>

            <Container class1='contact-wrapper container py-5 home-wrapper-2 contact'>
                <div className=''>
                    <div className='col-12' style={{ width: 1100 }}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12060.23664971486!2d107.5867256391195!3d16.462191060992016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13e8ec40d09%3A0xc669dbfc2743e474!2sVincom%20Plaza%20Hu%E1%BA%BF!5e0!3m2!1svi!2s!4v1688608170390!5m2!1svi!2s"
                            width="1400"
                            height="450"
                            className='border-0 w-100'
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div className='col-12 mt-5' style={{ width: 1400 }}>
                        <div className='contact-inner-wrapper d-flex justify-content-between d_flex'>
                            <div style={{ width: 600 }}>
                                <h3 className='contact-title mb-4'>Contact </h3>
                                <form action='' className='d-flex flex-column gap-15'>
                                    <div>
                                        <input type='text' className='form-control' placeholder='Name' style={{ width: 600 }} />
                                    </div>
                                    <div>
                                        <input type='email' className='form-control' placeholder='Email' style={{ width: 600 }} />
                                    </div>
                                    <div>
                                        <input type='tel' className='form-control' placeholder='Phone Number' style={{ width: 600 }} />
                                    </div>
                                    <div>
                                        <textarea
                                            name=''
                                            id=''
                                            className='w-100 form-control'
                                            cols="30"
                                            rows="4"
                                            placeholder='Comments'
                                            style={{ width: 600 }}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button className='btn-send'>Send</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className='contact-title mb-4'>Get In Touch With Us </h3>
                                <div>
                                    <ul className='ps-0'>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <AiOutlineHome className='fs-5' />
                                            <address className='mb-0'>
                                                Hương Hồ, Thành Phố Huế, Thừa Thiên Huế
                                            </address>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <BiPhoneCall className='fs-5' />
                                            <a href='tel:+84 359863347'>+84 359863347</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <AiOutlineMail className='fs-5' />
                                            <a href='mailto:natuwa560@gmail.com'>natuwa560@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <BiInfoCircle className='fs-5' />
                                            <p className='mb-0'>Monday – Friday 10 AM – 8 PM</p>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Contactt;